const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const RentalSchema = new mongoose.Schema({
    customer: {
        type: Object,
        required: true,
        name: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true
        }
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
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    beingMonitored: {
        type: Boolean,
        required: true,
        default: false
    },
    observations: {
        type: String,
        required: false
    },
    deadline: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

RentalSchema.plugin(mongoosePaginate);

mongoose.model("Rental", RentalSchema);