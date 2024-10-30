<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Popup Sign-Up Form with Forgot Password</title>
    <style>
        /* Basic styling for the page */
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
        }
        
        /* Button styling */
        .open-btn {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }
        
        /* Modal background styling */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
        }
        
        /* Modal content styling */
        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            width: 300px;
            text-align: center;
            position: relative;
        }
        
        .modal-content h2 {
            margin-top: 0;
        }
        
        /* Close button styling */
        .close-btn {
            background-color: red;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 5px;
            position: absolute;
            top: 10px;
            right: 10px;
        }
        
        /* Input field styling */
        .form-group {
            margin-bottom: 15px;
            text-align: left;
        }
        
        .form-group label {
            display: block;
            font-size: 14px;
        }
        
        .form-group input {
            width: 100%;
            padding: 8px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        
        /* Error message styling */
        .error-message {
            color: red;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }
        
        /* Submit button styling */
        .submit-btn {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            width: 100%;
        }
        
        /* Forgot password link styling */
        .forgot-password {
            display: block;
            margin-top: 10px;
            font-size: 14px;
            color: #007bff;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <!-- Sign-Up Button -->
    <button class="open-btn" onclick="openModal('signUpModal')">Sign Up</button>
    
    <!-- Sign-Up Modal -->
    <div class="modal" id="signUpModal">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('signUpModal')">X</button>
            <h2>Sign Up</h2>
            <form id="signUpForm">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                    <span class="error-message" id="passwordError">Password must be at least 8 characters long.</span>
                </div>
                <button type="submit" class="submit-btn">Sign Up</button>
                <!-- Forgot Password Link -->
                <span class="forgot-password" onclick="openModal('forgotPasswordModal')">Forgot Password?</span>
            </form>
        </div>
    </div>

    <!-- Forgot Password Modal -->
    <div class="modal" id="forgotPasswordModal">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('forgotPasswordModal')">X</button>
            <h2>Forgot Password</h2>
            <form id="forgotPasswordForm">
                <div class="form-group">
                    <label for="resetEmail">Enter your email</label>
                    <input type="email" id="resetEmail" name="resetEmail" required>
                </div>
                <button type="submit" class="submit-btn">Reset Password</button>
            </form>
        </div>
    </div>

    <script>
        // Function to open a modal
        function openModal(modalId) {
            document.getElementById(modalId).style.display = "flex";
        }

        // Function to close a modal
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = "none";
        }

        // Submit event listener for the sign-up form with password validation
        document.getElementById("signUpForm").addEventListener("submit", function(event) {
            const passwordInput = document.getElementById("password");
            const passwordError = document.getElementById("passwordError");
            
            // Check if the password is less than 8 characters
            if (passwordInput.value.length < 8) {
                event.preventDefault(); // Prevent form submission
                passwordError.style.display = "block"; // Show error message
            } else {
                passwordError.style.display = "none"; // Hide error message
                alert("Sign-Up Form submitted!");
                closeModal("signUpModal");
            }
        });

        // Submit event listener for the forgot password form
        document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Password reset link sent to your email!");
            closeModal("forgotPasswordModal");
        });
    </script>
</body>
</html>
