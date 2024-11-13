#!/usr/bin/env python3
from models.user import User
# user = User(password='Moji@054', first_name='Levi', email='lekanmojibola@gmail.com',
#             user_name='kingqun', last_name='Mojibola')
# user.save()
# print(user)
# for user in User.all().values():
#     print(user.to_json())
# user = User.search(first_name='Olalekan')[0]
# user.delete()
# user.update({'first_name': 'Levi'})
# print(user.to_json())
User.delete_all()