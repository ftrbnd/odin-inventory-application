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

exports.category_list = asyncHandler(async (_req, res) => {
    const allCategories = await Category.find({}, "name description")
        .sort({ name: 1 })
        .populate("description")
        .exec();

    res.render("category_list", { title: "Category List", category_list: allCategories });
});


exports.category_create_get = asyncHandler(async (_req, res) => {
    res.render("category_form", {
        title: "Create Category",
    });
});

exports.category_create_post = [
    body('name', 'Category name must contain at least 3 characters')
        .trim()
        .isLength({ min: 3 })
        .escape(),
    
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        const category = new Category({
            name: req.body.name,
            description: req.body.description
        });

        if (!errors.isEmpty()) {
            res.render('category_form', {
                title: 'Create Category',
                category: category,
                errors: errors.array()
            });
        } else {
            const categoryExists = await Category.findOne({ name: req.body.name }).exec();
            if (categoryExists) {
                res.redirect(categoryExists.url);
            } else {
                await category.save();
                res.redirect('/categories/all'); // ideally to category.url
            }
        }
    })
];

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
