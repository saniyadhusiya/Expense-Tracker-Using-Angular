import { Component, signal } from '@angular/core';

import { ExpenseManage } from './features/expense-manage/expense-manage';

@Component({
  selector: 'app-root',
  imports: [ExpenseManage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('expense-tracker');
}
