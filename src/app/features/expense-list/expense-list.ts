import { Component,Input,Output,EventEmitter } from '@angular/core';
import { ExpenseCard } from '../expense-card/expense-card';
import { ExpenseMod } from '../../core/models/expense';

@Component({
  selector: 'app-expense-list',
  imports: [ExpenseCard],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList {

  @Input() expenses: ExpenseMod[] = [];

  @Output() editExpense = new EventEmitter<ExpenseMod>();
  @Output() deleteExpense = new EventEmitter<number>();
}
