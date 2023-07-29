const { body, validationResult } = require('express-validator');
const Keyboard = require('../models/keyboard');
const Keycap = require('../models/keycap');
const Switch = require('../models/switch');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (_req, res, _next) => {
    const [
        numKeyboards,
        numKeycaps,
        numSwitches
    ] = await Promise.all([
        Keyboard.countDocuments({}).exec(),
        Keycap.countDocuments({}).exec(),
        Switch.countDocuments({}).exec()
    ]);

    res.render("index", {
        title: "Keyboard Inventory Home",
        keyboard_count: numKeyboards,
        keycap_count: numKeycaps,
        switch_count: numSwitches
    });
});

exports.category_list = asyncHandler(async (req, res) => {
    res.send('TODO: Implement category list');
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
