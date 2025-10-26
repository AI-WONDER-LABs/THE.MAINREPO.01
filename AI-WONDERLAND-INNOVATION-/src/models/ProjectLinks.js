/**
 * ProjectLinks Model (MongoDB)
 * Represents external and social media links for projects
 */

const mongoose = require('mongoose');

const projectLinksSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      unique: true,
      index: true,
    },
    website: {
      type: String,
      trim: true,
    },
    appStore: {
      ios: {
        type: String,
        trim: true,
      },
      android: {
        type: String,
        trim: true,
      },
    },
    repository: {
      github: {
        type: String,
        trim: true,
      },
      gitlab: {
        type: String,
        trim: true,
      },
      bitbucket: {
        type: String,
        trim: true,
      },
    },
    social: {
      linkedin: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      facebook: {
        type: String,
        trim: true,
      },
      instagram: {
        type: String,
        trim: true,
      },
      reddit: {
        type: String,
        trim: true,
      },
      youtube: {
        type: String,
        trim: true,
      },
    },
    professional: {
      behance: {
        type: String,
        trim: true,
      },
      dribbble: {
        type: String,
        trim: true,
      },
      medium: {
        type: String,
        trim: true,
      },
    },
    other: [
      {
        label: String,
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProjectLinks = mongoose.model('ProjectLinks', projectLinksSchema);

module.exports = ProjectLinks;
