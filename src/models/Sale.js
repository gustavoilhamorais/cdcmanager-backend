const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const SaleSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    merchan: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    value: {
        type: Number,
        required: true
    },
    observations: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

SaleSchema.plugin(mongoosePaginate);

mongoose.model("Sale", SaleSchema);