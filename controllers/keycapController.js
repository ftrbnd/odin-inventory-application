const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Keycap = require('../models/keycap');
const Category = require('../models/category');

exports.keycap_list = asyncHandler(async (_req, res) => {
    const allKeycaps = await Keycap.find({}, "name description")
        .sort({ name: 1 })
        .populate("description")
        .exec();

    res.render("keycap_list", { title: "Keycap List", keycap_list: allKeycaps });
});

exports.keycap_detail = asyncHandler(async (req, res) => {
    const keycap = await Keycap.findById(req.params.id).populate("name").exec();

    if (keycap === null) {
        const err = new Error('Keycap not found');
        err.status = 404;
        return next(err);
    }

    res.render('keycap_detail', {
        keycap: keycap
    });
});

exports.keycap_create_get = asyncHandler(async (_req, res) => {
    const allCategories = await Category.find().exec();

    res.render('keycap_form', {
        title: 'Create Keycap',
        categories: allCategories
    });
});

exports.keycap_create_post = [
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
    body('material', 'Material must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('profile', 'Profile must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        const keycap = new Keycap({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            inStock: req.body.inStock,
            material: req.body.material,
            profile: req.body.profile
        });

        if (!errors.isEmpty()) {
            const allCategories = await Category.find().exec();

            res.render('keycap_form', {
                title: 'Create keycap',
                categories: allCategories,
                errors: errors.array()
            });
        } else {
            await keycap.save();
            res.redirect(keycap.url);
        }
    })
];

exports.keycap_delete_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keycap delete GET');
});

exports.keycap_delete_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keycap delete POST');
});

exports.keycap_update_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keycap update GET');
});

exports.keycap_update_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keycap update POST');
});
