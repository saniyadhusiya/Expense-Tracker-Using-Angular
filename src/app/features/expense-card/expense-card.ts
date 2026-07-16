import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ExpenseMod } from '../../core/models/expense';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-expense-card',
  imports: [MatCardModule],
  templateUrl: './expense-card.html',
  styleUrl: './expense-card.css',
})
export class ExpenseCard {

  @Input() expense!: ExpenseMod;

  @Output() editExpense = new EventEmitter<ExpenseMod>();
  @Output() deleteExpense = new EventEmitter<number>();

  editExpenseData() {
    this.editExpense.emit(this.expense);
  }

  removeExpense() {
    if (this.expense.id) {
      this.deleteExpense.emit(this.expense.id);
    }
  }
}