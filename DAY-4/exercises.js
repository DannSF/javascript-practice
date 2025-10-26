// =============================================
// 💪 DÍA 4 - EJERCICIOS PRÁCTICOS
// =============================================

console.log('💪 EJERCICIOS PRÁCTICOS - DÍA 4');

// =============================================
// 🎯 EJERCICIO 1: GETUSERS() CON FETCH
// =============================================

/**
 * EJERCICIO: Crea una función getUsers() que obtenga datos desde:
 * https://jsonplaceholder.typicode.com/users
 * y muestre los nombres en consola con forEach
 */

// TODO: Implementa getUsers() aquí
// const getUsers = async () => { ... }

const getUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const users = await response.json();

    users.forEach((user) => {
      console.log(user.name);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// =============================================
// 🎯 EJERCICIO 2: MANEJO DE ERRORES
// =============================================

/**
 * Crea una función getUserById que:
 * - Acepte un id de usuario
 * - Haga fetch a https://jsonplaceholder.typicode.com/users/:id
 * - Maneje errores (usuario no existe, network error)
 * - Retorne el usuario o null si hay error
 */

// const getUserById = async (userId) => { ... }

const getUserById = async (userId) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!response.ok) {
      console.warn(`Usuario no encontrado (status: ${response.status})`);
      return null;
    }
    const user = await response.json();

    return user;
  } catch (error) {
    console.error('Error fetching user', error);
    return null;
  }
};

// =============================================
// 🎯 EJERCICIO 3: MÚLTIPLES REQUESTS
// =============================================

/**
 * Crea una función getUserPosts que:
 * - Obtenga un usuario por id
 * - Obtenga los posts de ese usuario
 * - Retorne { user, posts }
 * - Usa Promise.all para optimizar
 */

// const getUserPosts = async (userId) => { ... }

const getUserPosts = async (userId) => {
  try {
    const fetchPosts = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/'
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };

    const [user, postsAll] = await Promise.all([
      getUserById(userId),
      fetchPosts(),
    ]);

    if (!user) {
      console.warn('Usuario no encontrado');
      return { user: null, posts: [] };
    }

    const posts = postsAll.filter((post) => post.userId === userId);

    return { user, posts };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { user: null, posts: [] };
  }
};

// =============================================
// 🎯 EJERCICIO 4: TIMEOUT Y RETRY
// =============================================

/**
 * Crea una función fetchWithRetry que:
 * - Intente hacer un fetch
 * - Si falla, reintente hasta 3 veces
 * - Espere 1 segundo entre intentos
 * - Lance error si todos los intentos fallan
 */

// const fetchWithRetry = async (url, retries = 3) => { ... }

const fetchWithRetry = async (url, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.warn(`Intento ${attempt} fallido: ${error.message}`);
      if (attempt < retries) {
        await new Promise((resolve, _) => setTimeout(resolve, 1000));
      } else {
        throw new Error(`Todos los intentos fallaron: ${error.message}`);
      }
    }
  }
};

// =============================================
// 🎯 EJERCICIO 5: PROCESSING DATA
// =============================================

/**
 * Crea una función getUsersWithPosts que:
 * - Obtenga todos los usuarios
 * - Para cada usuario, obtenga sus posts
 * - Retorne array de { user, postCount }
 * - Usa map y Promise.all para eficiencia
 */

// const getUsersWithPosts = async () => { ... }

const getUsersWithPosts = async () => {
  try {
    const [users, posts] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
        response.json()
      ),
      fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
        response.json()
      ),
    ]);

    return users.map((user) => {
      const postCount = posts.filter((post) => post.userId === user.id).length;

      return { user, postCount };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// =============================================
// 🧪 EJECUTAR EJERCICIOS
// =============================================

const runExercises = async () => {
  console.log('\n🧪 EJECUTANDO EJERCICIOS...');

  // Ejecuta tus ejercicios aquí
  // await getUsers();
  // await getUserById(1);
  // await getUserPosts(1);
  // await getUsersWithPosts();
};

// runExercises();
