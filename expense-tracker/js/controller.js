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
    this.showToast('Expense tracker loaded successfully', 'success');
  }

  bindEvents() {
    document.getElementById('expense-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddExpense();
    });

    document.getElementById('clear-all').addEventListener('click', (e) => {
      this.clearAllExpenses();
    });

    const searchExpense = document.getElementById('search-expenses');
    searchExpense.addEventListener('input', (e) => {
      this.handleSearchByName(e.target.value);
      filterCategory.value = 'all';
    });

    const filterCategory = document.getElementById('filter-category');
    filterCategory.addEventListener('change', (e) => {
      this.handleSearchByCategory(e.target.value);
      searchExpense.value = '';
    });

    document
      .getElementById('delete-selected')
      .addEventListener('click', (e) => {
        this.handleDeleteSelected();
      });

    document.getElementById('export-data').addEventListener('click', (e) => {
      this.handleExportData();
    });
  }

  handleAddExpense() {
    const name = document.getElementById('expense-name').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const date =
      document.getElementById('expense-date').value ||
      new Date().toISOString().split('T')[0];

    if (!name || isNaN(amount) || amount <= 0 || !category) {
      return this.showToast('Please fill all fields with valid data', 'error');
    }

    const expense = {
      id: Date.now().toString(),
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
    const filtered = this.getFilteredExpenses(searchTerm, category);
    this.renderExpenseList(filtered);
    this.updateBulkActions();
  }

  renderExpenseList(expenses) {
    const expensesList = document.getElementById('expenses-list');
    if (!expenses.length)
      return (expensesList.innerHTML = this.emptyStateHtml());

    expensesList.innerHTML = expenses
      .map(this.expenseItemTemplate.bind(this))
      .join('');
    this.attachExpenseEvents();
  }

  emptyStateHtml(searchTerm = null, category = 'all') {
    return `
    <div class="empty-state">
      <p>No expenses found. ${
        searchTerm || category !== 'all'
          ? 'Try changing your filters.'
          : 'Add your first expense above!'
      }</p>
    </div>
  `;
  }

  expenseItemTemplate(expense) {
    return `
    <div class="expense-item ${
      this.selectedExpenses.has(expense.id) ? 'selected' : ''
    }" data-id="${expense.id}">
      <input type="checkbox" class="select-checkbox" ${
        this.selectedExpenses.has(expense.id) ? 'checked' : ''
      }>
      <div class="expense-info">
        <div class="expense-name">${this.utils.escapeHtml(expense.name)}</div>
        <div class="expense-meta">
          <span class="expense-category category-${
            expense.category
          }">${this.utils.getCategoryLabel(expense.category)}</span>
           <span>📅 ${this.utils.formatDate(expense.date)}</span>
        </div>
      </div>
      <div class="expense-amount">${this.utils.formatCurrency(
        expense.amount
      )}</div>
      <button class="delete-btn" title="Delete expense">🗑️</button>
    </div>
  `;
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
        this.toggleSelectExpense(id);
        this.updateBulkActions();
      });
    });
  }

  deleteExpense(id) {
    this.selectedExpenses.delete(id);
    this.expensesService.deleteExpenseById(id);
    this.expenses = this.expensesService.getAllExpenses();

    this.renderExpenses();
    this.renderDashboard();
    this.showToast('Expense deleted successfully', 'warning');
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
      .join('');

    categoriesFilter.innerHTML =
      `<option value="all">All Categories</option>` +
      categories
        .map(
          (category) =>
            `<option value=${category.value}>${category.label}</option>`
        )
        .join('');
  }

  renderDashboard() {
    const { totalFormatted, count, averageFormatted } = this.utils.expensesCalc(
      this.expenses
    );
    document.getElementById('total-amount').textContent = totalFormatted;
    document.getElementById('expense-count').textContent = count;
    document.getElementById('average-amount').textContent = averageFormatted;
  }

  clearAllExpenses() {
    if (!this.expenses.length)
      return this.showToast('No expenses to clear', 'warning');

    if (
      confirm(
        'Are you sure you want to delete ALL expenses? This action cannot be undone.'
      )
    ) {
      this.selectedExpenses.clear();
      this.expensesService.clearAllExpenses();
      this.expenses = this.expensesService.getAllExpenses();

      this.renderExpenses();
      this.renderDashboard();
      this.updateBulkActions();
      this.showToast('All expenses cleared', 'warning');
    }
  }

  handleSearchByName(searchTerm) {
    this.renderExpenses(searchTerm);
  }

  handleSearchByCategory(category) {
    this.renderExpenses(null, category);
  }

  updateBulkActions() {
    const bulkActions = document.getElementById('bulk-actions');
    const selectedCount = document.getElementById('selected-count');

    if (this.selectedExpenses.size > 0) {
      bulkActions.style.display = 'flex';
      selectedCount.textContent = `${this.selectedExpenses.size} selected`;
    } else {
      bulkActions.style.display = 'none';
    }
  }

  handleDeleteSelected() {
    const count = this.selectedExpenses.size;

    if (count === 0) return this.showToast('No expenses selected', 'warning');

    if (confirm(`Delete ${count} selected expenses`)) {
      this.newExpenses = this.expensesService
        .getAllExpenses()
        .filter((expense) => !this.selectedExpenses.has(expense.id));

      this.expensesService.setExpenses(this.newExpenses);
      this.expenses = this.expensesService.getAllExpenses();
      this.selectedExpenses.clear();

      this.updateBulkActions();
      this.renderExpenses();
      this.renderDashboard();
      this.showToast(`Deleted ${count} expenses`, 'success');
    }
  }

  handleExportData() {
    const dataStr = JSON.stringify(this.expenses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `expenses-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    this.showToast('Expenses data exported successfully', 'success');
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
