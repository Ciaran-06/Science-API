let express = require('express');
let router = express.Router();
let mysql = require('mysql');
require('dotenv').config();
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }  
});


router.get("/", (req,res,next) => {
    res.send("Hello World"); 
}) 

router.post("/signup", (req,res,next) => {
    searchUser(req.body.username);
    let newUser = "INSERT INTO accounts (Username,Password,Email) VALUES ('" + req.body.username + "','" + req.body.password + "','" + req.body.email + "')";
    try {
        res.send("Signup");
        searchUser(req.body.username);
    } catch (error) {
        res.send(error);
    }
})

router.get("/login", (req,res,next) => {
    console.log("Login")
});

function searchUser(username) {
    let search = "SELECT count(*) FROM accounts WHERE Username = '" + username + "'";
    let result = connection.query(search, function(err, result, field){
        //console.log(result[0]);

        if (result[0]['count(*)'] == 0) {
            console.log("User not found"); //debug lines
            return false;
        } else {
            console.log("User found"); //debug lines
            return true;
        }
    });
}

module.exports = router;