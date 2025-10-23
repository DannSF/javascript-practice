// =============================================
// CHALLENGES - DAY 1
// =============================================

console.log('🎯 DAY 1 CHALLENGES');

// Challenge 1: Variables and Operators
console.log('\n🔸 Challenge 1: Variables and Operators');
// Create two variables: base = 10, height = 5
// Calculate the area of a triangle (area = (base * height) / 2)
// Print the result]]

const base = 20;
const height = 3;

const area = (base * height) / 2;
console.log('Triangle area: b = 20; h = 3 :', area);

// Challenge 2: Conditionals
console.log('\n🔸 Challenge 2: Conditionals');
// Create a function that takes a score (0-100) and returns:
// - "A" if score >= 90
// - "B" if score >= 80
// - "C" if score >= 70
// - "F" if score < 70

const calcScore = (score) => {
  if (score > 100 || score < 0) return 'Range error';
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  return 'F';
};

console.log('Score 85: ', calcScore(85));

// Challenge 3: Loops
console.log('\n🔸 Challenge 3: Loops');
// Create an array of numbers from 1 to 10
// Print only the even numbers

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let number of numbers) {
  if (number % 2 === 0) {
    console.log('number: ', number);
  }
}

// Challenge 4: Arrays
console.log('\n🔸 Challenge 4: Arrays');
// Create an array of 5 favorite foods
// Add two more foods
// Remove the last food
// Print the final array and its length

const foods = ['sushi', 'salad', 'pizza', 'burger', 'icecream'];
foods.push('paella', 'papas');
console.log('Add two more foods array: ', foods);
console.log('Final array length: ', foods.length);
foods.pop();
console.log('Final array: ', foods);

// Challenge 5: Objects
console.log('\n🔸 Challenge 5: Objects');
// Create a book object with:
// - title (string)
// - author (string)
// - year (number)
// - isAvailable (boolean)
// Add a method that returns "Available" or "Not available"

const book = {
  title: 'Atomic Habits',
  author: 'James Clear',
  year: 2018,
  isAvailable: false,
  getAvailability() {
    return this.isAvailable ? 'Available' : 'Not available';
  },
};

console.log(book.getAvailability());
