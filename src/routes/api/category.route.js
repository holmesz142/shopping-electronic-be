const express = require('express');
const router = express.Router();
const categoryController = require('./../../controllers/category.controller');
const { customCategoryQuery } = require('./../../middlewares/query');
router
  .route('/')
  .get(customCategoryQuery, categoryController.getCategory)
  .post(categoryController.createCategory);
router
  .route('/:slug')
  .get(categoryController.getACategory)
  .delete(categoryController.deleteCategory)
  .put(categoryController.updateCategory);
module.exports = router;
