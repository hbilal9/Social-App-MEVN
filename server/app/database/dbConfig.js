const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI,
    () => {
        console.log('Database connected.')
    }, e => {
        console.log(e)
    });

module.exports = mongoose;