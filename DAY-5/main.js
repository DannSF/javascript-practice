// =============================================
// 🚀 DÍA 5 - MANIPULACIÓN DEL DOM Y EVENTOS
// =============================================

console.log('🎯 DIA 5 - DOM Manipiulation & Events');

// =============================================
// 🛠️ UTILITY FUNCTIONS
// =============================================

const Logger = {
  log: (message, type = 'info') => {
    const consoleElement = document.getElementById('debug-console');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');

    logEntry.clasName = `log-entry ${type}`;
    logEntry.textContent = `[${timestamp}] ${message}`;

    consoleElement.appendChild(logEntry);
    consoleElement.scrollTop = consoleElement.scrollHeight;

    console[type === 'error' ? 'error' : 'log'](`[DOM] ${message}`);
  },
};

const DOM = {
  // Selección de elementos
  get: (selector) => document.querySelector(selector),
  getAll: (selector) => document.querySelectorAll(selector),

  create: (tag, clases = '', content = '') => {
    const element = document.createElement(tag);
    if (clases) element.clasName = clases;
    if (content) element.textContent = content;
    return element;
  },

  //Manipulación de contenido
  setText: (element, text) => {
    if (element) element.textContent = text;
  },

  setHTML: (element, html) => {
    if (element) element.innerHTML = html;
  },

  // Manipulación de clases
  addClass: (element, className) => {
    if (element) element.classList.add(className);
  },

  removeClass: (element, className) => {
    if (element) element.classList.remove(className);
  },

  toggleClass: (element, clasName) => {
    if (element) element.classList.toggle(clasName);
  },
};

// =============================================
// 🎨 COLOR CHANGER FUNCTIONALITY
// =============================================
const ColorManager = {
  colors: [
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#96ceb4',
    '#feca57',
    '#ff9ff3',
    '#54a0ff',
    '#5f27cd',
    '#00d2d3',
    '#ff9f43',
  ],

  currentIndex: 0,

  init: () => {
    const colorBtn = DOM.get('#color-btn');
    const resetBtn = DOM.get('#reset-color');
    const colorDisplay = DOM.get('#current-color');

    colorBtn.addEventListener('click', ColorManager.changeColor);
    resetBtn.addEventListener('click', ColorManager.resetColor);

    Logger.log('Color Manager inicializado', 'successs');
  },

  changeColor: () => {
    const color = ColorManager.colors[ColorManager.currentIndex];
    document.body.style.backgroundColor = color;

    DOM.setText(DOM.get('#current-color'), color);
    DOM.get('#current-color').style.backgroundColor = color;
    DOM.get('#current-color').style.color = '#ffffff';

    ColorManager.currentIndex =
      (ColorManager.currentIndex + 1) % ColorManager.colors.length;

    Logger.log(`Color cambiado a: ${color}`, 'info');
  },

  resetColor: () => {
    document.body.style.backgroundColor = '#f8f9fa';
    DOM.setText((DOM.get('#current-color'), '#ffffff'));
    DOM.get('#current-color').style.backgroundColor = 'white';
    DOM.get('#current-color').style.color = '#333';
    ColorManager.currentIndex = 0;

    Logger.log('Color reseteado al default', 'warning');
  },
};

// =============================================
// 📝 TEXT GENERATOR FUNCTIONALITY
// =============================================

const TextManager = {
  init: () => {
    const addTextBtn = DOM.get('#add-text');
    const textInput = DOM.get('#text-input');

    addTextBtn.addEventListener('click', TextManager.addText);
    textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') TextManager.addText();
    });
  },

  addText: () => {
    const textInput = DOM.get('#text-input');
    const textOutput = DOM.get('#text-output');
    const text = textInput.value.trim();

    if (!text) {
      Logger.log('Intento de agregar texto vacio', 'warning');
      return;
    }

    const textItem = DOM.create('div', 'text-item', text);
    textOutput.appendChild(textItem);

    textInput.value = '';
    textInput.focus();

    Logger.log(`Texto agregado: "${text}"`, 'success');
  },
};

// =============================================
// 👥 USERS MANAGER FUNCTIONALITY
// =============================================

