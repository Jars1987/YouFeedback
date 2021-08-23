const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../midlewares/requireLogin');
const requireCredits = require('../midlewares/requireCredits');

const Survey = require('../models/Survey');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { set } = require('lodash');
const e = require('express');

router.get('/api/surveys', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ author: req.user.id }).select({
    recipients: false
  });
  console.log(surveys);
  res.send(surveys);
});

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
  res.send('Thanks for Voting!');
});

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, body, subject, recipients } = req.body;

  const survey = await Survey({
    title,
    subject,
    body,
    recipients: recipients.split(';').map(email => ({ email: email.trim() })),
    author: req.user.id,
    dateSent: Date.now()
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.post('/api/surveys/webhooks', async (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');

  const events = req.body.map(({ email, url }) => {
    const match = p.test(new URL(url).pathname);
    if (match) return { email, ...match };
  });

  /* 
  In the end, the following code is not necessary as sendgrid now sends one notiifcation per click
  and not multiple clicks per notification as previously
  and so we need to work the responses in the DB
  
  Stephens approach
  const compactEvents = events.filter(e => !!e);
  const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

  Vanila JS approach after stack overflow questioning:  

  // Filter out undefined
  const compactEvents = events.filter(e => !!e);

  // A set to maintain unique combinations of email and surveyId
  const set = new Set();

  const uniqueEvents = [];

  const getUniqueKey = ({ email, surveyId }) => email + '||' + surveyId;

  for (const evt of compactEvents) {
    const key = getUniqueKey(evt);
    if (!set.has(key)) {
      // Check if the combination of email and surveyId already exists
      uniqueEvents.push(evt);

      set.add(key);
    }
  }
  */

  console.log(events);
  //remember that events returns an array with only one object sicen sendgrid now only sends one click event at a time
  const { surveyId, email, choice } = events[0];

  try {
    await Survey.updateOne(
      {
        _id: surveyId,
        recipients: {
          $elemMatch: {
            email: email,
            responded: false
          }
        }
      },
      {
        $inc: { [choice]: 1 },
        $set: {
          'recipients.$.responded': true
        }
      }
    ).exec();

    response.status(200).send();
  } catch (e) {
    console.log(error);
    response.status(403).send(error);
  }

  res.send({});
});

module.exports = router;
