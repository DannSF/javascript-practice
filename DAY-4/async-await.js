// =============================================
// 🎯 ASYNC/AWAIT - La forma moderna
// =============================================

console.log('\n🔹 ASYNC/AWAIT - Sintaxis moderna');

// =============================================
// 1. FUNCIONES ASYNC
// =============================================

// async siempre retorna una Promesa

const asyncFunction = async () => {
  return 'Esto es una promesa resuleta automaticamente';
};

//Uso

asyncFunction().then((result) => {
  console.log('✅ Async function result:', result);
});

// =============================================
// 2. AWAIT - Esperar promesas
// =============================================

const fetchWithDelay = async (delay = 1000, data = 'Datos') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data, delay, timestam: new Date().toISOString() });
    }, delay);
  });
};

const useAsyncAwaint = async () => {
  console.log('🕐 Iniciando operaciones async...');
  try {
    const result1 = await fetchWithDelay(1000, 'Usuario 1');
    console.log('✅ Resultado 1:', result1);

    const result2 = await fetchWithDelay(500, 'Usuario 2');
    console.log('✅ Resultado 2:', result2);

    const result3 = await fetchWithDelay(300, 'Usuario 3');
    console.log('✅ Resultado 3', result3);

    console.log('🎉 Todas las operaciones completadas');
    return [result1, result2, result3];
  } catch (error) {
    console.log('Error en async/await:', error);
    throw error;
  }
};

// Ejecutar
useAsyncAwaint().then((finalResult) => {
  console.log('🏁 Resultado final', finalResult);
});

// =============================================
// 3. MANEJO DE ERRORES CON TRY/CATCH
// =============================================

const operationWithError = async (shouldFail = false) => {
  try {
    console.log('🔧 Ejecutando operacion...');

    if (shouldFail) {
      throw new Error('Algo salio mal!');
    }

    const result = await fetchWithDelay(800, 'Operacion exitosa');
    return result;
  } catch (error) {
    console.log('💥 Error capturado:', error.message);
    return { error: true, message: error.message };
  } finally {
    console.log('🧹 Limpiesa (siempre se ejecuta)');
  }
};

//Probar con error
operationWithError(true).then((result) => {
  console.log('Resultado con error:', result);
});

// =============================================
// 4. PARALELISMO CON ASYNC/AWAIT
// =============================================

const parallelOperations = async () => {
  console.log('\n🚀 Operaciones en paralelo');

  // Iniciar todas las promesas al mismo tiempo
  const promise1 = fetchWithDelay(2000, 'Tarea 1');
  const promise2 = fetchWithDelay(1000, 'Tarea 2');
  const promise3 = fetchWithDelay(1500, 'Tarea 3');

  // Esperar a que todas terminen
  const result = await Promise.all([promise1, promise2, promise3]);
  console.log('Todas las tareas paralelas completadas', result);
  return result;
};

parallelOperations();

// =============================================
// 5. ASYNC/AWAIT EN LOOPS
// =============================================

const processItems = async (items) => {
  console.log('\n🔄 Procesando items con async/await');

  // SECUENCIAL (uno después de otro)
  console.log('⏩ Procesamiento secuencial:');
  for (const item of items) {
    const result = await fetchWithDelay(300, `item ${item}`);
    console.log('   ', result.data);
  }

  // PARALELO (todos al mismo tiempo)
  console.log('⚡ Procesamiento parallelo');
  const promises = items.map((item) => {
    fetchWithDelay(300, `Item ${item} paralelo`);
  });

  const parallelResults = await Promise.all([promises]);
  parallelResults.forEach((result) => {
    console.log('   ', result.data);
  });
};

processItems([1, 2, 3, 4]);
