<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p align="center">
<img alt="Pureplantparadise Logo" src="https://github.com/NirajD10/pureplantparadise/blob/main/frontend/src/assets/LOGO.png"/>
</p>
<p align="center">
  <h1 align="center">PurePlantParadise</h1>
</p>
<h4 align="center">
    <a href="https://pureplantparadise.netlify.app">Demo</a>
</h4>

<p align="center">
<img alt="PurePlantParadise" width="950" src="https://github.com/NirajD10/pureplantparadise/blob/main/pureplantparadise_screen.png"/>
</p>

## Introduction

PurePlantParadise is a MERN Stack Based and React, node js ecommerce platform with essential commerce features. Built with React, Express.js, Node.js and MongoDB modular and admin CMS.

## Installation

Before installing each frontend and backend dependencies, create a .env file on both frontend and backend.

for Backend, in .env file -

```bash
## Frontend URL
FRONTEND_URL="<REPLACE FROTEND URL>"
## for example - FRONTEND_URL = "http://localhost:5173"

## Mongodb URL
MONGODB_SERVER_KEY="<PUT MONGDB SERVER KEY>"

## Firebase Storage
API_KEY=""
AUTH_DOMAIN=""
PROJECT_ID=""
STORAGE_BUCKET=""
MESSAGING_SENDER_ID=""
APP_ID=""

## JWT SECRET Token - decide yourself secret key.
JWT_TOKEN_SECRET_MESSAGE=""
ADMIN_JWT_TOKEN_SECRET_MESSAGE=""

## Razorpay payment gateway key
RAZORPAY_API_KEY=""
RAZORPAY_SECRET_KEY=""

```

We need to accept firebase image storage bucket, so you have to create new project from firebase and make sure fill api key to backend .env file.
Then lastly, Go to 'Rules' tabs from "Storage" and update changes -
```bash
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {

    // This rule allows anyone with your Storage bucket reference to view, edit,
    // and delete all data in your Storage bucket. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Storage bucket will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Storage bucket will be denied until you Update
    // your rules
    match /{allPaths=**} {
      allow read, write: if request.time < timestamp.date(2035, 5, 14);
    }
  }
}
```

for Frontend, in .env.local file-

```bash
VITE_BACKEND="<BACKEND URL>"
BACKEND="<BACKEND URL>"
## Make sure replace your backend url
VITE_AUTH_API_URL="<BACKEND URL>/auth/"
VITE_ADMIN_AUTH_API_URL="<BACKEND URL>/admin/"

## if you are planning to build, then change to true
VITE_PRODUCTION_MODE=false

## Frontend url
VITE_URL=""
```

you need install npm dependecy in each folder(frontend and backend).
```bash
npm install
```


if you want to start local,

Backend (make sure the current path should be inside of backend) -

```bash
npm run start
```
make sure backend server should be keep running.

Frontend (make sure the current path should be inside of frontend)-
```bash
npm run dev
```

## Demo

Explore our demo store.

<p align="left">
  <a href="https://pureplantparadise.netlify.app/admin" class="button">Admin Panel</a>
</p>
<b>Admin Demo user:</b>

Email: demoadmin@pureplantparadise.com<br/>
Password: demo@12345

<p align="left">
  <a href="https://pureplantparadise.netlify.app" class="button">Store Front</a>
</p>
<b>Demo user:</b>

Email: demo@pureplantparadise.com<br/>
Password: demo7890

## Support

If you like my work, feel free to:

- ⭐ this repository. It helps.

### Ask a question about Pureplantparadise

You can ask questions, and participate in discussions about EverShop-related topics in the EverShop Discord channel.

<a href="https://discordapp.com/users/niraj_deshmukh10"><img width="150" src="https://programmaticsoup.com/wp-content/uploads/2021/07/1__AsB_hCguMYC-wEG2Bidmw.png" /></a>

### Create a bug report

If you see an error message or run into an issue, please [create bug report](https://github.com/nirajd10/pureplantparadise/issues/new).

## License

[GPL-3.0 License](https://github.com/evershopcommerce/evershop/blob/main/LICENSE)
