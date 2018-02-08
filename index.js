const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;
const accountSid = process.env.sid;
const authToken = process.env.token;



app.listen(port, () => {
  console.log('Listening on port', port);
});
app.use(express.static('public'));

app.post('/', function (req, res) {
  console.log(req.body);
  let zip = req.body.FromZip;
  let state = req.body.State;
  let phone = req.body.From;
  let message = req.body.Body;
  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);
  client.messages.create({
    body: 'Thanks For Your Message',
    to: `${phone}`,  // Text this number
    from: '+17206054564' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
})
