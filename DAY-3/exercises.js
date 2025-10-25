// =============================================
// DÍA 3 - EJERCICIOS PRÁCTICOS
// =============================================

console.log('💪 EJERCICIOS PRÁCTICOS - DÍA 3');

const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'electronics', stock: 5 },
  { id: 2, name: 'Phone', price: 699, category: 'electronics', stock: 10 },
  { id: 3, name: 'Headphones', price: 199, category: 'electronics', stock: 0 },
  { id: 4, name: 'Book', price: 25, category: 'education', stock: 15 },
  { id: 5, name: 'Mouse', price: 49, category: 'electronics', stock: 8 },
  { id: 6, name: 'Notebook', price: 12, category: 'education', stock: 20 },
];

// Ejercicio 1: Buscar producto por nombre
console.log('\n📝 Ejercicio 1: Buscar producto por nombre');

// Crea una función findProductByName que tome el array y un nombre
// y retorne el producto o undefined si no existe
// const findProductByName = (products, productName) => { ... }

const findProductByName = (products, productName) =>
  products.find((product) => product.name === productName);

// Ejercicio 2: Filtrar por precio máximo
console.log('\n📝 Ejercicio 2: Filtrar por precio máximo');

// Crea una función filterByMaxPrice que tome el array y un precio máximo
// y retorne los productos que cuestan menos o igual al precio dado
// const filterByMaxPrice = (products, maxPrice) => { ... }

const filterByMaxPrice = (products, maxPrice) =>
  products.filter((product) => product.price <= maxPrice);

// Ejercicio 3: Calcular total de precios
console.log('\n📝 Ejercicio 3: Calcular total de precios');

// Crea una función calculateTotalPrice que use reduce
// para calcular la suma de todos los precios
// const calculateTotalPrice = (products) => { ... }

const calculateTotalPrice = (products) =>
  products.reduce((acc, { price }) => acc + price, 0);

// Ejercicio 4: Obtener nombres de productos en stock
console.log('\n📝 Ejercicio 4: Nombres de productos en stock');

// Crea una función getInStockProductNames que retorne
// un array solo con los nombres de productos que tienen stock > 0
// const getInStockProductNames = (products) => { ... }

const getInStockProductNames = (products) =>
  products
    .filter((product) => product.stock > 0)
    .map((product) => product.name);

// Ejercicio 5: Aplicar descuento a categoría
console.log('\n📝 Ejercicio 5: Aplicar descuento a categoría');

// Crea una función applyCategoryDiscount que tome:
// - products array
// - category string
// - discount percentage (ej: 0.1 para 10%)
// y retorne nuevo array con descuento aplicado solo a esa categoría
// const applyCategoryDiscount = (products, category, discount) => { ... }

const applyCategoryDiscount = (products, category, discount) => {
  if (!products.length) return [];
  if (discount < 0 || discount > 1)
    throw new Error('El descuento debe estar entre 0 y 1 (0% - 100%)');

  return products
    .filter((product) => product.category === category)
    .map((product) => ({
      ...product,
      originalPrice: product.price,
      price: +(product.price * (1 - discount)).toFixed(2),
      discountApplied: discount,
    }));
};

// Ejercicio 6: Estadísticas del inventario
console.log('\n📝 Ejercicio 6: Estadísticas del inventario');

// Crea una función getInventoryStats que retorne un objeto con:
// - totalProducts: número total de productos
// - totalValue: valor total del inventario (precio * stock)
// - outOfStockCount: número de productos sin stock
// - averagePrice: precio promedio
// const getInventoryStats = (products) => { ... }

const getInventoryStats = (products) => {
  if (!products.length) {
    return {
      totalProducts: 0,
      totalValue: 0,
      outOfStockCount: 0,
      averagePrice: 0,
    };
  }

  const { totalValue, outOfStockCount, totalPrice } = products.reduce(
    (acc, product) => ({
      totalValue: acc.totalValue + product.price * product.stock,
      outOfStockCount:
        product.stock === 0 ? acc.outOfStockCount + 1 : acc.outOfStockCount,
      totalPrice: acc.totalPrice + product.price,
    }),
    { totalValue: 0, outOfStockCount: 0, totalPrice: 0 }
  );

  return {
    totalProducts: products.length,
    totalValue,
    outOfStockCount,
    averagePrice: +(totalPrice / products.length).toFixed(2),
  };
};
