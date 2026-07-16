import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseManage } from './expense-manage';

describe('ExpenseManage', () => {
  let component: ExpenseManage;
  let fixture: ComponentFixture<ExpenseManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseManage],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseManage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
