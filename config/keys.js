/* 
    module.exports makes objects in this file available
    to other files 
*/
module.exports = {
    mongoURI: "mongodb://admin:123123@localhost:27017/efficacy"
};

/*
use efficacy   
db.createUser(
   {
     user: "admin",
     pwd: "123123",
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

/* GIT
  git remote add origin https://github.com/lareman/efficacy.git
  git push -u origin master
*/
