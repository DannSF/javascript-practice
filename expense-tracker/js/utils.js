export class Utils {
  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  expensesCalc(expenses) {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const count = expenses.length;
    const average = expenses.length > 0 ? total / count : 0;

    return {
      total: this.formatCurrency(total),
      count,
      average: this.formatCurrency(average),
    };
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
}
