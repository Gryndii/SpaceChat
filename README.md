# SpaceChat
🌌 SpaceChat 🚀, React/Redux/Firebase Social application for my dev fun.

🤖 INITIALIZATION::
You should firstly:
- npm i firebase
- Create your own firebase project here - https://console.firebase.google.com/u/0/
- Initialize your database with: comments, likes, notifications, posts, users collections firstly.
- Create two files in "Backend/functions/utils": 
  "config.js" with your project data from https://console.firebase.google.com/u/1/project/[YOUR_PROJECT]/settings/general/web
  and 
  "localhostAuthKey.json" from https://console.cloud.google.com/iam-admin/serviceaccounts?project=[YOUR_PROJECT]&authuser=1
- Make some database indexes for sorting ( firebase console errors will help you ).

In "Frontend/Source/API/config.js":
change:
  "
    export const ROOT_URL = __DEV__
        ? 'http://localhost:5000/socialapp-f98e1/us-central1'
        : 'https://us-central1-socialapp-f98e1.cloudfunctions.net';
  "
to your project api links for local developement and production

START:  

Frontend:
cd Frontend
yarn start / npm start

Backend:
cd Backend
firebase serve

==================

Deploy:  

Frontend:
cd Frontend
yarn build / npm build
+

Backend:
cd Backend
firebase deploy

Note: that is education project for fun, and tokens expire after one hour 
      Happy SpaceChatting 👽

