// =============================================
// 🌐 FETCH API - Trabajar con APIs reales
// =============================================

console.log('\n🔹 FETCH API - HTTP Requests');

// =============================================
// 1. FETCH BÁSICO
// =============================================

/**
 * Obtiene usuarios desde JSONPlaceholder API
 * @returns {Promise<Array>} Lista de usuarios
 */

const getUsersBasic = () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json(); // Convertir a JSON
    })
    .then((users) => {
      console.log('✅ Usuarios obtenidos (then):', users.lenght);
      return users;
    })
    .catch((error) => {
      console.log('❌ Error fetching users:', error);
      throw error;
    });
};

// =============================================
// 2. FETCH CON ASYNC/AWAIT
// =============================================

/**
 * Obtiene usuarios usando async/await
 * @returns {Promise<Array>} Lista de usuarios
 */

const getUsers = async () => {
  try {
    console.log('🌐 Haciendo request a la API...');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const users = await response.json();
    console.log(`✅ ${users.length} usuarios obtenidos`);
    return users;
  } catch (error) {
    console.log('❌ Error obteniendo usuarios:', error.message);
    throw error;
  }
};

// =============================================
// 3. EJERCICIO PRÁCTICO - Mostrar usuarios
// =============================================

const displayUsers = async () => {
  try {
    const users = await getUsers();

    console.log('\n👥 LISTA DE USUARIOS:');
    console.log('='.repeat(50));

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🏢 Compañía: ${user.company.name}`);
      console.log(`   🌐 Website: ${user.website}`);
      console.log('   ──────────────────────────');
    });

    return users;
  } catch (error) {
    console.log('❌ Error mostrando usuarios:', error);
    return [];
  }
};

// =============================================
// 4. MÚLTIPLES REQUESTS
// =============================================

const getMultipleData = async () => {
  try {
    console.log('\n📦 Obteniendo multiples datos...');
    const [users, posts, albums] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
        response.json()
      ),
      fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
        response.json()
      ),
      fetch('https://jsonplaceholder.typicode.com/albums').then((response) =>
        response.json()
      ),
    ]);

    console.log('Datos obtenidos:');
    console.log(`   👥 ${users.length} usuarios`);
    console.log(`   📝 ${posts.length} posts`);
    console.log(`   🎵 ${albums.length} albumes`);

    return { users, posts, albums };
  } catch (error) {
    console.log('❌ Error obteniendo multiples datos:', error);
    throw error;
  }
};

// =============================================
// 5. FETCH CON OPCIONES AVANZADAS
// =============================================

const fetchWithOptions = async (url, options = {}) => {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  };

  const config = { ...defaultOptions, ...options };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    const response = await fetch(url, { ...config, signal: controller.signal });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// =============================================
// 🧪 EJECUCIÓN DE DEMOSTRACIÓN
// =============================================

const runDemo = async () => {
  console.log('🚀 INICIANDO DEMO FETCH API');
  console.log('='.repeat(40));

  // 1. Obtener y mostrar usuarios
  await displayUsers();

  // 2. Obtener múltiples datos
  await getMultipleData();

  // 3. Fetch con opciones
  try {
    const user = await fetchWithOptions(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    console.log('\n👤 Usuario especifico:', user);
  } catch (error) {
    console.error('❌ Error fetch con opciones:', error);
  }
  console.log('\n🎉 DEMO COMPLETADA');
};

runDemo();
