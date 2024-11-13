### NETFLIX
#### BACKEND

### INTRODUCTION
Welcome to my branch. To get started:
- Run ``` sudo mysql -u root -p < NETFLIX_BCK.sql  ```
- ```pip install -r requirements.txt``  
- generate .env file based on the environment vars declared:
```
DB_ENGINE='NETFLIX_BCK'
DB_USER='net4flix'
DB_USER_PWD='NETFLIX_BCK_PWD'
DB_HOST='localhost'
DB_PORT='YOUR PORT'
MAIL_PASSWORD='TBD'
SECRET_KEY='GENERATE SECRET KEY, YOU CAN USE THE secrets module'
SESSIONEXPIRY=your time
```
- ```python3 -m api.v1.app ```
