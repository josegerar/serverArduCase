const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdDate: {
        type: Date,
        required: true
    },
    lastAccessDate: {
        type: Date,
        required: true
    },
    lastUpdateDate: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    canvasJSON: {
        type: String,
        required: true
    },
    especJSON: {
        type: String,
        required: true
    },
    sharedUsers:[
        {
            type: Schema.Types.String,
        }
    ]
});

module.exports = mongoose.model('Project', projectSchema);