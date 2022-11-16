const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
    status: {
      type: String,
      enum: ['closed', 'rejected', 'assessment', 'interview'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('job', JobSchema);