const UserManager = {
  init: () => {
    const loadUsersBtn = DOM.get('#load-users');
    const clearUsersBtn = DOM.get('#clear-users');

    loadUsersBtn.addEventListener('click', UserManager.loadUsers);
    clearUsersBtn.addEventListener('click', UserManager.clearUsers);

    Logger.log('Users Manager inicializado', 'success');
  },

  loadUsers: async () => {
    try {
      Logger.log('Cargando usuarios desde API...', 'info');

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const users = await response.json();

      UserManager.displayUsers(users);

      Logger.log(`${users.length} usuarios cargados exitosamente`, 'success');
    } catch (error) {
      Logger.log(`Error cargando usuarios: ${error.message}`, 'error');
    }
  },

  displayUsers: (users) => {
    const usersList = DOM.get('#users-list');

    usersList.innerHTML = '';

    users.forEach((user) => {
      const userCard = DOM.create('div', 'user-card');

      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p>📧 ${user.email}</p>
        <p>🏢 ${user.company.name}</p>
        <p>🌐 ${user.website}</p>
        <p>📍 ${user.address.city}</p>
      `;
      usersList.appendChild(userCard);
    });
  },

  clearUsers: () => {
    DOM.get('#users-list').innerHTML = '';
    Logger.log('Lista de usuarios limpiada', 'warning');
  },
};

// =============================================
// 🎮 COUNTER FUNCTIONALITY
// =============================================

const CounterManager = {
  count: 0,

  init: () => {
    const incrementBtn = DOM.get('#increment');
    const decrementBtn = DOM.get('#decrement');
    const resetBtn = DOM.get('#reset-counter');
    const doubleBtn = DOM.get('#double');

    incrementBtn.addEventListener('click', CounterManager.increment);
    decrementBtn.addEventListener('click', CounterManager.decrement);
    resetBtn.addEventListener('click', CounterManager.reset);
    doubleBtn.addEventListener('click', CounterManager.double);

    CounterManager.updateDisplay();
    Logger.log('Counter Manager inicializado', 'success');
  },

  increment: () => {
    CounterManager.count++;
    CounterManager.updateDisplay();
    Logger.log(`Contador incrementado a ${CounterManager.count}`, 'info');
  },

  decrement: () => {
    CounterManager.count--;
    CounterManager.updateDisplay();
    Logger.log(`Contador decrementado a ${CounterManager.count}`, 'info');
  },

  reset: () => {
    CounterManager.count = 0;
    CounterManager.updateDisplay();
    Logger.log(`Contador reseteado a 0`, 'warning');
  },

  double: () => {
    CounterManager.count *= 2;
    CounterManager.updateDisplay();
    Logger.log(`Contador duplicado a ${CounterManager.count}`, 'info');
  },

  updateDisplay: () => {
    const counterElement = DOM.get('#counter');

    DOM.setText(counterElement, CounterManager.count);

    if (CounterManager.count > 0) {
      counterElement.style.color = '#27ae60';
    } else if (CounterManager.count < 0) {
      counterElement.style.color = '#e74c3c';
    } else {
      counterElement.style.color = '#2c3e50';
    }
  },
};

// =============================================
// 📊 FORM MANAGER FUNCTIONALITY
// =============================================

const FormManager = {
  init: () => {
    const contactForm = DOM.get('#contact-form');
    contactForm.addEventListener('submit', FormManager.handleSubmit);

    Logger.log('Form Manager inicializado', 'success');
  },

  handleSubmit: (event) => {
    event.preventDefault();

    const name = DOM.get('#name').value.trim();
    const email = DOM.get('#email').value.trim();
    const message = DOM.get('#message').value.trim();

    if (!name || !email || !message) {
      FormManager.showResult('Por favor, completa todos los campos', 'error');
      Logger.log('Intento de envio de formulario incompleto', 'error');
      return;
    }

    if (!FormManager.isValidEmail(email)) {
      FormManager.showResult('Por favor, ingresa un email valido', 'error');
      Logger.log('Email invalido en el formulario', 'error');
      return;
    }

    FormManager.showResult('Mensaje enviado exitosamente!', 'success');
    FormManager.resetForm();
    Logger.log(`formulario enviado ${name} (${email})`, 'success');
  },

  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  showResult: (message, type) => {
    const resultElement = DOM.get('#form-result');
    DOM.setHTML(resultElement, message);
    resultElement.clasName = `form-result ${type}`;

    setTimeout(() => {
      resultElement.style.display = 'none';
    }, 5000);
  },

  resetForm: () => {
    DOM.get('#contact-form').reset();
  },
};

// =============================================
// 🔍 DEBUG CONSOLE FUNCTIONALITY
// =============================================

const DebugManager = {
  init: () => {
    const clearLogsBtn = DOM.get('#clear-logs');

    clearLogsBtn.addEventListener('click', DebugManager.clearLogs);
    Logger.log('Debug Manager inicializado', 'success');
  },

  clearLogs: () => {
    DOM.get('#debug-console').innerHTML = '';
    Logger.log('Logs de consola limpiados', 'warning');
  },
};

// =============================================
// 🎯 INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  Logger.log('Aplicacion DOM inicializada', 'success');

  ColorManager.init();
  TextManager.init();
  UserManager.init();
  CounterManager.init();
  FormManager.init();
  DebugManager.init();

  Logger.log('Todos los modulos cargados exitosamente', 'success');

  const sections = DOM.getAll('.section');
  sections.forEach((section, index) => {
    section.addEventListener('mouseenter', () => {
      DOM.addClass(section, 'highlight');
    });

    section.addEventListener('mouseleave', () => {
      DOM.removeClass(section, 'highlight');
    });
  });
});

// =============================================
// 🌟 EJEMPLOS ADICIONALES DE DOM MANIPULATION
// =============================================

// Ejemplo de creación dinámica de elementos

const createDynamicElement = () => {
  const dynamicSection = DOM.create('section', 'section');
  dynamicSection.innerHTML = `
    <h2>🌟 Elemento Dinámico</h2>
    <p>Este elemento fue creado completamente con JavaScript</p>
    <button class="btn btn-primary" id="dynamic-btn">¡Haz clic!</button>
  `;

  document.querySelector('.container').appendChild(dynamicSection);

  // Agregar evento al botón dinámico
  DOM.get('#dynamic-btn').addEventListener('click', () => {
    alert('Boton dinamico funcionando');
    Logger.log('Boton dinamico clickeado', 'info');
  });
};

// createDynamicElement();
