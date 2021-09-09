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

## API ENDPOINTS
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

##  /api/v1/group
  * POST /group => Create Group
    * Request Body :
      * name - primary key
      * description 
  * GET /group => Get Group
     * Query Param :
        * name - Group name.
  * PUT /api/v1/user/group => Add user to a group.
     * Request Body :
       * groupName - mandatory
     
##  /api/v1/expense
  * POST /expense => Create Expense bill
    * Request Body :
      * amount - mandatory
      * whoPaid - mandatory, user who paid the bill.
      * expenseType  - mandatory, possible values : EQUAL,EXACT,PERCENT
      * owedUsers - mandatory, if expenseType = EQUAL, then {"emailorPhone": <email,number>} ,  if expenseType = EXACT, then {"emailorPhone": <email,number>, "amount" : <amount>} if expenseType, then {"percent": <percent>}

  * GET /api/v1/expense?bill_id=<bill_id> => Get Bill Details
     * Query Param :
        * bill_id - Bill id.
 
  * PUT /api/v1/expense
     * Request Body :
        * bill_id - mandatory
        * user_id - mandatory, user who is paying the bill.
        * amount - mandatory.

