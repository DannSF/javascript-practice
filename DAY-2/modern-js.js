// =============================================
// DÍA 2 - JAVASCRIPT MODERNO (ES6+)
// =============================================

console.log('🚀 DÍA 2 - JavaScript Moderno (ES6+)');

// =============================================
// 1. ARROW FUNCTIONS
// =============================================

console.log('\n🔹 1. ARROW FUNCTIONS');

// Tradicional Function
function sumTraditional(a, b) {
  return a + b;
}

// Arrow function equivalente
const sumArrow = (a, b) => {
  return a + b;
};

// Arrow function con return implícito (una línea)
const sumShort = (a, b) => a + b;

// Arrow function con un solo parámetro (sin paréntesis)
const square = (x) => x * x;

// Arrow function sin parámetros
const greet = () => 'Hello World!';

console.log('Tradicional', sumTraditional(5, 3));
console.log('Arrow', sumArrow(5, 3));
console.log('Short', sumShort(5, 3));
console.log('Square', square(5));
console.log('Greet', greet());

// =============================================
// 2. TEMPLATE LITERALS
// =============================================

console.log('\n🔹 2. TEMPLATE LITERALS');

const userName = 'Danny';
const userAge = 28;
const profession = 'Developer';

// Concatenación tradicional (antigua)
const oldWay =
  'Hola, me llamo ' +
  userName +
  ', tengo ' +
  userAge +
  'años y soy ' +
  profession;

// Template literal (moderna)
const modernWay = `Hola, me llamo ${userName}, tengo ${userAge} años y soy ${profession}`;

// Multi línea sin concatenación
const multiLine = `
Datos del usuario:
- Nombre: ${userName}
- Edad: ${userAge}
- Profesion: ${profession}
`;

console.log('Old way:', oldWay);
console.log('Modern way:', modernWay);
console.log('Multi line:', multiLine);

// =============================================
// 3. DESTRUCTURING
// =============================================

console.log('\n🔹 3. DESTRUCTURING');

// Destructuring de objetos
const persona = {
  uName: 'Ana',
  age: 25,
  city: 'Madrid',
  hobbies: ['Leer', 'correr', 'nadar'],
};

const { uName, age, city } = persona;
console.log('Destructuring object', uName, age, city);

// Destructuring con alias

const { uName: personName, age: personAge } = persona;
console.log('Con alias', personName, personAge);

// Destructuring de arrays
const colors = ['red', 'green', 'blue', 'yellow'];
const [firstColor, secondColor, ...restColors] = colors;
console.log('Destructuring Array', firstColor, secondColor);
console.log('Rest colors', restColors);

// Intercambiar variables
let a = 10;
let b = 20;
[a, b] = [b, a];
console.log('intercambio:', a, b);

// =============================================
// 4. SPREAD OPERATOR
// =============================================

console.log('\n🔹 4. SPREAD OPERATOR');
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];
console.log('Copied Array:', copiedArray);

// Combinar arrays
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combined = [...array1, ...array2];
console.log('Combined Arrays:', combined);

// Añadir elementos
const whitNewElement = [0, ...array1, 4];
console.log('With new element:', whitNewElement);

// Spread con objetos
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const mergeObj = { ...obj1, ...obj2 };
console.log('Merged object:', mergeObj);

// =============================================
// 5. REST PARAMETERS
// =============================================

console.log('\n🔹 5. REST PARAMETERS');

// Rest en funciones
const sumAll = (...numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
};
console.log('Sum all:', sumAll(1, 2, 3, 4, 5));

// Rest con otros parámetros
const userInfo = (name, age, ...hobbies) => {
  console.log(`Name: ${name}, Age: ${age}`);
  console.log('Hobbies:', hobbies);
};

userInfo('Carlos', 30, 'fútbol', 'música', 'viajar');

// =============================================
// 6. DEFAULT PARAMETERS
// =============================================

console.log('\n🔹 6. DEFAULT PARAMETERS');

// Función con parámetros por defecto
const createUser = (name, age = 18, country = 'Ecuador') => {
  return {
    name,
    age,
    country,
  };
};

console.log('User con defaults:', createUser('María'));
console.log('User con edad:', createUser('Pedro', 25));
console.log('User completo:', createUser('Juan', 30, 'Colombia'));

// =============================================
// 7. ENHANCED OBJECT LITERALS
// =============================================

console.log('\n🔹 7. ENHANCED OBJECT LITERALS');
const brand = 'Toyota';
const model = 'Corolla';
const year = 2023;

// Antes: { brand: brand, model: model, year: year }
// Ahora:

const car = {
  brand,
  model,
  year,
  getInfo() {
    return `${this.brand} ${this.model} (${this.year})`;
  },
};

console.log('Enhanced object:', car);
console.log('Car info:', car.getInfo());

// =============================================
// 8. OPTIONAL CHAINING (?.)
// =============================================

console.log('\n🔹 8. OPTIONAL CHAINING');

const company = {
  name: 'TechCorp',
  address: {
    street: 'Main St',
    city: 'Quito',
  },
};

const country = company.address?.country;
const zipCode = company.address?.zipCode ?? 'No especificado';

console.log('Country:', country);
console.log('Zip code:', zipCode);

// =============================================
// 9. NULLISH COALESCING (??)
// =============================================

console.log('\n🔹 9. NULLISH COALESCING');

const value1 = null;
const value2 = undefined;
const value3 = 0;
const value4 = '';

console.log('Nullish 1:', value1 ?? 'default');
console.log('Nullish 2:', value2 ?? 'default');
console.log('Nullish 3:', value3 ?? 'default');
console.log('Nullish 4:', value4 ?? 'default');

// Comparación con ||
console.log('Or operator:', value3 || 'default');
