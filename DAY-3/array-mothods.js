// =============================================
// DÍA 3 - MÉTODOS DE ARRAYS
// =============================================

console.log('🚀 DÍA 3 - Métodos de Arrays Avanzados');

// Array de productos para practicar
const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'electronics', stock: 5 },
  { id: 2, name: 'Phone', price: 699, category: 'electronics', stock: 10 },
  { id: 3, name: 'Headphones', price: 199, category: 'electronics', stock: 0 },
  { id: 4, name: 'Book', price: 25, category: 'education', stock: 15 },
  { id: 5, name: 'Mouse', price: 49, category: 'electronics', stock: 8 },
  { id: 6, name: 'Notbook', price: 12, category: 'education', stock: 20 },
];

// =============================================
// 1. forEach - Ejecutar función para cada elemento
// =============================================

console.log('\n🔹 1. forEach - Iterar sobre elementos');

console.log('Todos los productos');
products.forEach((product) => {
  console.log(`- ${product.name}: ${product.price}`);
});

// forEach vs for loop tradicional
console.log('\nProductos en stock:');
products.forEach((product) => {
  if (product.stock > 0) {
    console.log(`${product.name} (Stock: ${product.stock})`);
  }
});

// =============================================
// 2. map - Transformar cada elemento
// =============================================

console.log('\n🔹 2. map - Transformar array');

const productNames = products.map((product) => product.name);
console.log('Nombres de productos:', productNames);

const productsWithDiscount = products.map((product) => ({
  ...product,
  price: product.price * 0.9,
  originalPrice: product.price,
}));

// =============================================
// 3. filter - Filtrar elementos
// =============================================

console.log('\n🔹 3. filter - Filtrar elementos');

// Productos electrónicos
const electronics = products.filter(
  (product) => product.category === 'electronics'
);

console.log('Productos electronicos:', electronics);

// Productos en stock
const inStock = products.filter((product) => product.stock > 0);
console.log('Productos en stock:', inStock.length);

// Productos caros (> $500)
const expensiveProducts = products.filter((product) => product.price > 500);
console.log('Productos caros:', expensiveProducts);

// =============================================
// 4. find - Encontrar primer elemento que cumpla condición
// =============================================

console.log('\n🔹 4. find - Encontrar elemento');

const laptop = products.find((product) => product.name === 'Laptop');
console.log('Laptop encontrada:', laptop);

const firstExpensive = products.find((product) => product.price > 500);
console.log('Primer producto caro:', firstExpensive);

// =============================================
// 5. reduce - Reducir array a un solo valor
// =============================================

console.log('\n🔹 5. reduce - Reducir array');

// Total del inventario
const totalValue = products.reduce((total, product) => {
  return total + product.price * product.stock;
}, 0);
console.log('Valor total del inventario:', totalValue);

// Producto más caro
const mostExpensive = products.reduce((max, product) => {
  return product.price > max.price ? product : max;
}, products[0]);

console.log('Producto mas caro:', mostExpensive);

// Agrupar por categoría
const byCategory = products.reduce((groups, product) => {
  const category = product.category;
  if (!groups[category]) {
    groups[category] = [];
  }
  groups[category].push(product);
  return groups;
}, {});

console.log('Productos por categoría:', byCategory);

// =============================================
// 6. some & every - Verificar condiciones
// =============================================

console.log('\n🔹 6. some & every - Verificaciones');

// ¿Hay algún producto sin stock?
const hasOutOfStock = products.some((product) => product.stock === 0);
console.log('Hay productos sin stock?:', hasOutOfStock);

// ¿Todos los productos tienen precio mayor a $10?
const allAbove10 = products.every((product) => product.price > 10);
console.log('Todos cuestan mas de 10?:', allAbove10);

// =============================================
// 7. sort - Ordenar array
// =============================================

console.log('\n🔹 7. sort - Ordenar elementos');

// Ordenar por precio (ascendente)
const byPriceAsc = products.sort((menor, mayor) => menor.price - mayor.price);
console.log(
  'Por precio (Ascendente):',
  byPriceAsc.map((product) => product.name)
);

// Ordenar por stock (descendente)
const byStockDesc = products.sort((menor, mayor) => mayor.stock - menor.stock);
console.log(
  'Por stock (Descendente):',
  byStockDesc.map((product) => product.name)
);

// =============================================
// 8. Combinar métodos - Pipeline de datos
// =============================================

console.log('\n🔹 8. Combinar métodos - Pipeline');

// Nombres de productos electrónicos en stock, ordenados por precio
const pipeLinesResult = products
  .filter((product) => product.category === 'electronics')
  .filter((product) => product.stock > 0)
  .sort((menor, mayor) => menor.price - mayor.price)
  .map((product) => `${product.name} - ${product.price}`);

console.log('Pipeline result:', pipeLinesResult);
