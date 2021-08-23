const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipientSchema = new Schema({
  email: String,
  responded: {
    type: Boolean,
    default: false,
  },
});

const SurveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateSent: Date,
  lastResponded: Date,
});

module.exports = mongoose.model("Survey", SurveySchema);
