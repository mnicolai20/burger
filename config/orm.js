const connection = require("../config/connection.js");

const orm = {
    selectAll: function(input, cb) {
        const queryString = "SELECT * FROM "+ input +";";
        connection.query(queryString, function(err, result){
            if (err) throw err;
            console.log(result);
            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
          console.log(result);
          cb(result);
        });
      },

      // An example of objColVals would be {name: panther, sleepy: true}
      updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
          console.log(result);
          cb(result);
        });
      }
};

module.exports = orm;