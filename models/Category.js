const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    jobCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('category', CategorySchema);
