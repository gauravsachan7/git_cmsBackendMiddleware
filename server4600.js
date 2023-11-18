const express = require("express");
const bodyParser = require("body-parser");
const db = require('./app/models/db') 
var cors = require('cors');
const nocache = require("nocache");
const app = express();
app.use(nocache());
// const WebSocket= require('ws');

// var U='http:cmsappstaging.exicom.in:80';
//  const socket= new WebSocket(U);

//  socket.addEventListener('open',function(event){
//    console.log('ws is connected')

//  });

 

var port = process.env.PORT || 4600;

var whitelist = ['http://localhost:5300','http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors());


// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Exicharger API." });
});
 
require("./app/swagger.config.js")(app);
 require("./app/routes/charger.routes.js")(app);
 require("./app/routes/alexa.routes.js")(app);
 require("./app/routes/otaservice.routes.js")(app); 
 require("./app/routes/remote-transaction.routes.js")(app);
 require("./app/routes/heart-beat.routes.js")(app);
 require("./app/routes/trigger-message.routes.js")(app);
 require("./app/routes/reset.routes.js")(app);
 require("./app/routes/clear-cache.routes.js")(app);
 require("./app/routes/change-availability.routes.js")(app);
 require("./app/routes/get-configuration.routes.js")(app);
 require("./app/routes/change-configuration.routes.js")(app);
 require("./app/routes/unlock-connector.routes.js")(app);
 require("./app/routes/data-transfer.routes.js")(app);
 require("./app/routes/get-local-list-version.routes.js")(app);
 require("./app/routes/status.routes.js")(app);
 require("./app/routes/get-diagnostics.routes.js")(app);
 require("./app/routes/update-firmwre.routes.js")(app);
 require("./app/routes/reserve-now.routes.js")(app);
 require("./app/routes/cancel-reservation.routes.js")(app);
 require("./app/routes/send-local-list.routes.js")(app);
 require("./app/routes/ClearChargingProfile.routes.js")(app);
//  require("./app/routes/active-transaction-id.routes.js")(app);

 


// set port, listen for requests
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  