const Note = require('../models/Note');
const Job = require('../models/Job');

exports.getNotes = async (req, res) => {
  const { userId } = req.body;
  try {
    const notes = await Note.find({ job: req.params.jobId, user: userId }).sort(
      {
        createdAt: 'descending',
      }
    );
    if (notes) {
      res.json(notes);
    }
  } catch (error) {
    res.status(400).send('Error loading notes');
  }
};

exports.addNote = async (req, res) => {
  try {
    const { note, jobId } = req.body;

    // validate fields
    if (!note) return res.status(400).send('Field cannot be empty');

    const newNote = new Note({
      note: note,
      user: req.params.userId,
      job: jobId,
    });

    await newNote.save();

    const job = await Job.findOne({ _id: jobId, user: req.params.userId });
    job.notes.push(newNote._id);
    await job.save();

    return res.json(job);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { jobId, noteId } = req.body;

    await Note.deleteOne({
      user: req.params.userId,
      _id: noteId,
    }).exec();

    const job = await Job.findOne({ user: req.params.userId, _id: jobId });

    if (job) {
      const noteToRemove = job.notes.indexOf(noteId);
      job.notes.splice(noteToRemove, 1);
      job.save();
    }

    return res.json(job);
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};
