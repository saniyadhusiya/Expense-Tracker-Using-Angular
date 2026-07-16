import { Component, Inject,Input,Output,EventEmitter,Optional } from '@angular/core';
import {ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ExpenseMod } from '../../core/models/expense';

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,MatSelectModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm {
    
   @Input() editData : ExpenseMod | null = null;
 
   @Output() addExpense = new EventEmitter<ExpenseMod>();
   @Output() updateExpense = new EventEmitter<ExpenseMod>();

  categories = [
    {value:'Food'},
    {value:'Travel'},
    {value:'Shopping'},
    {value:'Bills'},
    {value:'Health'},
    {value:'Entertainment'},
    {value:'Education'},
    {value:'Others'}
  ];

  paymentMethods =[
    {value:'Cash'},
    {value:'UPI'},
    {value:'Credit Card'},
    {value:'Debit Card'},
    {value:'Net Banking'}
  ];

  statusList = [
    {value:'Paid'},
    {value:'Pending'}
  ];

  expenseForm;

  constructor( private fb:FormBuilder,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: ExpenseMod | null
  ){
     this.expenseForm = this.fb.group({
      title:['',Validators.required],
      amount:[0, [Validators.required, Validators.min(1)]],
      category:['',Validators.required],
      date:['',Validators.required],
      paymentMethod:['',Validators.required],
      status:['',Validators.required],
      notes:['',Validators.required]
     })

     if(this.data){
        this.editData = this.data;

        this.expenseForm.patchValue({
          title: this.data.title,
          amount: this.data.amount,
          category: this.data.category,
          date:this.data.date,
          paymentMethod:this.data.paymentMethod,
          status:this.data.status,
          notes:this.data.notes
        })
     }
 }

 submit(){
  if (this.expenseForm.valid){
    if(this.editData)  {
      const updatedExpense:ExpenseMod ={
          id: this.editData.id,
          title: this.expenseForm.value.title || '',
          amount: this.expenseForm.value.amount || 0,
          category: this.expenseForm.value.category || '',
          date: this.expenseForm.value.date || '',
          paymentMethod: this.expenseForm.value.paymentMethod || '',
          status: this.expenseForm.value.status || '',
          notes: this.expenseForm.value.notes || ''
    };
    this.updateExpense.emit(updatedExpense);
  }else{
    const newExpense :ExpenseMod = {
          title: this.expenseForm.value.title || '',
          amount: this.expenseForm.value.amount || 0,
          category: this.expenseForm.value.category || '',
          date: this.expenseForm.value.date || '',
          paymentMethod: this.expenseForm.value.paymentMethod || '',
          status: this.expenseForm.value.status || '',
          notes: this.expenseForm.value.notes || ''
    };
    this.addExpense.emit(newExpense);
  }
  this.expenseForm.reset();
 }
}
}

