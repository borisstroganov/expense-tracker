import { v4 } from 'uuid'

import { Expense } from "../../../common/types";
import { query, exec } from '../db';

export function createExpense(amount: number, type: string, description: string = '',
    userEmail: string, budgetId: string = ''): void {
    let currentDate = new Date().toISOString();
    exec(`
        INSERT INTO expense (id, amount, type, description, date, userEmail, budgetId)
        VALUES (?, ?, ?, ?, DATETIME(?), ?, ?);
    `, [v4(), amount, type, description, currentDate, userEmail, budgetId]);
}

export function updateAmount(expenseId: string, amount: number): void {
    exec(`
    UPDATE expense 
    SET amount = ? 
    WHERE id = ?;
    `, [amount, expenseId]);
}

export function updateType(expenseId: string, type: string): void {
    exec(`
    UPDATE expense 
    SET type = ? 
    WHERE id = ?;
    `, [type, expenseId]);
}

export function updateDescription(expenseId: string, description: string): void {
    exec(`
    UPDATE expense 
    SET description = ? 
    WHERE id = ?;
    `, [description, expenseId]);
}

export function updateBudgetId(expenseId: string, budgetId: string): void {
    exec(`
    UPDATE expense 
    SET budgetId = ? 
    WHERE id = ?;
    `, [budgetId, expenseId]);
}

export function resetBudgetId(budgetId: string): void {
    exec(`
    UPDATE expense 
    SET budgetId = ''
    WHERE budgetId = ?;
    `, [budgetId]);
}

export function deleteExpense(expenseId: string): void {
    exec(`
        DELETE FROM expense
        WHERE id = ?;
    `, [expenseId]);
}

export function getExpense(expenseId: string): Expense {
    const expense = query<Expense>(`
        SELECT *
        FROM expense
        WHERE id = ?;
    `, [expenseId]);
    return expense[0];
}

export function getRecentExpense(userEmail: string): Expense {
    const expense = query<Expense>(`
        SELECT *
        FROM expense
        WHERE userEmail = ?
        ORDER BY date DESC 
        LIMIT 1;
    `, [userEmail]);
    return expense[0];
}

export function getExpensesByType(userEmail: string, type: string): Expense[] {
    const expenses = query<Expense>(`
        SELECT *
        FROM expense
        WHERE userEmail = ? AND type = ?;
    `, [userEmail, type]);
    return expenses;
}

export function getExpensesByMonth(userEmail: string, year: number, month: number): Expense[] {
    const expenses = query<Expense>(`
        SELECT *
        FROM expense
        WHERE userEmail = ? 
        AND strftime('%Y-%m', date) = ?;
    `, [userEmail, `${year}-${month.toString().padStart(2, '0')}`]);
    return expenses;
}

