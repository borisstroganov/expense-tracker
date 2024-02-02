import { v4 } from 'uuid'

import { Budget } from "../../../common/types";
import { query, exec } from '../db';

export function createBudget(amount: number, userEmail: string): void {
    let currentDate = new Date().toISOString();
    exec(`
        INSERT INTO budget (id, amount, balance, date, userEmail)
        VALUES (?, ?, ?, DATETIME(?), ?);
    `, [v4(), amount, amount, currentDate, userEmail]);
}

export function updateAmount(budgetId: string, amount: number): void {
    exec(`
    UPDATE budget 
    SET amount = ? 
    WHERE id = ?;
    `, [amount, budgetId]);
}

export function updateBalance(budgetId: string, balance: number): void {
    exec(`
    UPDATE budget 
    SET balance = ? 
    WHERE id = ?;
    `, [balance, budgetId]);
}

export function deleteBudget(budgetId: string): void {
    exec(`
        DELETE FROM budget
        WHERE id = ?;
    `, [budgetId]);
}

export function getBudget(budgetId: string): Budget {
    const budget = query<Budget>(`
        SELECT *
        FROM budget
        WHERE id = ?;
    `, [budgetId]);
    return budget[0];
}