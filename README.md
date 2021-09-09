# setu-assignment-node-app
Created nodejs application for split-wise app.

# Features
The project uses express js as framework and mongodb as the main database

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/deepakj619/setu-assignment-node-app.git # or clone your own fork
cd setu-assignment-node-app
npm install
npm start
```

## .env file
A .env.example file is already provided with the project. Change the name to .env. If you have a mongo db installed in local. Change configuration in this file. This will load up process.env values


## POSTMAN COLLECTIONS
A [POSTMAN](https://github.com/deepakj619/setu-assignment-node-app/blob/main/Setu-Assignment-Collection.postman_collection.json) collection is also provided. You can import this file in your postman. This would load all apis

## API
Following are the apis supported in the project


##  /api/v1/user
  * POST /user => Create User
    * Request Body :
      * email or phone number. (either one or both) - primary key
      * name 
  * GET /user => Get User
     * Query Param :
        * email or phone number. (either one or both)
   * PUT /api/v1/user/group => Add user to a group.
     * Request Body :
       * groupName - mandatory
       * email - mandatory



