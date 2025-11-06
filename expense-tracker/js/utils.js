export class Utils {
  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  formatDate(dateStr, locale = 'en-US') {
    return new Date(dateStr).toLocaleDateString(locale);
  }

  formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  }

  expensesCalc(expenses) {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const count = expenses.length;
    const average = expenses.length > 0 ? total / count : 0;

    return {
      total,
      count,
      average,
      totalFormatted: this.formatCurrency(total),
      averageFormatted: this.formatCurrency(average),
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
