# Social-Media-Thing-React-Tests

## What's inside? 🎁

`client` is the front-end React app
The poorly named `dali-application` is the back-end Node.js + SQLite3 server

## Dependencies
You should be able to install all dependencies if you go into both folders and run `npm i`. SQLite3 might give you some extra trouble -- in this case, just uninstall it and reinstall it! To do this, run `npm uninstall sqlite3` and `npm i sqlite3`.

Also, make sure you have no programs currently using ports `3000` or `8080`. 

## How to Run
First, start the backend. To do so, `cd` into `dali-application` and run `node index.js` or `npm start`. You have to start this first if you want ~~to live~~ the front end to load the elements properly. 

Then, start the frontend. To do this, `cd` into `client` and run `npm start`. This should automatically load up the page in your default browser -- if not, simply go to `localhost:3000` and it should work. 

## How to Test
To test the front end, just click around! If you need to verify that the change quote button is actually updating the database in the backend, see below. 

To test the backend, you can either interface using the front end, or you can use Postman. All GET queries use URL query params, i.e. `?param=hi`. All POST requests use a JSON-encoded body. There are a few endpoints you can call:
* `allusers` -- this will return all users, or a certain fraction of the users that you specify with `offset` and `limit`. Note that all the different ethnicities have been combined into one, single data value called `ethnicity`. 
* `users` -- this will allow you to get users with specific attributes, just like in SQL! So, if you specify `name=Jeff`, it will return all users with a name matching `Jeff` exactly
* `search` will return all users whose names start with the `name` query parameter you supply
* `changequote` will change the quote to be `quote` for the person whose name is `name`. (query params)

To test & view the database, load it into the SQLite Browser. 
