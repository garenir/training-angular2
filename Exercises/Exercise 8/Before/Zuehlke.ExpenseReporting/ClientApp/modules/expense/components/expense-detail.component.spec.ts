﻿/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />

import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

import { ActivatedRouteStub, RouterStub } from '../../../utils/testutils';

import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpenseFormComponent } from './expense-form.component';
import { ExpenseService } from '../services/expense.service';
import { ExpenseRecord, ExpenseReason } from '../model/expense';

describe('The ExpenseDetailComponent', () => {

    let expenseDetailComponent: ExpenseDetailComponent;
    let fixture: ComponentFixture<ExpenseDetailComponent>;
    let expenseService: ExpenseService;
    const activatedRoute = new ActivatedRouteStub();

    const expense1 = new ExpenseRecord('00000000-0000-0000-0000-000000000001', 'Anakin Skywalker', ExpenseReason.Bus, new Date('2016/1/12'), 12.22, 'Visiting Mom');
    const expense2 = new ExpenseRecord('00000000-0000-0000-0000-000000000002', 'Yoda', ExpenseReason.Flight, new Date('2016/5/12'), 10, 'Flight to Coruscant');
    const testExpenses = [expense1, expense2];

    beforeAll(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule, HttpModule],
            declarations: [ExpenseDetailComponent, ExpenseFormComponent],
            providers: [ExpenseService, { provide: ActivatedRoute, useValue: activatedRoute }, { provide: Router, useClass: RouterStub }]
        });

        fixture = TestBed.createComponent(ExpenseDetailComponent);
        expenseDetailComponent = fixture.componentInstance;

        expenseService = fixture.debugElement.injector.get(ExpenseService);
    });

    it('should load the correct expense', async () => {
        spyOn(expenseService, 'getExpense').and.returnValue(Promise.resolve(expense1));
        activatedRoute.testParams = { id: expense1.id };

        fixture.detectChanges();
        await fixture.whenStable();

        expect(expenseDetailComponent.expense).toEqual(expense1);

        const title = fixture.debugElement.query(By.css('.panel-heading')).nativeElement;
        expect(title.textContent).toEqual('Receipt from ' + expense1.name);
    });

    it('should navigate to overview when back button is clicked', inject([Router], async (router: Router) => {
        const routerSpy = spyOn(router, 'navigate');
        expenseDetailComponent.expense = expense1;

        fixture.detectChanges();

        const backButton = fixture.debugElement.query(By.css('.btn-default'));
        backButton.triggerEventHandler('click', null);

        const routerArguments = routerSpy.calls.first().args[0];
        expect(routerArguments).toEqual(['/expense']);
    }));

    it('should update an expense if the save button was clicked', inject([Router], async (router: Router) => {
        const routerSpy = spyOn(router, 'navigate');
        expenseDetailComponent.expense = expense1;

        fixture.detectChanges();

        const saveButton = fixture.debugElement.query(By.css('.btn-primary'));
        saveButton.triggerEventHandler('click', null); //trigger a save

        await fixture.whenStable();
        
        expect(expenseService.updateExpense).toHaveBeenCalledTimes(1);
        expect(expenseService.updateExpense).toHaveBeenCalledWith(expense1);
        expect(expenseService.createExpense).not.toHaveBeenCalled();

        const routerArguments = routerSpy.calls.first().args[0]; //check that router was called with overview route
        expect(routerArguments).toEqual(['/expense']);
    }));
});