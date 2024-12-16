import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  resume: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Resume', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['personal', 'education', 'experience', 'skills', 'projects', 'custom'],
    required: true 
  },
  content: {
    type: Object,
    required: true
  },
  order: Number
});

const Section = mongoose.models.Section || mongoose.model('Section', SectionSchema);
export default Section;