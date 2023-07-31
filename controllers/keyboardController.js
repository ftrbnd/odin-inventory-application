const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Keyboard = require('../models/keyboard');
const Category = require('../models/category');

exports.keyboard_list = asyncHandler(async (_req, res) => {
    const allKeyboards = await Keyboard.find({}, "name description")
        .sort({ name: 1 })
        .populate("description")
        .exec();

    res.render("keyboard_list", { title: "Keyboard List", keyboard_list: allKeyboards });
});

exports.keyboard_detail = asyncHandler(async (req, res) => {
    const keyboard = await Keyboard.findById(req.params.id).populate("name").exec();

    if (keyboard === null) {
        const err = new Error('Keyboard not found');
        err.status = 404;
        return next(err);
    }

    res.render('keyboard_detail', {
        keyboard: keyboard
    });
});

exports.keyboard_create_get = asyncHandler(async (_req, res) => {
    const allCategories = await Category.find().exec();

    res.render('keyboard_form', {
        title: 'Create Keyboard',
        categories: allCategories
    });
});

exports.keyboard_create_post = [
    body('name', 'Name must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Description must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('category', 'Category must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('designer', 'Designer must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('layout', 'Layout must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('color', 'Color must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        const keyboard = new Keyboard({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            inStock: req.body.inStock,
            designer: req.body.designer,
            layout: req.body.layout,
            color: req.body.color,
            solderable: req.body.solderable === 'solderable'
        });

        if (!errors.isEmpty()) {
            const allCategories = await Category.find().exec();

            res.render('keyboard_form', {
                title: 'Create Keyboard',
                categories: allCategories,
                errors: errors.array()
            });
        } else {
            await keyboard.save();
            res.redirect(keyboard.url);
        }
    })
];

exports.keyboard_delete_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keyboard delete GET');
});

exports.keyboard_delete_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keyboard delete POST');
});

exports.keyboard_update_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keyboard update GET');
});

exports.keyboard_update_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keyboard update POST');
});
