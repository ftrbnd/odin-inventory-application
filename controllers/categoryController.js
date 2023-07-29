const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
const Keyboard = require('../models/keyboard');
const Keycap = require('../models/keycap');
const Switch = require('../models/switch');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (_req, res) => {
    const [
        numCategories,
        numKeyboards,
        numKeycaps,
        numSwitches
    ] = await Promise.all([
        Category.countDocuments({}).exec(),
        Keyboard.countDocuments({}).exec(),
        Keycap.countDocuments({}).exec(),
        Switch.countDocuments({}).exec()
    ]);

    res.render("index", {
        title: "Keyboard Inventory Home",
        category_count: numCategories,
        keyboard_count: numKeyboards,
        keycap_count: numKeycaps,
        switch_count: numSwitches
    });
});

exports.category_list = asyncHandler(async (req, res) => {
    const allCategories = await Category.find({}, "name description")
        .sort({ name: 1 })
        .populate("description")
        .exec();

    res.render("category_list", { title: "Category List", category_list: allCategories });
});

exports.category_create_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement category create GET');
});

exports.category_create_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement category create POST');
});

exports.category_delete_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement category delete GET');
});

exports.category_delete_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement category delete POST');
});

exports.category_update_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement category update GET');
});

exports.category_update_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement category update POST');
});
