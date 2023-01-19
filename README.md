Building OTP authentication with ReactJS and Express JS with different Tech Stack 

This is Only the api so if want to use The UI then please Visit this link : https://otp-login.onrender.com/ 

And for UI code : https://github.com/102AMIT/OTP_Login_Auth_client

🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯

So let me Introduce my Api here Follow this Document if you want to use this api ✔✔✔✔✔✔✔✔


Today, year 2023, passwords are widely used in our everyday life for many user authentications on the Internet. Primarily due to its convenience and simplicity, the use of passwords has been shown to be plagued by various security problems, especially in recent times. Password theft is becoming a common occurence and for this primary and security reason, many business companies and organisations are adopting alternative solutions. This is where one-time password (OTP) becomes really popular in recent times.

Password authentication with static password is particularly vulnerable as these passwords can easily be stolen by, for example, keyloggers, phishing attacks, trojans and etc, without owner's knowledge as well. This has led to the increasing popularity of One-Time Password (OTP) where the generated password is only valid for one login session. To do this securely and scalably, we are going to build a ReactJS app with OTP features using NODE MAILER And i also use JWt for authentication.


👀👀👀👀👀👀👀👀👀👀👀👀

So if you want to run this code on your machine you need two thing node_module and dotenv file for that .

For node_module : Type on terminal - > npm install OR npm i
For dotenv : Create a .env file in local machine And you need to assign DB_URL :"Here you need to provide local or any cloud url whatever you want"

So let's look on folder structure And tech tack One by One I also Provide the Routes of the api With Images :

***********************************************************************************************************

Folder Structure :-

1 . controllers :- All the business Logic writting here.
2.  database    :- Here i connect my database *(Here you need to provide Your database Url).
3.  middleware  :- Authentication Logic written Here.
4.  model       :- This is Schema Here i'm define What we have in our Object(Object is Our user Info).
5.  router      :- This is router here i define every route for this application
6.  .gitignore  :- This is for prevent the file for push on gitHub
7.  package-lock.json :- Dependencies of dependencies are here . All the Tech stack info avilable here.
8.  package.json:-  All the dependencies are we use to build this app are avilable here.
9.server.js     :- This is our root file by that we can access each and every thing in our sub-folders


So let's See our route :-

IF use database is local then use : http://localhost:8000/ Other wise Your cloud url ex : https://login-auth-api.onrender.com/

1. Register - Post Request ✔
    * Here in Profile you need to provide base64 incoded link for Profile *****✌
    
    ![register](https://user-images.githubusercontent.com/96186566/213381547-8925afbc-243d-4a2f-b376-fb67e348c794.JPG)
    
2. Login    - Post Request ✔

    ![login](https://user-images.githubusercontent.com/96186566/213381920-b0d630bc-41f5-4da4-84a2-5531ff50b432.JPG)

3. GetUser  - Get Request ✔

    ![get user](https://user-images.githubusercontent.com/96186566/213382331-851c5f03-42ff-413f-bb87-0812ab59b17e.JPG)
    
4. UpdateUser- Put Request ✔

    ![update user](https://user-images.githubusercontent.com/96186566/213382579-4e020507-b901-4f8f-bb09-9b4a3fc7e1f3.JPG)

5. ResetPassword- Put Request ✔
  
    ![reset pasword](https://user-images.githubusercontent.com/96186566/213382836-3d697d9f-f5b3-4a47-adf2-f9747d3e42c5.JPG)

6. GenerateOTP - Get Request ✔

    ![generateOTP](https://user-images.githubusercontent.com/96186566/213383052-2881645b-8714-493c-a23c-e7d29c51f2d4.JPG)

7. VerifyOTP - Get Request ✔

    ![VerifyOTP](https://user-images.githubusercontent.com/96186566/213383265-092f78e9-8767-4bd3-b935-b5d22417a24b.JPG)

*********************************************************************************************************

Dependencies needed to run this api in local :- 👀👀👀

1.    "bcrypt": "^5.1.0",

2.    "cors": "^2.8.5",

3.    "dotenv": "^16.0.3",

4.    "express": "^4.18.2",

5.    "jsonwebtoken": "^9.0.0",

6.    "mailgen": "^2.0.27",

7.    "mongodb-memory-server": "^8.11.1",

8.    "mongoose": "^6.8.3",

9.    "morgan": "^1.10.0",

10.    "multer": "^1.4.5-lts.1",

11.    "nodemailer": "^6.9.0",

12.    "nodemon": "^2.0.20",

13.    "otp-generator": "^4.0.0"
  

😉😉😉😉😉😉😉   I hope That will Help you for getiing familiar with this api .   😉😉😉😉😉😉😉😉😉








