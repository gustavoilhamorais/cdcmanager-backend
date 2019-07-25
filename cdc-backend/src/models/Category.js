const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    default: "venda"
  },
  atStorage: {
    type: Number,
    required: true,
    default: 0
  },
  minimumAtStorage: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CategorySchema.plugin(mongoosePaginate);

mongoose.model("Category", CategorySchema);
