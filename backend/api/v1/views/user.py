#!/usr/bin/env python3
"""these endpoints don't require auth"""
import jwt
from flask import request, abort, jsonify, make_response, current_app, Blueprint
# from api.v1.views import app_views
from models.user import User

user_views = Blueprint('app_views', __name__, url_prefix='/user')

# sign up endpoint
@user_views.route('/signup', strict_slashes=False, methods=['POST'])
def sign_up():
    """this views handles user sign up"""
    data = request.get_json()
    if data is None or not data:
        return jsonify({'Error': "Invalid user"})
    pwd_confirm = data.get('password_confirm')
    pwd = data.get('password')
    if pwd_confirm != pwd:
        return jsonify({'Error': 'Password do not match'}), 400
    data.pop('password_confirm')
    # ----- i have to first search for if user exists in db -----
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    try_user = User.search({'first_name': first_name, 'last_name': last_name})
    try:
        try_user = try_user[0]
        return jsonify({'Error': 'You have already signed up'})
    except IndexError:
        pass
    # ---- end of search ------
    new_user = User(**data)
    new_user.save()
    return jsonify({'success': "User created successfully"}), 200

@user_views.route('/login', strict_slashes=False, methods=['POST'])
def login():
    """this checks the login details"""
    from api.v1.app import auth
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if email is None:
        raise ValueError("Email is missing")
    get_user = User.search({'email': email})
    if get_user is None or not get_user:
        return jsonify({"Error": "User not found"}), 404
    user = get_user[0]
    if not user.is_valid_pwd(password):
        return jsonify({'Error': "Invalid password"}), 401
    session_id = auth.create_session(user.id)
    response = make_response(jsonify({'success': "Login success"}))
    response.set_cookie("session_id", session_id)
    return response, 200

@user_views.route('/forget_pwd', strict_slashes=False, methods=['POST'])
def forgot_password():
    """Allows user to request password reset"""
    from flask_mail import Message
    import os
    from datetime import datetime, timedelta
    from api.v1.app import mail

    email = request.json.get('email')
    if email is None:
        raise ValueError('Email is missing')
    get_user = User.search({'email': email})
    if get_user is None or not get_user:
        return jsonify({"Error": 'User not found'}), 404

    try:
        token = jwt.encode(
            {
                'reset_password': email,
                'exp': datetime.now() + timedelta(seconds=1800)
            },
            current_app.config['SECRET_KEY'],
            algorithm='HS256'
        )
    except Exception:
        return jsonify({'Error': 'Error generating reset token'}), 500

    reset_url = f"http://localhost:5000/netflix/reset_pwd?token={token}"
    subject = "Password reset on Netflix clone"

    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>You're receiving this email because you requested a password reset for your user account at Netflix clone.</p>
            <p>Please click the button below to reset your password:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="{reset_url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            </div>
            <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
            <p><a href="{reset_url}" style="color: #1a73e8;">{reset_url}</a></p>
            <p>Thanks for using Netflix clone!</p>
            <p>Best regards,<br>The Netflix clone Team</p>
        </div>
    </body>
    </html>
    """

    try:
        msg = Message(subject, sender=os.environ.get('MAIL_DEFAULT_SENDER'), recipients=[email])
        msg.html = html_content
        mail.send(msg)
        return jsonify({'Success': 'reset link sent successfully'}), 200
    except Exception:
        return jsonify({'Error': 'Error sending reset link'}), 500

@user_views.route('/logout', strict_slashes=False, methods=['GET'])
def logout():
    """handles logout"""
    from api.v1.app import auth
    if not auth.destroy_session(request):
        abort(404)
    return jsonify({}), 200

@user_views.route('/reset_pwd', strict_slashes=False, methods=['POST'])
def reset_pwd():
    """handles reset password request"""
    import bcrypt
    token = request.args.get('token')
    if token is None:
        return jsonify({'Error': "Invalid request"}), 400
    new_pwd = request.json.get('new_password')

    try:
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        email = data.get('reset_password')
    except jwt.ExpiredSignatureError:
        return jsonify({'Error': 'Token has expired'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'Error': 'Invalid token'}), 400
    User.validate_pwd(new_pwd)
    hash_pwd = bcrypt.hashpw(new_pwd.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_pwd_confirm = request.json.get('new_password_confirm')
    if new_pwd != new_pwd_confirm:
        return jsonify({'Error': "Passwords do not match"}), 400
    get_user = User.search({'email': email})
    if get_user is None or not get_user:
        return jsonify({'Error': "User not found"}), 404
    user = get_user[0]
    user.update({'password': hash_pwd})
    return jsonify({'success': "Password reset successful"})
