# NodeForm

Api for the Web.

## Deploy

### Install dependencies  
    
    npm install

### Configure  

Review models/db.js to set database configuration

### Init database

    npm run installDB

## Start

To start a single instance:
    
    npm start

To start in cluster mode: 

    npm run cluster  

To start a single instance in debug mode:

    npm run debug (including nodemon & debug log)

## Test

    npm test (pending to create, the client specified not to do now)

## JSHint & JSCS

    npm run hints

## API v1 info


### Base Path

The API can be used with the path: 
[API V1](/apiv1/asistentes)


### Error example

    {
      "ok": false,
      "error": {
        "code": 500,
        "message": "Server Error"
      }
    }

