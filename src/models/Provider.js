const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    document: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

ProviderSchema.plugin(mongoosePaginate);

mongoose.model("Provider", ProviderSchema);