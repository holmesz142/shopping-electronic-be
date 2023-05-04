const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const createSlug = require('./../middlewares/slug');
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String
    },
    thumbnail: {
      type: String
    },
    subCate: [{}]
  },
  {
    timestamps: true
  }
);
categorySchema.pre('save', async function (next) {
  this.slug = createSlug(`${this.name}`);
  next();
});
// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);
/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
