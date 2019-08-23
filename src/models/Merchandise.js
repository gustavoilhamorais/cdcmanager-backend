const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const MerchandiseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  sellValue: {
    type: Number,
    required: true
  },
  buyValue: {
      type: Number,
      required: true
  },
  status: {
      type: Boolean,
      required: true,
      default: true
  },
  code: {
    type: Number,
    required: true,
    default: 000000
  },
  autoBecomeAvailable: {
    type: Boolean,
    required: true,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

MerchandiseSchema.plugin(mongoosePaginate);

mongoose.model("Merchandise", MerchandiseSchema);
