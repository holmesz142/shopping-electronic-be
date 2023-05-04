const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const getCategory = catchAsync(async (req, res, next) => {
  const filter = pick(req.query, ['name', 'slug']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategory(filter, options);
  res.send({
    status: 'success',
    data: result
  });
});
const getACategory = catchAsync(async (req, res, next) => {
  const result = await categoryService.getCategoryBySlug(req.params.slug);
  res.send({
    status: 'success',
    data: result
  });
});
const createCategory = catchAsync(async (req, res, next) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send({
    status: 'success',
    data: category
  });
});
const updateCategory = catchAsync(async (req, res, next) => {
  const category = await categoryService.updateCategoryBySlug(
    req.params.slug,
    req.body
  );
  res.send({
    status: 'success',
    data: category
  });
});
const deleteCategory = catchAsync(async (req, res, next) => {
  await categoryService.deleteCategoryBySlug(req.params.slug);
  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
  getCategory,
  createCategory,
  getACategory,
  deleteCategory,
  updateCategory
};
