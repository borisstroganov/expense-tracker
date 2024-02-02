import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

import { User } from "../../../common/types";
import { query, exec } from '../db';

async function hash(str: string): Promise<string> {
    const saltRounds = 10;
    try {
        const hashedStr = await bcrypt.hash(str, saltRounds);
        return hashedStr;
    } catch (error) {
        throw error;
    }
}

export async function createUser(email: string, name: string, password: string): Promise<void> {
    const hashedPassword = await hash(password);
    exec(`
        INSERT INTO user (id, email, name, password)
        VALUES (?, ?, ?, ?);
    `, [v4(), email, name, hashedPassword]);
}

export async function changePassword(email: string, password: string): Promise<void> {
    const hashedPassword = await hash(password);
    exec(`
    UPDATE user 
    SET password = ? 
    WHERE email = ?;
    `, [hashedPassword, email]);
}

export function getName(email: string): string {
    const user = query<User>(`
        SELECT name
        FROM user
        WHERE email = ?;
    `, [email]);

    return user[0].name;
}

export function getPassword(email: string): string {
    const user = query<User>(`
        SELECT password
        FROM user
        WHERE email = ?;
    `, [email]);

    return user[0].password;
}

// export async function checkPassword(email: string, password: string): Promise<boolean> {
//     const hashedPassword = await hash(password);
//     const user = query<User>(`
//         SELECT *
//         FROM user
//         WHERE email = ? AND password = ?;
//     `, [email, hashedPassword]);

//     return user.length > 0;
// }

export function checkUserExists(email: string): boolean {
    const user = query<User>(`
        SELECT *
        FROM user
        WHERE email = ?;
    `, [email]);

    return user.length > 0;
}