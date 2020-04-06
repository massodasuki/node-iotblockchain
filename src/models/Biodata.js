var mongoose = require('mongoose');

var BiodataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    age: String,
    sex: String,
    bmi: String,
    child: String,
    smoker: String,
    region: String,
    charges:String,
    created: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Biodata', BiodataSchema);
