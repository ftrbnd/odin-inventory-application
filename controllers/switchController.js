const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Switch = require('../models/switch');
const Category = require('../models/category');

exports.switch_list = asyncHandler(async (_req, res) => {
    const allSwitches = await Switch.find({}, "name description")
        .sort({ name: 1 })
        .populate("description")
        .exec();

    res.render("switch_list", { title: "Switch List", switch_list: allSwitches });
});

exports.switch_detail = asyncHandler(async (req, res) => {
    const theSwitch = await Switch.findById(req.params.id).populate("name").exec();

    if (theSwitch === null) {
        const err = new Error('Switch not found');
        err.status = 404;
        return next(err);
    }

    res.render('switch_detail', {
        theSwitch: theSwitch
    });
});

exports.switch_create_get = asyncHandler(async (_req, res) => {
    const allCategories = await Category.find().exec();

    res.render('switch_form', {
        title: 'Create Switch',
        categories: allCategories
    });
});

exports.switch_create_post = [
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
    body('type', 'Switch type must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('manufacturer', 'Manufacturer must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        const theSwitch = new Switch({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            inStock: req.body.inStock,
            type: req.body.type,
            manufacturer: req.body.manufacturer
        });

        if (!errors.isEmpty()) {
            const allCategories = await Category.find().exec();

            res.render('switch_form', {
                title: 'Create switch',
                categories: allCategories,
                errors: errors.array()
            });
        } else {
            await theSwitch.save();
            res.redirect(theSwitch.url);
        }
    })
];

exports.switch_delete_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement switch delete GET');
});

exports.switch_delete_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement switch delete POST');
});

exports.switch_update_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement switch update GET');
});

exports.switch_update_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement switch update POST');
});
