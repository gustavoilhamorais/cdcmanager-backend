const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate");

const CustomerSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: true
    },
    document: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

CustomerSchema.plugin(mongoosePaginate);

mongoose.model('Customer', CustomerSchema);