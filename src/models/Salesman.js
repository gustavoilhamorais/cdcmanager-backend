const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const SalesmanSchema = new mongoose.Schema({
    ID: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      default: "N/A"
    },
    phone: {
      type: "String",
      default: "N/A"
    },
    email: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now() 
  },
});

SalesmanSchema.plugin(mongoosePaginate);

mongoose.model("Salesman", SalesmanSchema);