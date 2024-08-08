import pool from '../data/db';
import { User } from './user';


// Fetch all users

export const getAllUsers = async (): Promise<User[]> => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

// Get User by ID

export const getUserById = async (id: number): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
};

// Create New User

export const createUser = async (user: User): Promise<User> => {
    const result = await pool.query(
        `INSERT INTO users (id, first_name, middle_name, last_name, email, phone_number, role, address)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [user.id, user.first_name, user.middle_name, user.last_name, user.email, user.phoneNumber, user.role, user.address]
    );
    return result.rows[0];
};

// Update User

export const updateUser = async (id: number, user: Partial<User>): Promise<User | null> => {
    const fields = Object.keys(user);
    const values = Object.values(user);
    const setString = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    
    const result = await pool.query(
        `UPDATE users SET ${setString} WHERE id = $${fields.length + 1} RETURNING *`,
        [...values, id]
    );
    return result.rows[0] || null;
};

// Delete User
export const deleteUser = async (id: number): Promise<boolean> => {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return (result.rowCount as number) > 0;
};