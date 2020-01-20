var mysql = require('mysql');
var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];


exports.findById = function(id, cb) {
  conn=mysql.createConnection({
      "host":'localhost',
      "user":'root',
      "password":'root',
      "database":'chatapp',
    });
    records=conn.query('SELECT * FROM users', function(err,records){
      if(err) return cb(null, null);
      process.nextTick(function() {
        var idx = id - 1;
        if (records[idx]) {
          cb(null, records[idx]);
        } else {
          cb(new Error('User ' + id + ' does not exist'));
        }
      });
   });
}

exports.findByUsername = function(username, cb) {
  conn=mysql.createConnection({
      "host":'localhost',
      "user":'root',
      "password":'root',
      "database":'chatapp',
    });
    records=conn.query('SELECT * FROM users', function(err,records){
      if(err) return cb(null, null);

      process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
          var record = records[i];
          if (record.username === username) {
            return cb(null, record);
          }
        }
        return cb(null, null);
      });
    });
}
