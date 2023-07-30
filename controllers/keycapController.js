const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Keycap = require('../models/keycap');

exports.keycap_list = asyncHandler(async (req, res) => {
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

exports.keycap_create_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keycap create GET');
});

exports.keycap_create_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keycap create POST');
});

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
