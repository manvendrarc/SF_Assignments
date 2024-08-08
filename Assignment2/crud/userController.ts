import { Request, Response } from 'express';
import { User } from '../models/user';
import { readData, writeData } from '../models/dataHandler';
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = (req: Request, res: Response) => { // to GET all user data in users.json
    const users: User[] = readData();
    res.json(users);
};

export const getUserById = (req: Request, res: Response) => { // to GET user data by id in users.json
    const users: User[] = readData();
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' }); 
    }
};

export const createUser = (req: Request, res: Response) => { // to POST a new user data in users.json
    const users: User[] = readData();
    const newUser: User = { id: uuidv4(), ...req.body };
    users.push(newUser);
    writeData(users);
    res.status(200).json(newUser);
};

export const updateUser = (req: Request, res: Response) => { // to PUT/PATCH user data in users.json
    const users: User[] = readData();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        const updatedUser = { ...users[index], ...req.body };
        users[index] = updatedUser;
        writeData(users);
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export const deleteUser = (req: Request, res: Response) => { // to DELETE a user data in users.json
    const users: User[] = readData();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        writeData(users);
        res.json(deletedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
