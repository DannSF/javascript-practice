// =============================================
// 1. VARIABLES AND DATA TYPES
// =============================================

console.log('🔹 1. VARIABLES AND DATA TYPES');

// Using let (can be reassigned)
let userName = 'Danny';
console.log('user name:', userName);

// Using const (cannot be reassigned)
const userAge = 28;
console.log('User age:', userAge);

// Primitive data types
const isDeveloper = true; //boolean
const score = 99.9; //number
const company = 'NA YET'; //stringd
const nothing = null; //null
const notDefined = undefined; //undefined

console.log('data types: ', {
  isDeveloper: typeof isDeveloper,
  score: typeof score,
  company: typeof company,
  nothing: typeof nothing,
  notDefined: typeof notDefined,
});

// =============================================
// 2. OPERATORS
// =============================================

console.log('\n🔹 2. Operators');

// Arithmetic OPERATORS
let a = 15;
let b = 5;

console.log('a + b = ', a + b);
console.log('a - b = ', a - b);
console.log('a * b = ', a * b);
console.log('a / b = ', a / b);
console.log('a % b = ', a % b);
console.log('a ** b = ', a ** b);

// Comparision operatos
console.log('a > b = ', a > b);
console.log('a < b = ', a < b);
console.log('a == b = ', a == 15);
console.log('a === b = ', a === '15');
console.log('a !== b = ', a !== '15');

// Logical operators
const hasLicence = true;
const hasCar = false;

console.log('hasLicence AND hasCar: ', hasLicence && hasCar);
console.log('hasLicence OR hasCar: ', hasLicence || hasCar);
console.log('NOT hasCar: ', !hasCar);

// =============================================
// 3. CONDITIONALS
// =============================================

console.log('\n🔹 3. CONDITIONALS');

const temperature = 23;

if (temperature > 30) {
  console.log("It's a hot day! 🥵");
} else if (temperature >= 30) {
  console.log("It's a pleasent day! 😊");
} else {
  console.log("It's a cold day! 🥶");
}

// Ternary operator
const canVote = userAge >= 18 ? 'Yes! can vote' : 'No!, cannot vote';
console.log('Can Vote? ', canVote);

// Switch Statement

const day = 'monday';
let dayMessage;
switch (day) {
  case 'monday':
    dayMessage = 'Start of the work week 💼';

  case 'friday':
    dayMessage = 'Weekend is coming! 🎉';

  default:
    dayMessage = 'Regular day';
}

console.log('Day message ', dayMessage);

// =============================================
// 4. LOOPS
// =============================================

console.log('\n🔹 4. LOOPS');

// For loop
console.log('Counting from 1 to 5: ');
for (let i = 1; i <= 5; i++) {
  console.log('Number: ', i);
}

// While loop
console.log('\nCountdown from 3: ');
let count = 3;
while (count > 0) {
  console.log('Count: ', count);
  count--;
}

// Loop through arrays
const fruits = ['apple', 'banana', 'orange', 'grape'];
console.log('\nMy fruits:');
for (let i = 0; i < fruits.length; i++) {
  console.log(`Fruit ${i + 1}: ${fruits[i]}`);
}

//For... of loop (modern way)
console.log('\nFruits (modern way):');
for (const fruit of fruits) {
  console.log('Fruit: ', fruit);
}

// =============================================
// 5. ARRAYS AND OBJECTS
// =============================================

console.log('\n🔹 5. ARRAYS AND OBJECTS');

// Array methos

const numbers = [1, 2, 3, 4, 5];
console.log('Original array:', numbers);
console.log('Array Lenght:', numbers.length);
console.log('First element:', numbers[0]);
console.log('Last element:', numbers[numbers.length - 1]);

// Adding and removing elements
numbers.push(6);
console.log('After push(6)', numbers);

numbers.pop();
console.log('After pop()', numbers);

//Objects
const person = {
  name: 'Danny',
  age: 28,
  profession: 'Developer',
  hobbies: ['codding', 'reading', 'gaming'],
};

console.log('Person object:', person);
console.log('Person name:', person.name);
console.log('Person hobbies:', person.hobbies);
console.log('Second hobby:', person.hobbies[1]);

// Add new property
person.country = 'Ecuador';
console.log('After adding country:', person);
