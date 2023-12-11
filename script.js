window.onload = function () {
  loadFromLocalStorage();
};

function addExpense() {
  var expenseAmount = document.getElementById("expenseAmount").value;
  var description = document.getElementById("description").value;
  var category = document.getElementById("category").value;

  var newExpense = {
    amount: expenseAmount,
    description: description,
    category: category,
  };

  addExpenseToList(newExpense);
  saveToLocalStorage();
  clearInputFields();
}

function addExpenseToList(expense) {
  var listItem = document.createElement("li");
  listItem.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;

  var deleteButton = createDeleteButton(listItem, expense);
  listItem.appendChild(deleteButton);

  document.getElementById("expenseList").appendChild(listItem);
}

function createDeleteButton(listItem, expense) {
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Expense";
  deleteButton.onclick = function () {
    removeFromLocalStorage(expense);
    listItem.remove();
  };
  return deleteButton;
}

function saveToLocalStorage() {
  var expenses = getExpensesFromLocalStorage();
  var newExpense = {
    amount: document.getElementById("expenseAmount").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
  };
  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadFromLocalStorage() {
  var expenses = getExpensesFromLocalStorage();
  var expenseList = document.getElementById("expenseList");

  expenses.forEach(function (expense) {
    var listItem = document.createElement("li");
    listItem.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;

    var deleteButton = createDeleteButton(listItem, expense);
    listItem.appendChild(deleteButton);

    expenseList.appendChild(listItem);
  });
}

function getExpensesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function removeFromLocalStorage(expense) {
  var expenses = getExpensesFromLocalStorage();
  var index = expenses.findIndex(
    (e) =>
      e.amount === expense.amount &&
      e.description === expense.description &&
      e.category === expense.category
  );
  if (index !== -1) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
}

function clearInputFields() {
  document.getElementById("expenseAmount").value = "";
  document.getElementById("description").value = "";
}
