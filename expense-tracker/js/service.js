export class ExpensesService {
  constructor(localStorageKey = 'expenseTracker') {
    this.localStorageKey = localStorageKey;
    this.expenses = this.loadDataFromLocalStorage();
  }

  loadDataFromLocalStorage() {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  setDataToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.expenses));
  }

  addExpense(expense) {
    this.expenses.unshift(expense);
    this.setDataToLocalStorage();
  }

  deleteExpenseById(id) {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
    this.setDataToLocalStorage();
  }

  getAllExpenses() {
    return this.expenses;
  }

  clearAllExpenses() {
    this.expenses = [];
    this.setDataToLocalStorage();
  }

  getAllCategories() {
    return [
      { value: 'food', label: 'Food & Dining', icon: '🍕' },
      { value: 'transport', label: 'Transportation', icon: '🚗' },
      { value: 'shopping', label: 'Shopping', icon: '🛍️' },
      { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
      { value: 'bills', label: 'Bills & Utilities', icon: '📄' },
      { value: 'health', label: 'Health', icon: '🏥' },
      { value: 'other', label: 'Other', icon: '📦' },
    ];
  }

  setExpenses(expenses) {
    this.expenses = expenses;
    this.setDataToLocalStorage();
  }
}
