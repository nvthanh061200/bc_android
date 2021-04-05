const mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",  
    database: "ql_todo_list"
});
var connect = function () {
    connection.connect((err) => {
        if (err) {
            console.log("loi roi nha -------------------");
            console.log(err);
            console.log("loi roi nha -------------------");
        } else {
            console.log("Connection successfully");
        }
    });
}
var closeDB = function () {
    connection.end(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("closed DB");
        }
    })
}
module.exports = {
    connection,
    connect,
    closeDB
}
