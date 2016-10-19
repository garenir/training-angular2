﻿import { ExpenseFilterPipe } from './expense-filter.pipe';
import { Expense, Reason } from '../model/expense';

describe('ExpenseFilterPipe', () => {
   const pipe = new ExpenseFilterPipe();

   it('should filter out expenses that do not include <<Ana>>', () => {
        let expense1 = new Expense('1', 'Anakin Skywalker', Reason.Hotel, "12-01-2016", 12.20, "Night on Coruscant with Obi Wan");
        let expense2 = new Expense('1', 'Obi Wan', Reason.Hotel, "12-01-2016", 12.20, "Night on Coruscant with Anakin");
        let expenses = [expense1, expense2];

        expect(pipe.transform(expenses, "Ana")[0]).toEqual(expense1);
   });
});