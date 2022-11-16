const Category = require('../models/Category');
const Job = require('../models/Job');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

exports.getJobs = async (req, res) => {
  //   try {
  //     const categories = await Category.find({ user: req.params.userId }).sort({
  //       createdAt: 'ascending',
  //     });
  //     if (categories) {
  //       res.json(categories);
  //     }
  //   } catch (error) {
  //     res.status(400).send('Error Loading categories');
  //   }
};

exports.fetchJob = async (req, res) => {
  try {
    const { link } = req.body;

    if (!link) return res.status(400).send('Please enter url');

    // fetch job info
    const response = await fetch(link);
    const body = await response.text();

    // parse the html text and extract titles
    const $ = cheerio.load(body);
    const title = $('title').text();
    const desc = $('meta[name=description]').attr('content');
    const image = $('meta[property=og:image]').attr('content');

    res.json({
      title,
      desc,
      image,
    });
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};

exports.addJob = async (req, res) => {
  try {
    const { link, description, category, date } = req.body.jobDetails;

    // validate fields
    // if (!link) return res.status(400).send('Please enter url');
    // if (!category) return res.status(400).send('Please select category');

    // check if job with same link exists
    // let jobExist = await Job.findOne({
    //   link: link,
    //   user: req.params.userId,
    // }).exec();
    // if (jobExist) return res.status(400).send('You already added this job');

    // fetch job info
    const response = await fetch(link);
    const body = await response.text();

    // parse the html text and extract titles
    const $ = cheerio.load(body);
    const title = $('title').text();
    const desc = $('meta[name=description]').attr('content');
    const image = $('meta[property=og:image]').attr('content');

    // using CSS selector
    // $('._eYtD2XCVieq6emjKBH3m').each((i, title) => {
    //   const titleNode = $(title);
    //   const titleText = titleNode.text();

    //   titleList.push(titleText);
    // });
    res.json({
      title,
      desc,
      image,
    });
  } catch (err) {
    return res.status(400).send('Error. Try again');
  }
};