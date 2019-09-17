const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const SaleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    nf: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true,
    },
    customerID: {
        type: String,
        required: true
    },
    saleCoast: {
        type: Number,
        default: 0
    },
    saleValue: {
        type: Number,
        required: true
    },
    salesman: {
        type: String,
        default: 'N/A'
    },
    salesmanID: {
        type: String,
        default: 0
    },
    status: {
        type: Boolean,
        default: 1
    },
    number: {
        type: Number,
        required: true
    },
    merchandise: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

SaleSchema.plugin(mongoosePaginate);

mongoose.model("Sale", SaleSchema);