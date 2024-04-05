// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String, 
//     age: Number
// })

// const UserModel = mongoose.model('user', userSchema);

// module.exports = UserModel;


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Remove whitespace from both ends of the string
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness of email addresses
        trim: true,
        lowercase: true // Convert email addresses to lowercase
    },
    age: {
        type: Number,
        min: 18 // Validate minimum age
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Define pre-save middleware to perform additional logic before saving the document
userSchema.pre('save', function(next) {
    // Perform any additional logic here
    next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

