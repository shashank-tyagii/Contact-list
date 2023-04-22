const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }

})

// Define collection for this schema
const Contact = mongoose.model('Contact', contactSchema);

// Export this file 
module.exports = Contact;