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
    image: {
      type: String,
      required: false,
    },
    endDate: {
      type: Date,
      required: true,
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
      enum: ['ongoing', 'closed', 'rejected', 'assessment', 'interview'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('job', JobSchema);
