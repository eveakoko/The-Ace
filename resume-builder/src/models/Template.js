import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: String,
  category: String,
  previewImage: String,
  structure: {
    type: Object,
    required: true
  },
  isDefaultTemplate: {
    type: Boolean,
    default: false
  }
});

const Template = mongoose.models.Template || mongoose.model('Template', TemplateSchema);
export default Template;