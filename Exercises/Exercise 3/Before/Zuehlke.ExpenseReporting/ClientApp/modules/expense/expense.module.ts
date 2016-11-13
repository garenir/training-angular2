import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { expenseRouting } from './expense.routing';
import { ExpenseOverviewComponent } from './components/expense-overview.component';
import { ExpenseFilterPipe } from './pipes/expense-filter.pipe';
import { ExpenseService } from './services/expense.service';

@NgModule({
  imports: [
      CommonModule, FormsModule, expenseRouting
  ],
  declarations: [
    ExpenseOverviewComponent,
    ExpenseFilterPipe
  ],
  providers: [
    ExpenseService
  ]
})
export class ExpenseModule { }
