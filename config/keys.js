/* 
    module.exports makes objects in this file available
    to other files 
*/
module.exports = {
  mongoURI: "mongodb://efficacyadmin:aim99aim@localhost:27017/efficacy"
};

/*
use efficacy   
db.createUser(
   {
     user: "efficacyadmin",
     pwd: "aim99aim",
     roles: [ "readWrite", "dbAdmin" ]
   }
)
*/

/*
db.createUser(
  {
    user: "eff",
    pwd: "123123",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, 
             { role: "dbAdminAnyDatabase", db: "admin" }, 
             { role: "readWriteAnyDatabase", db: "admin" } ]
  }
)
*/
