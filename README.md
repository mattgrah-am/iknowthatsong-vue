# I Know that Song

## about

A simple web app that allows the end user to search for an artist or band, which in turn generates a set of multiple choice questions where the end user is to guess the song whilst a short 30sec music clip is played. If the user guesses correctly the name of the song is highlighted green, if the user selects incorrectly the name of the selected guess is highlighted red. At the end the web app will tell the end user how they did.

## development

This project is using a Vue Js with Vite and uses Cloudflare workers to complete API calls to Deezer.

Auto install all dependencies for client and server:
`npm install`

Run a development server for React and an Express Back end with nodemon auto re-start and ts-node
`npm run dev`

Head to `localhost:5173` for development.

## Production

Auto install all dependencies for client and server:

`npm install`

Build a production Vue App

`npm run build`
