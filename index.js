const express = require('express');
const app = express();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;
const accountSid = process.env.sid;
const authToken = process.env.token;
const messages = require('./routes/messages');

app.listen(port, () => {
  console.log('Listening on port', port);
});
app.use(express.static('public'));

  var twilio = require('twilio');
  // var client = new twilio(accountSid, authToken);
  // client.messages.create({
  //   body: 'Hello from Node',
  //   to: '+13038819484',  // Text this number
  //   from: '+17206054564' // From a valid Twilio number
  // })
  // .then((message) => console.log(message.sid));
