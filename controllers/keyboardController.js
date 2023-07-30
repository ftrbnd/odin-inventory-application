const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Keyboard = require('../models/keyboard');

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

exports.keyboard_create_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keyboard create GET');
});

exports.keyboard_create_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keyboard create POST');
});

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
