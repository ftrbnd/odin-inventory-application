const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Switch = require('../models/switch');

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

exports.switch_create_get = asyncHandler(async (req, res) => {
    res.send('TODO: Implement switch create GET');
});

exports.switch_create_post = asyncHandler(async (req, res) => {
    res.send('TODO: Implement switch create POST');
});

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
