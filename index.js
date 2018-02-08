const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Intercom = require('intercom-client');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3000;
const sendMessage = require('./routes/send_message');
const messageHandler = require('./routes/message_handler');


app.listen(port, () => {
  console.log('Listening on port', port);
});
app.use(express.static('public'));

app.use('/send_message', sendMessage);
app.use('/message_handler', messageHandler);
