// =============================================
// EJERCICIOS PRÁCTICOS - DÍA 2
// =============================================

console.log('💪 EJERCICIOS PRÁCTICOS - DÍA 2');

// Ejercicio 1: Convertir funciones a arrow functions
console.log('\n📝 Ejercicio 1: Arrow Functions');

// Convierte estas funciones tradicionales a arrow functions:
function multiply(a, b) {
  return a * b;
}

function isEven(num) {
  return num % 2 === 0;
}

function getFirstChar(str) {
  return str[0];
}

// Tus soluciones aquí:
// const multiplyArrow = ...
const multiplyArrow = (a, b) => {
  return a * b;
};

// const isEvenArrow = ...
const isEvenArrow = (num) => {
  return num % 2 === 0;
};

// const getFirstCharArrow = ...
const getFirstCharArrow = (str) => {
  return str[0];
};

// Ejercicio 2: Destructuring practice
console.log('\n📝 Ejercicio 2: Destructuring');

const student = {
  name: 'Laura',
  grades: [85, 90, 78, 92],
  contact: {
    email: 'laura@example.com',
    phone: '123-456-7890',
  },
};

// Extrae name, el primer grade, y email usando destructuring
// console.log(...)
const { name, grade, contact } = student;
console.log(`
    Name: ${name}
    Grade: ${grade[0]}
    Email: ${contact.email}
    `);

// Ejercicio 3: Spread operator
console.log('\n📝 Ejercicio 3: Spread Operator');

const fruits = ['manzana', 'banana'];
const moreFruits = ['naranja', 'uva'];

// Combina los arrays y añade 'piña' al final
// const allFruits = ...
const allFruits = [...fruits, ...moreFruits, 'piña'];

// Ejercicio 4: Template literals
console.log('\n📝 Ejercicio 4: Template Literals');

const product = {
  name: 'Laptop',
  price: 999,
  category: 'Electrónicos',
};

// Crea un string: "Producto: Laptop, Precio: $999, Categoría: Electrónicos"
// usando template literals

const productStr = `Producto: ${product.name}, Precio: ${product.price}, Categoría: ${product.category}`;

// Ejercicio 5: Default parameters
console.log('\n📝 Ejercicio 5: Default Parameters');

// Crea una función createMessage que tome:
// - message (string)
// - type (string) con default 'info'
// - duration (number) con default 5000
// y retorne un objeto con estas propiedades

function createMessage(message, type = 'info', duration = 5000) {
  return {
    message,
    type,
    duration,
  };
}
