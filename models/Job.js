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
    sld: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    notes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'note',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
    status: {
      type: String,
      enum: [
        'applied',
        'not applied',
        'closed',
        'rejected',
        'assessment',
        'interview',
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('job', JobSchema);
