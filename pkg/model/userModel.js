const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'User must have username!'],
    },
    email: {
        type: String,
        required: [true, 'User must have email!'],
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true,'User must have password'],
    },
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    next();
});

const User = mongoose.model('User',userSchema);
module.exports = User;