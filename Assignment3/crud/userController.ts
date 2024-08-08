import { Request, Response } from 'express';
import { User } from '../models/user';
import pool  from '../data/db';
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = async (req: Request, res: Response) => { // to GET all user data in Users DB
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows); // `rows` contains the result of the query
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

export const getUserById = async (req: Request, res: Response) => { // to GET user data by id in Users DB
    const userId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = result.rows[0]; // `rows[0]` contains the result
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' });
    }
};

export const createUser = async (req: Request, res: Response) => { // to POST a new User data in Users DB
    const newUser: User = { id: uuidv4(), ...req.body };
    try {
        const result = await pool.query(
            'INSERT INTO users (id, first_name, middle_name, last_name, email, phone_number, role, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [newUser.id, newUser.first_name, newUser.middle_name, newUser.last_name, newUser.email, newUser.phoneNumber, newUser.role, newUser.address]
        );
        res.status(200).json(result.rows[0]); // `rows[0]` contains the newly created user
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const updateUser = async (req: Request, res: Response) => { // to PUT/PATCH user data in Users DB
    const userId = req.params.id;
    const updates = req.body;
    try {
        const result = await pool.query(
            'UPDATE users SET first_name = $1, middle_name = $2, last_name = $3, email = $4, phone_number = $5, role = $6, address = $7 WHERE id = $8 RETURNING *',
            [updates.first_name, updates.middle_name, updates.last_name, updates.email, updates.phone_number, updates.role, updates.address, userId]
        );
        const updatedUser = result.rows[0]; // `rows[0]` contains the updated user
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
};

export const deleteUser = async (req: Request, res: Response) => { // to DELETE a user data in Users DB
    const userId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
        const deletedUser = result.rows[0]; // `rows[0]` contains the deleted user
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
};
