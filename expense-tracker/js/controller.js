import { ExpensesService } from './service.js';
import { Utils } from './utils.js';

export class ExpensesController {
  constructor() {
    this.expensesService = new ExpensesService();
    this.utils = new Utils();
    this.expenses = this.expensesService.loadDataFromLocalStorage();
    this.selectedExpenses = new Set();
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderCategories();
    this.renderExpenses();
    this.renderDashboard();
  }

  bindEvents() {
    document.getElementById('expense-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddExpense();
    });
  }

  handleAddExpense() {
    const name = document.getElementById('expense-name').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const date =
      document.getElementById('expense-date').value ||
      new Date().toISOString().split('T')[0];

    if (!name || !amount || !category) {
      this.showToast('Please fill all fields with valid data', 'error');
      return;
    }

    const expense = {
      id: Date.now(),
      name,
      amount,
      category,
      date,
      createdAt: new Date().toISOString(),
    };

    this.expensesService.addExpense(expense);
    this.expenses = this.expensesService.getAllExpenses();
    this.showToast('Expense Added successfully', 'success');
    this.resetForm();
    this.renderExpenses();
    this.renderDashboard();
  }

  resetForm() {
    document.getElementById('expense-form').reset();
  }

  renderExpenses(searchTerm = null, category = 'all') {
    const expensesList = document.getElementById('expenses-list');
    const filteredExpenses = this.getFilteredExpenses(searchTerm, category);

    if (filteredExpenses.length === 0) {
      expensesList.innerHTML = `
      <div class="empty-state">
        <p>No expenses found. ${
          searchTerm || category !== 'all'
            ? 'Try changing your filters.'
            : 'Add your first expense above!'
        }</p>
      </div>`;
      return;
    }

    expensesList.innerHTML = filteredExpenses
      .map(
        (expense) => `
        <div class="expense-item ${
          this.selectedExpenses.has(expense.id) ? 'selected' : ''
        }" 
             data-id="${expense.id}">
          <input 
            type="checkbox" 
            class="select-checkbox"
            ${this.selectedExpenses.has(expense.id) ? 'checked' : ''}
          >
          <div class="expense-info">
            <div class="expense-name">${this.utils.escapeHtml(
              expense.name
            )}</div>
            <div class="expense-meta">
              <span class="expense-category category-${expense.category}">
                ${this.utils.getCategoryLabel(expense.category)}
              </span>
              <span>📅 ${new Date(expense.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div class="expense-amount">${this.utils.formatCurrency(
            expense.amount
          )}</div>
          <button class="delete-btn" title="Delete expense">🗑️</button>
        </div>`
      )
      .join('');

    this.attachExpenseEvents();
  }

  getFilteredExpenses(searchTerm = null, category = 'all') {
    return this.expenses.filter((expense) => {
      const matchesSearch =
        !searchTerm ||
        expense.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === 'all' || expense.category === category;

      return matchesCategory && matchesSearch;
    });
  }

  attachExpenseEvents() {
    const expensesList = document.getElementById('expenses-list');

    expensesList.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.target.closest('.expense-item').dataset.id;
        this.deleteExpense(id);
      });
    });

    expensesList.querySelectorAll('.select-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        const id = e.target.closest('.expense-item').dataset.id;
        console.log(id);
      });
    });
  }

  deleteExpense(id) {
    this.selectedExpenses.delete(id);
    this.expensesService.deleteExpenseById(id);
    this.renderExpenses();
    this.renderDashboard();
    this.showToast('Expense deleted succesfully', 'warning');
  }

  toggleSelectExpense(id) {
    if (this.selectedExpenses.has(id)) {
      this.selectedExpenses.delete(id);
    } else {
      this.selectedExpenses.add(id);
    }
  }

  renderCategories() {
    const categories = this.expensesService.getAllCategories();
    const categoriesList = document.getElementById('expense-category');
    const categoriesFilter = document.getElementById('filter-category');

    categoriesList.innerHTML = categories
      .map(
        (category) =>
          `<option value=${category.value}>${category.icon} ${category.label}</option>`
      )
      .join();

    categoriesFilter.innerHTML =
      `<option value="all">All Categories</option>` +
      categories
        .map(
          (category) =>
            `<option value=${category.value}>${category.label}</option>`
        )
        .join();
  }

  renderDashboard() {
    const { total, count, average } = this.utils.expensesCalc(this.expenses);
    document.getElementById('total-amount').textContent = total;
    document.getElementById('expense-count').textContent = count;
    document.getElementById('average-amount').textContent = average;
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}
