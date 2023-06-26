## Contacts Management

## Homework task definitions

- [Homework 02](#homework-02)
- [Homework 03](#homework-03)
- [Homework 04](#homework-04)
- [Homework 05](#homework-05)
- [Homework 06](#homework-06)

## Homework 02: Express/REST API

The task is to create a REST API web server using Express. It should support
following routes:

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

## Homework 04: Authentification

## Homework 05: Images/texting

## Homework 06: Websockets
