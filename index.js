const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Intercom = require('intercom-client');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;
const accountSid = process.env.sid;
const twilioToken = process.env.twilio_token;
const client = new Intercom.Client({ token: process.env.intercom_token });


app.use(bodyParser.json({ extended: true }));

app.listen(port, () => {
  console.log('Listening on port', port);
});
app.use(express.static('public'));

app.post('/', function (req, res) {

  let message = req.body.data.item.conversation_parts.conversation_parts[0].body.replace(/<(?:.|\n)*?>/gm, '');

  let userId = req.body.data.item.user.id;


  client.users.find({ id: `${userId}` }, (user) => {
    var phone = user.body.phone;
    var twilio = require('twilio');
    var client = new twilio(accountSid, twilioToken);
    client.messages.create({
      body: `${message}`,
      to: `${phone}`,
      from: '+17206054564' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
  });

})
