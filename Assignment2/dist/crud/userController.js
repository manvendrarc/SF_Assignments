"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const dataHandler_1 = require("../models/dataHandler");
const uuid_1 = require("uuid");
const getAllUsers = (req, res) => {
    const users = (0, dataHandler_1.readData)();
    res.json(users);
};
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => {
    const users = (0, dataHandler_1.readData)();
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.getUserById = getUserById;
const createUser = (req, res) => {
    const users = (0, dataHandler_1.readData)();
    const newUser = Object.assign({ id: (0, uuid_1.v4)() }, req.body);
    users.push(newUser);
    (0, dataHandler_1.writeData)(users);
    res.status(201).json(newUser);
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const users = (0, dataHandler_1.readData)();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        const updatedUser = Object.assign(Object.assign({}, users[index]), req.body);
        users[index] = updatedUser;
        (0, dataHandler_1.writeData)(users);
        res.json(updatedUser);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const users = (0, dataHandler_1.readData)();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        (0, dataHandler_1.writeData)(users);
        res.json(deletedUser);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
exports.deleteUser = deleteUser;
