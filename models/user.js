const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdProjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    sharedProjects:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);