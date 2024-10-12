const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  strainName: { type: String, required: true },
  batchDate: { type: Date, required: true },
  bestByDate: { type: Date, required: true },
  totalGrams: { type: Number, required: true },
  type: { type: String, enum: ['Indica', 'Sativa', 'Hybrid'], required: true },
  notes: { type: String },
  pungency: { type: Number, min: 1, max: 10 },
  totalCannabinoids: { type: Number },
  images: [{ type: String }],
  video: { type: String },
  testReport: { type: String }
}, { timestamps: true });

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);