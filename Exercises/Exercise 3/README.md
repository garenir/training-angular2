## Exercise 3: Deleting a record ##

In this exercise you will extend the application to support the deletion of an expense record.

### Tasks ###

1. Extend the ExpenseController to delete an expense when its being invoked using the HTTP verb DELETE. Make sure the method returns HTTP 204 on successful deletion and HTTP 404 if the expense record was not found in the database.
2. Extend the ExpenseService to be able to invoke the delete method of the REST service.
3. Extend the ExpennseOverview component to have a click handler that invokes the delete method of the ExpenseService.
4. Extend the template of the ExpenseOverview component to have a delete button in each row of the table. Have a look at [getbootstrap.com](http://www.getbootstrap.com) to find out how to create a button.

### Detailed Steps ###

#### 1. Extend the ExpenseController ####

1. Create a method named `Delete(Guid id)` returning an `IActionResult` and decorate this method using the `[HttpDelete("{id}")]` attribute.
1. Invoke the `Delete()` method of the repository passing the id of the expense record:
  * If the delete method runs successfully return `this.NoContent(`).
  * If the delete method throws an InvalidOperationException return `this.NotFound()`.

#### 2. Extend the ExpenseService ####

1. Create a method named `deleteExpense(expense: ExpenseRecord)` that returns a `Promise<Response>`. Within this method invoke the `delete()` method of the Http service using the URL /api/expenses/{id} to remove the specified expense from the database.

#### 3: Extend the ExpenseOverview component ####

1. Implement the `deleteExpense(expense: ExpenseRecord)` method to invoke the `deleteExpense()` method of the `ExpenseService`.
1. Await the call using the `await` keyword to filter the list of expenses to exclude the one you have just deleted.

#### 4: Extend the template ####

1. Add a new column to the table of expenses. The column has to have an empty header.
1. Add a button to each row that on click invokes the `deleteExpense` method of the component.