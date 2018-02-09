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
  let city = req.body.FromCity;
  console.log(message);
  //
  client.users.find({ user_id: `${phone}` }, (user) => {
    if (user.body.errors) {
      client.users.create({ user_id: `${phone}` }, function (r) {
        let messageObj = {
          from: {
            type: "user",
            user_id: `${phone}`
          },
          body: `${message}`
        }
        client.messages.create(messageObj, () => {
          console.log('sent');
        });
      });
    }

    else {
      let messageObj = {
        from: {
          type: "user",
          user_id: `${phone}`
        },
        body: `${message}`
      }
      client.messages.create(messageObj, () => {
        console.log('sent');
      });
    }

  })
})




module.exports = router;
