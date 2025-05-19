const mongoose = require('mongoose');

const uri = 'mongodb+srv://julesdemont11:HeLBGukZAGQqMWKC@projettw.ithdu0i.mongodb.net/locationDB?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });