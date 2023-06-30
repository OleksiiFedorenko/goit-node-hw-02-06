## Contacts Management

## Homework task definitions

- [Homework 02](#homework-02-expressrest-api)
- [Homework 03](#homework-03-mongodbmongoose)
- [Homework 04](#homework-04-authentification)
- [Homework 05](#homework-05-imagestexting)
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

## Homework 05: Images/texting

## Homework 06: Websockets
