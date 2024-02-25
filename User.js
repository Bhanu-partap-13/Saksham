const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phnNumber: {
        type: Number,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
    },
    passwordConfirm: {
        type: String,
    },
    fieldOfInterest: {
        type: String,
        enum: ['Mathematics', 'Computing', 'Chemical', 'Medical', 'Electronics', "Textile", 'Finance', "History", 'Geograpgy']
    },
    grade: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E', 'F']
    },
});

module.exports = mongoose.model('User', UserSchema);