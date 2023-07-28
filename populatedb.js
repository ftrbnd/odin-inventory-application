#! /usr/bin/env node

console.log(
  'This script populates some test keyboards, keycaps, and switches to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Keyboard = require("./models/keyboard");
const Keycap = require("./models/keycap");
const Switch = require("./models/switch");

const categories = [];
const keyboards = [];
const keycaps = [];
const switches = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createKeyboards();
  await createKeycaps();
  await createSwitches();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// categories[0] will always be the Keyboard category, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({
    name: name,
    description: description
  });

  await category.save();

  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function keyboardCreate(index, name, description, category, price, inStock, designer, layout, color, solderable) {
  const keyboardDetails = {
    name: name,
    description: description,
    category: category,
    price: price,
    inStock: inStock,
    designer: designer,
    layout: layout,
    color: color,
    solderable: solderable
  };
  const keyboard = new Keyboard(keyboardDetails);

  await keyboard.save();

  keyboards[index] = keyboard;
  console.log(`Added keyboard: ${designer} ${name}`);
}

async function keycapCreate(index, name, description, category, price, inStock, material, profile) {
  const keycapDetails = {
    name: name,
    description: description,
    category: category,
    price: price,
    inStock: inStock,
    material: material,
    profile: profile
  };
  const keycap = new Keycap(keycapDetails);

  await keycap.save();

  keycaps[index] = keycap;
  console.log(`Added keycap: ${profile} ${name}`);
}

async function switchCreate(index, name, description, category, price, inStock, type, manufacturer) {
  const switchDetails = {
    name: name,
    description: description,
    category: category,
    price: price,
    inStock: inStock,
    type: type,
    manufacturer: manufacturer
  };
  const theSwitch = new Switch(switchDetails);
  
  await theSwitch.save();

  switches[index] = theSwitch;
  console.log(`Added switch: ${manufacturer} ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Keyboards", 'Keyboard kits excluding keycaps and switches'),
    categoryCreate(1, "Keycaps", 'The plastic caps that go on top of switches'),
    categoryCreate(2, "Switches", 'Found underneath keycaps, they register keystrokes when pressed down on'),
  ]);
}

async function createKeyboards() {
  console.log("Adding keyboards");
  await Promise.all([
    keyboardCreate(0, "Q1", 'A fully customizable 75% layout mechanical keyboard featured QMK / VIA support; designed with all the premium features with unlimited possibilities.', categories[0], 150, 100, 'Keychron', '75%', 'Carbon Black', false),
    keyboardCreate(1, "Space80: Apollo", 'The first 80% TKL layout customized keyboard from Gray Studio.', categories[0], 450, 100, 'Gray Studio', 'TKL', 'Stormtrooper White', true),
    keyboardCreate(2, 'design03', 'An adaptation of the Design02', categories[0], 350, 100, 'arctanKB', 'Alice', 'Matte Pastel Purple', true),
    keyboardCreate(3, 'Bear65 v2', 'An improvement to the Bear65 v1', categories[0], 400, 100, 'Jacky Studio', 'Alice', 'Pink', true),
    keyboardCreate(4, 'Array', 'A 65% custom mechanical keyboard using the gasket o-ring (gummy worm) mounting system', categories[0], 355, 100, 'Parallel Limited', '65%', 'Polycarbonate', true)
  ]);
}

async function createKeycaps() {
  console.log("Adding keycaps");
  await Promise.all([
    keycapCreate(0, 'Milkshake', 'designed by biip', categories[1], 90, 100, 'PBT', 'Cherry'),
    keycapCreate(1, 'Oblivion', 'designed by Oblotzky', categories[1], 170, 100, 'PBT', 'SA'),
    keycapCreate(2, 'Thai Tea', 'designed by pwad3', categories[1], 140, 100, 'ABS', 'Cherry'),
    keycapCreate(3, 'Dracula v2', 'inspired by the IDE theme', categories[1], 115, 100, 'ABS', 'Cherry')
  ]);
}

async function createSwitches() {
  console.log("Adding switches");
  await Promise.all([
    switchCreate(0, 'Ink Black v2', 'sold in packs of 18', categories[2], 14, 100, 'Linear', 'Gateron'),
    switchCreate(1, 'Strawberry', 'sold in packs of 10', categories[2], 4, 100, 'Linear', 'KTT'),
    switchCreate(2, 'Boba U4T', 'sold in packs of 10', categories[2], 7, 100, 'Tactile', 'Gazzew'),
    switchCreate(3, 'Nixies', 'sold in packs of 36', categories[2], 22, 100, 'Linear', 'Cherry')
  ]);
}