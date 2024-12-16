import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  template: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Template' 
  },
  sections: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Section'
  }],
  isPublic: { 
    type: Boolean, 
    default: false 
  },
  metadata: {
    lastEdited: Date,
    version: Number
  }
}, {
  timestamps: true
});

const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
export default Resume;