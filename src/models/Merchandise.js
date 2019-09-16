const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const MerchandiseSchema = new mongoose.Schema({
  name: {
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
  atStorage: {
      type: Number,
      default: 0
  },
  minimumAtStorage: {
    type: Number,
    default: 0
  },
  code: {
    type: Number,
    default: 000000
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

MerchandiseSchema.plugin(mongoosePaginate);

mongoose.model("Merchandise", MerchandiseSchema);
