# Configuration
Before starting the app , lets ensure cofiguration is alright. 
Check under /config/default.json 
Make any changes to rapidapi keys , hosts, url,etc if needed. Now we are set to run the app. 

# Mutual fund portfolio tracker system
Ensure docker is active. And just run the one line command. This will pull in mongodb database and nodejs images, build a local image of the application and run the same in required sequence.

docker compose up

OR

docker-compose up  (on older versions of docker)

# Skip this step if previous was done. Mutual fund portfolio tracker system (running without docker)
To run in local use nodejs version 16 and have mongodb installed and running in local. 

npm install 

node index.js


Now that the application is up and running we can register a user and start making requests.
For best experience use postman

# Register a new user

Make a POST request to 
http://localhost:3000/users/register 
with the following json body.

{
"name" : "VinitD",
"email" : "dummymail@gmail.com",
"password" "dummy1234"
}

Should respond with a 200 OK response.
In the response headers check for a field called as : "x-auth-token"
Copy the token to be included in all subsequest requests for the user. 

# Authenticate a user for any requests:
Include the "x-auth-token" received in the register step in headers for all the requests now onwards. 

# Test that authentication works
http://localhost:3000/users/me

It should respond with user details.

# Fetch all the mutual funds for a specific family(optional).
Make a GET request to 
http://localhost:3000/funds/all
with the following json body. 

{
 "family" : "Taurus Mutual Fund"   
}
 OR just an empty body to fetch all the mutual funds irrespective of family.
 {

 }


This should return a response with a list of mutual fund details. 



# Portfolio
Make a GET request to
http://localhost:3000/funds/portfolio


This currently returns dummy responses. 





