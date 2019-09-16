const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    document: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

ProviderSchema.plugin(mongoosePaginate);

mongoose.model("Provider", ProviderSchema);