import { Component,signal } from '@angular/core';
import { ExpenseForm } from '../expense-form/expense-form';
import { ExpenseCard } from '../expense-card/expense-card';
import { ExpenseList } from '../expense-list/expense-list';
import { ExpenseService } from '../../core/services/expenseservice';
import { ExpenseMod } from '../../core/models/expense';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-manage',
  imports: [ExpenseForm,ExpenseCard,ExpenseList],
  templateUrl: './expense-manage.html',
  styleUrl: './expense-manage.css',
})
export class ExpenseManage {
   
     expenses = signal<ExpenseMod[]>([]);

  constructor(
    private expenseService: ExpenseService,
    private dialog: MatDialog
  ) {
    this.getAllExpenses();
  }

  getAllExpenses() {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses.set(data);
    });
  }

  openExpenseForm() {
    const dialogRef = this.dialog.open(ExpenseForm, {
      width: '800px',
      maxHeight:'90vh'
    });

    dialogRef.componentInstance.addExpense.subscribe((expense: ExpenseMod) => {
      this.addNewExpense(expense);
    });
  }

  addNewExpense(expense: ExpenseMod) {
    this.expenseService.addExpense(expense).subscribe(() => {
      this.getAllExpenses();
      this.dialog.closeAll();
    });
  }

  editExpense(expense: ExpenseMod) {
    const dialogRef = this.dialog.open(ExpenseForm, {
      width: '800px',
      maxHeight:'90vh',
      data: expense
    });

    dialogRef.componentInstance.updateExpense.subscribe((updatedExpense: ExpenseMod) => {
      this.updateExistingExpense(updatedExpense);
    });
  }

  updateExistingExpense(expense: ExpenseMod) {
    this.expenseService.updateExpense(expense.id!, expense).subscribe(() => {
      this.getAllExpenses();
      this.dialog.closeAll();
    });
  }

  removeExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.getAllExpenses();
    });
  }

}
