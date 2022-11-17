const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NoteSchema = new Schema(
  {
    note: {
      type: String,
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'job',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('note', NoteSchema);
