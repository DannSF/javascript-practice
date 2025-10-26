// =============================================
// 🚀 DÍA 4 - PROGRAMACIÓN ASÍNCRONA
// =============================================

console.log('⚡ DÍA 4 - Asincronía en JavaScript');

// =============================================
// 🧠 1. ENTENDIENDO EL EVENT LOOP
// =============================================

console.log('\n🔹 1. EVENT LOOP - Orden de ejecución');

console.log('1. Sync - Inicio del script');

// setTimeout va al Web APIs y luego al Callback Queue
setTimeout(() => {
  console.log('4. Async - SetTimeout 0ms');
}, 0);

// Promise va al Microtask Queue (prioridad sobre Callback Queue)

Promise.resolve().then(() => {
  console.log('3. Microtask - Promise.resolve()');
});

console.log('2. Sync - Fin del script');

// Resultado:
// 1. Sync - Inicio del script
// 2. Sync - Fin del script
// 3. Microtask - Promise.resolve()
// 4. Async - setTimeout 0ms

// =============================================
// ⏰ 2. CALLBACKS (Estilo viejo)
// =============================================

console.log('\n🔹 2. CALLBACKS - Estilo antiguo');

const simulateAsyncOperation = (callback, delay = 1000) => {
  console.log(`⏳ Iniciando operacion (${delay}ms)...`);

  setTimeout(() => {
    const result = `Operacion completada despues de ${delay}ms`;
    callback(null, result);
  }, delay);
};

// Uso con callback (Callback Hell potencial)
simulateAsyncOperation((error, result) => {
  if (error) {
    console.error('Error', error);
    return;
    w;
  }
  console.log('Resultado:', result);

  // Segundo callback anidado (Callback Hell)
  simulateAsyncOperation((error2, result2) => {
    if (error2) {
      console.error('Error2:', error2);
      return;
    }
    console.log('Resultado2:', result2);
  }, 500);
}, 1000);

// =============================================
// 🤝 3. PROMESAS - Mejor approach
// =============================================

console.log('\n🔹 3. PROMESAS - Manejo moderno');

// Crear una promesa
const createPromise = (shouldResolve = true, delay = 1000, data = 'Exito') => {
  return new Promise((resolve, reject) => {
    console.log(`⏳ Promesa iniciada (${delay}ms...)`);
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ success: true, data, timestamp: new Date().toISOString() });
      } else {
        reject(new Error(`Fallo despues de ${delay}ms`));
      }
    }, delay);
  });
};

// Uso de promesas con .then() y .catch()
createPromise(true, 1000, 'Datos del usuario')
  .then((result) => {
    console.log('✅ Promesa resuelta:', result);
    return 'Procesando siguiente paso...';
  })
  .then((secondResult) => {
    console.log('Segundo then:', secondResult);
    return createPromise(true, 500, 'Mas datos');
  })
  .then((thirdResult) => {
    console.log('Tercer then:', thirdResult);
  })
  .catch((error) => {
    console.log('❌ Error en promesa:', error);
  })
  .finally(() => {
    console.log('🏁 Promesa finalizada (siempre se ejecuta)');
  });

// =============================================
// 🎯 4. MANEJO DE MÚLTIPLES PROMESAS
// =============================================

console.log('\n🔹 4. MÚLTIPLES PROMESAS');

const promise1 = createPromise(true, 1000, 'Usuario 1');
const promise2 = createPromise(true, 1000, 'Usuario 2');
const promise3 = createPromise(true, 1000, 'Usuario 3');

// Promise.all - Espera TODAS las promesas
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log('✅ Promise.all - Todos completados');
  })
  .catch((error) => {
    console.error('❌ Promise.all - Un error:', error);
  });

Promise.race([promise1, promise2, promise3]).then((winner) => {
  console.log('🏁 Promise.race - Ganador', winner);
});

// Promise.allSettled - Todas sin importar resultado
Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  console.log('📊 Promise.allSettled - Todos terminados', results);
});

// =============================================
// 🆚 5. CALLBACKS vs PROMESAS vs ASYNC/AWAIT
// =============================================

console.log('\n🔹 5. COMPARACIÓN DE ENFOQUES');

// CALLBACK HELL (Evitar)
const callBackHell = () => {
  simulateAsyncOperation((error, result1) => {
    if (error) return console.error(error);
    simulateAsyncOperation((error, result2) => {
      if (error) return console.error(error);
      simulateAsyncOperation((error, result3) => {
        if (error) return console.error(error);

        console.log('🔥 CallBack Hell completado');
      }, 300);
    }, 500);
  }, 1000);
};

// PROMISE CHAIN (Mejor)
const promiseChain = () => {
  createPromise(true, 1000, 'Paso1')
    .then((result1) => {
      console.log('Paso 1:', result1);
      return createPromise(true, 500, 'Paso 2');
    })
    .then((result2) => {
      console.log('Paso 2:', result2);
      return createPromise(true, 300, 'Paso 3');
    })
    .then((result3) => {
      console.log('Paso 3:', result3);
      console.log('⛓️ Promise Chain completado');
    })
    .catch((error) => console.log('Error:', error));
};

// ASYNC/AWAIT (El mejor - veremos luego)
console.log('🔄 Continuaremos con Async/Await...');
