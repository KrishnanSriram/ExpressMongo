const routes = require('express').Router();
const GrangeDB = require('./dbops');

routes.get('/', (req, res) => {
  res.status(200).json({message: 'Use /db/list, /db/devicekey ,/db/add (POST) API\'s'});
});

routes.get('/listall', (req, res) => {
  GrangeDB.User.find({}, (err, users) => {
    if(err) {
      res.status(200).json({message: err.message});
    } else {
      res.status(200).json(users);
    }
  });
});

routes.get('/devicekey', (req, res) => {
  const ipaddress = req.query.ipaddress;
  const userid = req.query.userid;

  if(nullCheckAndErrorOut(ipaddress, new Error("IP Address is missing"), res) == true) {
    return;
  }
  if(nullCheckAndErrorOut(userid, new Error("User ID is missing"), res) == true) {
    return;
  }

  GrangeDB.User.find({user_id: userid, ip_address: ipaddress}, (err, users) => {
    if(err) {
      res.status(200).json({message: err.message});
    } else {
      res.status(200).json(users);
    }
  });
});

routes.post('/add', (req, res) => {
  const ipaddress = req.query.ipaddress;
  const userid = req.query.userid;
  const devicekey = req.query.devicekey;

  if(nullCheckAndErrorOut(ipaddress, new Error("IP Address is missing"), res) == true) {
    return;
  }
  if(nullCheckAndErrorOut(userid, new Error("User ID is missing"), res) == true) {
    return;
  }
  if(nullCheckAndErrorOut(devicekey, new Error("Device Key is missing"), res) == true) {
    return;
  }
  var newUser = new GrangeDB.User({
    user_id: userid,
    ip_address: ipaddress,
    device_key: devicekey,
    created_at: new Date(),
    updated_at: new Date()
  });

  newUser.save(function(err) {
    if(err) {
      res.status(200).json({message: err.message});  
    } else {
      res.status(200).json({message: `User ${userid} saved in DB successfully`});
    }
  });

});

var nullCheckAndErrorOut = function(param, error, res) {
  if(param == null || param == undefined || param.length <= 0) {
    res.status(200).json({message: error.message});
    return true;
  }

  return false;
}


module.exports = routes;