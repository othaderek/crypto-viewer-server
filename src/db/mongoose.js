const mongoose = require('mongoose');

// connect
mongoose.connect('mongodb://127.0.0.1:27017/cryptoviewer-api', {useNewUrlParser: true, useUnifiedTopology: true})
