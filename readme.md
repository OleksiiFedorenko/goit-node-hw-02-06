# Contacts Management

The goal is to learn how to create fully complete backend part for contact
management aplication based on **Node.js**. The task is divided into 6
parts(homeworks):

- First part is a separate CLI application which can be found
  <a href="https://github.com/OleksiiFedorenko/goit-node-hw-01">here</a>.
- The remaining parts (2-6) are described below and created as branches in
  current repo. After approval from mentor they are being merged to master
  branch, but are not being deleted. Each of the next homework is based on a
  previous one.

## Homework 2-6 links:

- [Homework 02](#homework-02-expressrest-api)
- [Homework 03](#homework-03-mongodbmongoose)
- [Homework 04](#homework-04-authentification)
- [Homework 05](#homework-05-image-uploadingtesting)
- [Homework 06](#homework-06-websockets)

## Homework 02: Express/REST API

The task is to create a REST API web server using **Express**, **Morgan**, and
**Cors**. We use a JSON file to emulate a database. For the validation of input
data use **Joi**. It should support following routes:

### GET /api/contacts

- Does not receive anything
- Returns an array of all contacts in JSON format with a status code of 200

### GET /api/contacts/:id

- Does not receive a body
- Receives the "id" parameter
- If the specified "id" exists, returns the contact object in JSON format with a
  status code of 200
- If the specified "id" does not exist, returns a JSON object with the key
  "message": "Not found" and a status code of 404

### POST /api/contacts

- Receives the body in the format {name, email, phone} (all fields are required)
- If any required fields are missing in the body, returns a JSON object with the
  key "message": "missing required name field" and a status code of 400
- If all fields are present in the body, adds a unique identifier to the contact
  object
- Returns an object with the added id, name, email, and phone fields and a
  status code of 201

### PUT /api/contacts/:id

- Receives the id parameter
- Receives the body in JSON format with the updated fields name, email, and
  phone
- If the body is missing, returns a JSON object with the key "message": "missing
  fields" and a status code of 400
- If the contact with the specified id is not found, returns a JSON object with
  the key "message": "Not found" and a status code of 404
- Returns the updated contact object and a status code of 200

### DELETE /api/contacts/:id

- Does not receive a body
- Receives the id parameter
- If the specified id does not exist, returns a JSON object with the key
  "message": "Not found" and a status code of 404
- If the specified id exists, returns the removed contact object and a status
  code of 200

## Homework 03: MongoDB/Mongoose

The task is to create a MongoDB database and refactor the code using Mongoose.
The process can be divided into 5 steps:

### Step 1: MongoDB Atlas Account Setup

1. Create an account on MongoDB Atlas.
2. Create a new project and configure a free cluster.
3. Create a user with administrator privileges.

### Step 2: Install MongoDB Compass

1. Install MongoDB Compass, a graphical editor for MongoDB.
2. Configure the connection to your cloud database in MongoDB Atlas.

### Step 3: Create and Populate the Database

1. Use MongoDB Compass to create a database named **'db-contacts'**.
2. Within the **'db-contacts'** database, create a collection named
   **'contacts'**.
3. Import the JSON data into the **'contacts'** collection using MongoDB
   Compass.

### Step 4: Connect to MongoDB with Mongoose

1. Replace the storage of contacts from a JSON file to the MongoDB database you
   created.
2. Write code to establish a connection to MongoDB using Mongoose.
3. Upon successful connection, print the message "Database connection
   successful" to the console.
4. Handle connection errors. Print the error message to the console and exit the
   process using **'process.exit(1)'**.

### Step 5: Update Contact Status

1. Implement a new route for updating the favorite status of a contact.
2. Endpoint: **'PATCH /api/contacts/:id/favorite'**
3. Accepts the **'id'** parameter.
4. Accepts the **'favorite'** field in the request body as a JSON format for
   updating the **'favorite'** field of the contact.
5. If the request body is missing the **'favorite'** field, return a JSON
   response with the key **'"message": "missing field favorite"'** and status
   code 400.
6. If the request is successful, call the **'updateStatusContact(id, body)'**
   function (implement it) to update the contact in the database.
7. Return the updated contact object with a status code of 200. If the contact
   is not found, return a JSON response with the key **'"message": "Not
   found"'** and status code **'404'**.

## Homework 04: Authentification

The goal is to add features of authentication and authorization using JSON Web
Tokens (JWT). It should contain following:

### User Registration

#### Endpoint '/users/register'

This endpoint is used to register a new user.

- Request method: **POST**
- Request body:

```
{
  "email": "example@example.com",
  "password": "examplepassword"
}
```

- Validation error response:
  - Status: **'400 Bad Request'**
  - Content-Type: **'application/json'**
  - Response body: **'<Validation error message>'**
- Conflict error response (email already in use):
  - Status: **'409 Conflict'**
  - Content-Type: **'application/json'**
  - Response body:
  ```
  {
  "message": "Email is already in use"
  }
  ```
- Success response:
  - Status: **'201 Created'**
  - Content-Type: **'application/json'**
  - Response body:
  ```
  {
    "user": {
      "email": "example@example.com",
      "subscription": "starter"
    }
  }
  ```

### User Login

#### Endpoint '/users/login'

This endpoint is used to authenticate a user.

- Request method: **POST**
- Request body:

```
{
  "email": "example@example.com",
  "password": "examplepassword"
}
```

- Validation error response:
  - Status: **'400 Bad Request'**
  - Content-Type: **'application/json'**
  - Response body: **'<Validation error message>'**
- Success response:
  - Status: **'200 OK'**
  - Content-Type: **'application/json'**
  - Response body:
  ```
  {
    "token": "exampletoken",
    "user": {
      "email": "example@example.com",
      "subscription": "starter"
    }
  }
  ```
- Authentication error response:
  - Status: **'401 Unauthorized'**
  - Content-Type: **'application/json'**
  - Response body:
  ```
  {
    "message": "Email or password is wrong"
  }
  ```

### Token Validation

This middleware is used to verify the authenticity of the token and protect the
routes that require authentication.

- The middleware retrieves the token from the **'Authorization'** header and
  validates its authenticity.
- If the validation fails, it returns an "Unauthorized" error.
- If the validation succeeds, it retrieves the user's ID from the token and
  finds the corresponding user in the database.
- If the user exists and the token matches the one stored in the database, it
  saves the user's data in **'req.user'** and calls **'next()'** to proceed to
  the next middleware.
- If the user with the given ID does not exist or the tokens do not match, it
  returns an "Unauthorized" error.

**Unauthorized error response:**

- Status: **'401 Unauthorized'**
- Content-Type: **'application/json'**
- Response body:

```
{
  "message": "Not authorized"
}
```

### User Logout

#### Endpoint '/users/logout'

This endpoint is used to log out the current user.

- Request method: **POST**
- Middleware: Token Validation
- Unauthorized error response:
  - Status: **'401 Unauthorized'**
  - Content-Type: **'application/json'**
  - Response body:
  ```
  {
    "message": "Not authorized"
  }
  ```
- Success response:
  - Status: **'204 No Content'**

### Get Current User

#### Endpoint '/users/current'

This endpoint is used to retrieve the data of the current user based on the
token.

- Request method: **GET**
- Middleware: Token Validation
- Unauthorized error response:
  - Status: **'401 Unauthorized'**
  - Content-Type: **'application/json'**
  - Response body:
  ```
  {
    "message": "Not authorized"
  }
  ```
- Success response:
  - Status: **'200 OK'**
  - Content-Type: **'application/json'**
  - Response body:
  ```
  {
    "email": "example@example.com",
    "subscription": "starter"
  }
  ```

### Additional Task

- Implement pagination for the contacts collection (**GET**
  **'/contacts?page=1&limit=20'**).
- Implement filtering of contacts based on the favorite field (**GET**
  **'/contacts?favorite=true'**).
- Update user **'subscription'** via the **PATCH** endpoint **'/users'**. The
  subscription should have one of the following values:

```
['starter', 'pro', 'business'].
```

## Homework 05: Image uploading/testing

The main task is to implement the feature of user avatar uploading using
**Multer**. Additionally, there is an optional task to create tests for login
functionality using **Jest**.

### Avatar uploading

1. Configure Express to serve static files from the **'public'** directory.
2. Add new property **'avatarURL'** to user schema.
3. Generate the user's avatar URL using the **Gravatar** package when
   registrate.
4. Implement the endpoint **'/users/avatars'** to handle the avatar update
   functionality using the **PATCH** method.

#### Request

```
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: Bearer {{token}}
RequestBody: uploaded file
```

#### Successful Response

```
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "URL to the updated avatar image"
}
```

#### Unauthorized Response

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### For avatar upload:

- Create a **'tmp'** directory in the project root to store uploaded avatars
  temporarily.
- Process the uploaded avatar using the **Jimp** package and resize it to
  250x250 pixels.
- Move the user's avatar from the **'tmp'** directory to **'public/avatars'**
  and assign it a unique filename for the specific user.
- Save the generated **'/avatars/<filename.extension>'** URL in the user's
  **'avatarURL'** field.

### Testing

Write ~~unit tests~~ an integration test for the login controller using Jest.
The tests should ensure that:

- The response has a status code of **200**.
- The response contains a **token**.
- The value for token field has type **'String'**.

## Homework 06: Websockets

The task is to add feature of email verification for user registration using the
SendGrid service.

### How Email Verification Works

- After registration, users will receive an email to their provided email
  address with a verification link.
- When the user clicks the verification link for the first time, they will
  receive a response with a status code of 200, indicating successful email
  verification.
- If the user clicks the verification link again, they will receive a response
  with a status code of 404, indicating that the link is no longer valid.

### Step 1: Prepare SendGrid API Integration

1. Sign up for a SendGrid account.
2. Create an email sender within SendGrid.
3. Generate an API token and add it to the .env file in your project.

### Step 2: Create an Endpoint for Email Verification

Add the following fields to the User model for email verification:

```
{
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}
```

Create an endpoint with the path **/users/verify/:verificationToken**, where the
parameter **'verificationToken'** will be used to find the user in the User
model.

- If a user with the specified token is not found, return an error with a status
  code of **404 (Not Found)**.
- If the user is found, set the **'verificationToken'** to '' and set the verify
  field to true in the user document, then return a success response with a
  status code of **200 (OK)**.

Verification Request

```
GET /auth/verify/:verificationToken
```

Verification User Not Found

```
Status: 404 Not Found
ResponseBody: {
  "message": "User not found"
}
```

Verification Success Response

```
Status: 200 OK
ResponseBody: {
  "message": "Verification successful",
}
```

### Step 3: Send Email with Verification Link

During user registration:

1. Generate a **'verificationToken'** for the user and save it in the database
   (you can use packages like **'uuid'** or **'nanoid'** for generating tokens).
2. Send an email to the user's provided email address with a verification link
   (e.g., **/users/verify/:verificationToken**).

Keep in mind that login will not be allowed for users with unverified email
addresses.

### Step 4: Resend Verification Email

To account for cases where the user may accidentally delete the email or
encounter any other issues with the email delivery:

Create an endpoint to resend the verification email to the user's email address.

- If the **'email'** field is missing in the request body, return an error with
  a status code of **400 (Bad Request)** and a JSON response with the message
  **'missing required field email'**.
- If the user has already been verified, return a JSON response with the message
  **'Verification has already been passed'** and a status code of **400 (Bad
  Request)**.
- If the request is valid and the user is not verified, resend the verification
  email and return a success response with a status code of **200 (OK)** and a
  JSON response with the message **'Verification email sent'**.

Resending a Email Request

```
POST /users/verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}
```

Resending a Email Validation Error

```
Status: 400 Bad Request
ResponseBody: <Error message from Joi or other validation library>
```

Resending a Email Success Response

```
Status: 200 OK
ResponseBody: {
  "message": "Verification email sent"
}
```

Resend Email for Verified User

```
Status: 400 Bad Request
ResponseBody: {
  "message": "Verification has already been passed"
}
```

### Additional task is to create dockerfile (not finalized yet)
