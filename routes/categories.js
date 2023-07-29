const express = require('express');
const router = express.Router();

// Require controller modules.
const categoryController = require('../controllers/categoryController');
const keyboardController = require('../controllers/keyboardController');
const keycapController = require('../controllers/keycapController');
const switchController = require('../controllers/switchController');

/// CATEGORY ROUTES ///

// GET Categories home page
router.get('/', categoryController.index);

// GET request for list of all Categories
router.get('/all', categoryController.category_list);

// GET request for creating a Category
router.get('/create', categoryController.category_create_get);

// POST request for creating a Category
router.post('/create', categoryController.category_create_post);

// GET request for deleting a Category
router.get('/:id/delete', categoryController.category_delete_get);

// POST request for deleting a Category
router.post('/:id/delete', categoryController.category_delete_post);

// GET request for updating a Category
router.get('/:id/update', categoryController.category_update_get);

// POST request for updating a Category
router.post('/:id/update', categoryController.category_update_post);

// GET request for one Category
// router.get('/:id', categoryController.category_detail);
// NOTE: not needed since /keyboards, /keycaps, /switches have their own controllers

/// KEYBOARD ROUTES ///

// GET request for list of all Keyboards
router.get('/keyboards', keyboardController.keyboard_list);

// GET request for creating a Keyboard
router.get('/keyboards/create', keyboardController.keyboard_create_get);

// POST request for creating a Keyboard
router.post('/keyboards/create', keyboardController.keyboard_create_post);

// GET request for deleting a Keyboard
router.get('/keyboards/:id/delete', keyboardController.keyboard_delete_get);

// POST request for deleting a Keyboard
router.post('/keyboards/:id/delete', keyboardController.keyboard_delete_post);

// GET request for updating a Keyboard
router.get('/keyboards/:id/update', keyboardController.keyboard_update_get);

// POST request for updating a Keyboard
router.post('/keyboards/:id/update', keyboardController.keyboard_update_post);

// GET request for one Keyboard
router.get('/keyboards/:id', keyboardController.keyboard_detail);

/// KEYCAP ROUTES ///

// GET request for list of all Keycaps
router.get('/keycaps', keycapController.keycap_list);

// GET request for creating a Keycap
router.get('/keycaps/create', keycapController.keycap_create_get);

// POST request for creating a Keycap
router.post('/keycaps/create', keycapController.keycap_create_post);

// GET request for deleting a Keycap
router.get('/keycaps/:id/delete', keycapController.keycap_delete_get);

// POST request for deleting a Keycap
router.post('/keycaps/:id/delete', keycapController.keycap_delete_post);

// GET request for updating a Keycap
router.get('/keycaps/:id/update', keycapController.keycap_update_get);

// POST request for updating a Keycap
router.post('/keycaps/:id/update', keycapController.keycap_update_post);

// GET request for one Keycap
router.get('/keycaps/:id', keycapController.keycap_detail);

/// SWITCH ROUTES ///

// GET request for list of all Switches
router.get('/switches', switchController.switch_list);

// GET request for creating a Switch
router.get('/switches/create', switchController.switch_create_get);

// POST request for creating a Switch
router.post('/switches/create', switchController.switch_create_post);

// GET request for deleting a Switch
router.get('/switches/:id/delete', switchController.switch_delete_get);

// POST request for deleting a Switch
router.post('/switches/:id/delete', switchController.switch_delete_post);

// GET request for updating a Switch
router.get('/switches/:id/update', switchController.switch_update_get);

// POST request for updating a Switch
router.post('/switches/:id/update', switchController.switch_update_post);

// GET request for one Switch
router.get('/switches/:id', switchController.switch_detail);

module.exports = router;