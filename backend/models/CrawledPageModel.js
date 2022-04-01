import mongoose, { Schema } from 'mongoose';

const crawledPageSchema = new Schema({
  url: {
    type: String,
    unique: true
  },

  title: {
    type: String,
  },

  description: {
    type: String
  },
  h1: {
    type: String
  },

  h2: {
    type: String
  },

  linkCount: {
    type: String,
    required: true
  },
  //todo: add here the missing fields
  creationDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('CrawledPage', crawledPageSchema);
