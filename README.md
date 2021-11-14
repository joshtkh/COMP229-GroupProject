# COMP229-GroupProject

How To Install:

1. git clone the repo
2. npm install
3. You need to run mongo locally on 27017 OR
   You need to put a .env file in the root directory with a connection string to our atlas database named MONGO_URI
   EX: The file should look like this (replace <username>, <password>, <secret>, and "myFirstDatabase" with the appropriate values for our group.
   
   MONGO_URI=mongodb+srv://<username>:<password>@scy-ber.gaf2t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   MONGO_SECRET=<secret>
   
4. You can now run "npm start" and the application will launch on the local port 3000. Access the site on localhost:3000/
