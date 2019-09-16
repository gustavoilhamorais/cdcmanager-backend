const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ShoppingSchema = new mongoose.Schema({
  merchandise: {
    type: Array,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0.0
  },
  provider: {
    type: String,
    required: true
  },
  providerID: {
    type: String,
    required: true,
  },
  nf: {
    type: String,
    default: 'N/A'
  },
  shopValue: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

ShoppingSchema.plugin(mongoosePaginate);

mongoose.model("Shopping", ShoppingSchema);