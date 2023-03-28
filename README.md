# Level 4 Task 34 -Authentication with JWT

## Task 1

Create an Express app by following the guide. It should have the following endpoints:

● /login - checks POSTed username and password and produces a JWT.

● /resource - checks JWT in auth header and displays a message with the username.

● /admin_resource - checks JWT and displays a message if the token is verified and the token holder is an admin.

## Task 2

Extend your Express app to have more comprehensive authorisation.

● Create 3 users (store them as you please — hardcoded, in a file, or in a db) with the following route access permissions:

○ Mazvita - /a

○ Meagan - /a and /b

○ Kabelo - /b and /c

● The users should only have permission to access the routes mentioned above, and the /login endpoint. You may store these permissions in your JWT as you see fit. Remember, anything you can put in JSON, you can put in the JWT payload.

● Create the /a, /b, and /c endpoints, each checking if the requesting user has permission to access it.

Submit your index.js.
