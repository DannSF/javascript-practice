// =============================================
// DÍA 3 - FUNCIONES PURAS E IMPURAS
// =============================================

console.log('🧪 FUNCIONES PURAS VS IMPURAS');

// =============================================
// FUNCIONES PURAS
// =============================================

// Función pura - Mismo input → Mismo output, sin side effects
const calculateTotal = (price, quantity) => price * quantity;

// Función pura - No modifica el array original
const addTax = (products, taxRate) => {
  return products.map((product) => ({
    ...product,
    price: product.price * (1 + taxRate),
  }));
};

// Función pura - Solo depende de sus parámetros
const isProductAvailable = (product, mainStock = 0) =>
  product.stock > mainStock;

// =============================================
// FUNCIONES IMPURAS
// =============================================

console.log('\n🔹 FUNCIONES IMPURAS');

let globalCounter = 0;

// Función impura - Depende de estado externo
const impureIncrement = () => {
  globalCounter++;
  return globalCounter;
};

// Función impura - Modifica el array original
const impureAddProduct = (products, newProduct) => {
  products.push(newProduct);
  return products;
};

// Función impura - Tiene side effect (console.log)
const impureDisplayProducts = (product) => {
  console.log('Products');
  products.forEach((product) => console.log(product.name));
  return products.lenght;
};

// =============================================
// EJEMPLOS PRÁCTICOS
// =============================================

console.log('\n🔹 EJEMPLOS PRÁCTICOS');

const sampleProducts = [
  { name: 'Tablet', price: 299, stock: 3 },
  { name: 'Monitor', price: 199, stock: 0 },
];

// Pura - No modifica original
const productWithTax = addTax(sampleProducts, 0.16);
console.log('Original', sampleProducts);
console.log('Con tax', productWithTax);

// Impura - Modifica original
const modifiedProducts = impureAddProduct(sampleProducts, {
  name: 'Keyboard',
  price: 89,
});

console.log('Original modificado', sampleProducts);
