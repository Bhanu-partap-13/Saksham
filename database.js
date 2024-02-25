const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/sakshamProject', {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
        console.log('Connected to db');
    } catch (error) {
        console.log('error connecting to db', error);
    }
}

// export the above function
module.exports = connectDb;