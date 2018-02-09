const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Intercom = require('intercom-client');
const twilio = require('twilio');
const accountSid = process.env.sid;
const twilioToken = process.env.twilio_token;
const client = new Intercom.Client({ token: process.env.intercom_token });

router.use(bodyParser.json({ extended: true }));


router.post('/', function (req, res) {
  console.log('here');
  let message = req.body.data.item.conversation_parts.conversation_parts[0].body.replace(/<(?:.|\n)*?>/gm, '');

  console.log(message);

  let userId = req.body.data.item.user.id;

  client.users.find({ id: `${userId}` }, (user) => {
    var phone = user.body.user_id;
    var client = new twilio(accountSid, twilioToken);
    client.messages.create({
      body: `${message}`,
      to: `${phone}`,
      from: '+17206054564' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
  });
  res.send('ok');
})

module.exports = router;
