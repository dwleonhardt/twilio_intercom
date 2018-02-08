const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Intercom = require('intercom-client');
const twilio = require('twilio');
const accountSid = process.env.sid;
const twilioToken = process.env.twilio_token;
const client = new Intercom.Client({ token: process.env.intercom_token });

router.use(bodyParser.urlencoded({ extended: true }));


router.post('/', function (req, res) {
  let message = req.body.Body;
  let phone = req.body.From;
  
})

module.exports = router;
