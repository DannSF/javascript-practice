console.log('Expense Tracker initialized');

const expense = {};

class ExpenseTracker {
  constructor() {
    this.expenses = this.loadFromLocalStorage();
    this.selectedExpenses = new Set();
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderExpenses();
    this.updateDashboard();
    this.showToast('Expense tracker loaded successfully', 'success');
  }

  bindEvents() {
    document.getElementById('expense-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddExpense();
    });

    document
      .getElementById('search-expenses')
      .addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });

    document
      .getElementById('filter-category')
      .addEventListener('change', (e) => {
        this.handleSearch(e.target.value);
      });

    document
      .getElementById('delete-selected')
      .addEventListener('click', (e) => {
        this.handleDeleteSelected();
      });

    document.getElementById('export-data').addEventListener('click', () => {
      this.handleExportData();
    });

    document.getElementById('clear-all').addEventListener('click', (e) => {
      this.handleClearAll();
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

    this.addExpense(expense);
    this.resetForm();
  }

  addExpense(expense) {
    this.expenses.unshift(expense);
    this.saveToLocalStorage();
    this.renderExpenses();
    this.updateDashboard();
    this.showToast(`Added "${expense.name}"`, 'success');
  }

  deleteExpense(id) {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
    this.selectedExpenses.delete(id);
    this.saveToLocalStorage();
    this.renderExpenses();
    this.updateDashboard();
    this.showToast('Expense deleted', 'warning');
  }

  handleSearch(searchItem) {
    this.renderExpenses(searchItem);
  }

  handleFilterByCategory(category) {
    this, renderExpenses(null, category);
  }

  getFilteredExpenses(searchTerm = null, category = 'all') {
    return this.expenses.filter((expense) => {
      const matchesSearch =
        !searchTerm ||
        expense.name.toLowerCase().inludes(searchTerm.toLowerCase());

      const matchesCategory =
        category === 'all' || expense.category === category;

      return matchesCategory && matchesSearch;
    });
  }

  updateDashboard() {
    const total = this.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const average = this.expenses.length > 0 ? total / this.expenses.length : 0;

    document.getElementById('total-amount').textContent =
      this.formatCurrency(total);
    document.getElementById('expense-count').textContent = this.expenses.length;
    document.getElementById('average-amount').textContent =
      this.formatCurrency(average);
  }

  renderExpenses(searchTerm = null, category = 'all') {
    const expensesList = document.getElementById('expenses-list');
    const filteredExpenses = this.getFilteredExpenses(searchTerm, category);

    if (filteredExpenses.length === 0) {
      expensesList.innerHTML = `
        <div class="empty-state">
        <p> No expenses found. ${
          searchTerm || category !== 'all'
            ? 'Try changing your filters.'
            : 'Add your first expense above!'
        }</p>
        </div>
        `;
      return;
    }

    expensesList.innerHTML = filteredExpenses
      .map(
        (expense) =>
          ` <div class="expense-item ${
            this.selectedExpenses.has(expense.id) ? 'selected' : ''
          }">
                <input 
                    type="checkbox" 
                    class="select-checkbox"
                    ${this.selectedExpenses.has(expense.id) ? 'checked' : ''}
                    onchange="expenseTracker.toggleSelectExpense(${expense.id})"
                >
                <div class="expense-info">
                    <div class="expense-name">${this.escapeHtml(
                      expense.name
                    )}</div>
                    <div class="expense-meta">
                        <span class="expense-category category-${
                          expense.category
                        }">
                            ${this.getCategoryLabel(expense.category)}
                        </span>
                        <span>📅 ${new Date(
                          expense.date
                        ).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="expense-amount">${this.formatCurrency(
                  expense.amount
                )}</div>
                <button class="delete-btn" onclick="expenseTracker.deleteExpense(${
                  expense.id
                })" title="Delete expense">
                    🗑️
                </button>
            </div>`
      )
      .join('');

    this.updateBulkActions();
  }

  toggleSelectExpense(id) {
    if (this.selectedExpenses.has(id)) {
      this.selectedExpenses.deleteExpense(id);
    } else {
      this.selectedExpenses.add(id);
    }
  }

  handleDeleteSelected() {
    if (this.selectedExpenses.size === 0) {
      this.showToast('No expenses selected', 'warning');
    }

    if (confirm(`Delete ${this.selectedExpenses.size} selected expenses`)) {
      this.expenses = this.expenses.filter(
        (expense) => !this.selectedExpenses.has(expense.id)
      );
      this.saveToLocalStorage();
      this.renderExpenses();
      this.updateDashboard();
      this.showToast(
        `Deleted ${this.selectedExpenses.size} expenses`,
        'success'
      );
    }
  }

  updateBulkActions() {
    const bulkActions = document.getElementById('bulk-actions');
    const selectedCount = document.getElementById('selected-count');

    if (this.selectedExpenses.size > 0) {
      bulkActions.style.display = 'flex';
      selectedCount.textContent = `${this.selectedExpenses.size} selected`;
    } else {
      bulkActions.display = 'none';
    }
  }

  handleExportData() {
    const dataStr = JSON.stringify(this.expenses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'aplications/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `expenses-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    this.showToast('Expenses data exported successfully', 'success');
  }

  handleClearAll() {
    if (this.expenses.length === 0) {
      this.showToast('No expenses to clear', 'warning');
      return;
    }

    if (
      cconfirm(
        'Are you sure you want to delete ALL expenses? This action cannot be undone.'
      )
    ) {
      this.expenses = [];
      this.selectedExpenses.clear();
      this.saveToLocalStorage();
      this.renderExpenses();
      this.updateDashboard();
      this.showToast('All expenses cleared', 'warning');
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('expenseTracker', JSON.stringify(this.expenses));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('expenseTracker');
    return data ? JSON.parse(data) : [];
  }

  resetForm() {
    document.getElementById('expense-form').reset();
    document.getElementById('expense-date').value = new Date()
      .toISOString()
      .split('T')[0];
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  getCategoryLabel(category) {
    const labels = {
      food: 'Food & Dining',
      transport: 'Transportation',
      shopping: 'Shopping',
      entertainment: 'Entertainment',
      bills: 'Bills & Utilities',
      health: 'Health',
      other: 'Other',
    };

    return labels[category] || category;
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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

const expenseTracker = new ExpenseTracker();
