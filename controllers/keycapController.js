const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.keycap_list = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keycap list');
});

exports.keycap_detail = asyncHandler(async (req, res) => {
    res.send('TODO: Implement keycap detail');
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
