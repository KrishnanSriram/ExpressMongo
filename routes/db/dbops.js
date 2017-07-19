const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Build the connection string 
const dbURI = 'mongodb://localhost:27017/GrangeDB';
mongoose.connect(dbURI);
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});
// create a schema
var userSchema = new Schema({
  user_id: { type: String, required: true },
  ip_address: { type: String, required: true },
  device_key: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

var GrangeDB = {
    'User': mongoose.model('User', userSchema)
};

module.exports = GrangeDB;