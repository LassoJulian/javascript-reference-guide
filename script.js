
// ======================================================
// JavaScript Reference Guide (index.js)
// Autor: Julián Lasso
// Propósito: Documentación con ejemplos prácticos de JS
// ======================================================

// ------------------------------------------------------
// 1. Ejecución de código y consola
// ------------------------------------------------------
console.log("=== 1. Consola ===");
console.log("Hola, JavaScript!");

// ------------------------------------------------------
// 2. Variables y Tipado
// ------------------------------------------------------
// ------------------------------------------------------
// Javascript es un lenguaje de tipado debil y dinámico.
// Es decir que valores asignados pueden ser re asginados después. Que no se debe declarar
// su tipo explícitamente al inicio como en otros lenguajes.
// ------------------------------------------------------
console.log("\n=== 2. Variables y Tipado ===");
let x = 5;
const y = "texto";
var z = true;

// ------------------------------------------------------
// 2.1 Scope de Variables
// ------------------------------------------------------
// ------------------------------------------------------
// Scope block: se refiere a la visibilidad de las variables
// Desde afuera, una variable declarada con let o const no es accesible.
// ------------------------------------------------------

if (x > 0) {
  let x = 10; // block-scoped
  console.log("Dentro del bloque:", x); // 10
}
console.log("Fuera del bloque:", x); // 5

// ------------------------------------------------------
// Var es accesible de manera global.
// ------------------------------------------------------

// ------------------------------------------------------
// 3. Operadores y Coerción
// ------------------------------------------------------
console.log("\n=== 3. Operadores y Coerción ===");
console.log(1 + "2"); // "12"
console.log(2 * "3"); // 6
console.log("5" - 2); // 3
console.log(2 == "2");  // true
console.log(2 === "2"); // false

// ------------------------------------------------------
// 4. Control de Flujo (if...else y switch)
// ------------------------------------------------------
console.log("\n=== 4. Control de Flujo ===");
const color = "rojo";

if (color === "rojo") {
  console.log("Color es rojo");
} else {
  console.log("Otro color");
}

switch (color) {
  case "rojo":
    console.log("También rojo en switch");
    break;
  default:
    console.log("No rojo");
}

// ------------------------------------------------------
// 5. Arrays, Destructuración y Spread
// ------------------------------------------------------
console.log("\n=== 5. Arrays, Destructuración y Spread ===");
const arr = [1, 2, 3];
const [a, b, c] = arr;
const arr2 = [...arr, 4, 5];
console.log("a:", a, "b:", b, "c:", c);
console.log("arr2:", arr2);

// ------------------------------------------------------
// 6. Objetos, Sets y Maps
// ------------------------------------------------------
console.log("\n=== 6. Objetos, Sets y Maps ===");
const obj = { nombre: "Ana", edad: 25 };
const set = new Set([1, 2, 2, 3]); // elimina duplicados
const map = new Map([
  ["a", 1],
  ["b", 2]
]);

console.log("Objeto:", obj);
console.log("Set:", set);
console.log("Map:", map);

// ------------------------------------------------------
// 7. Bucles
// ------------------------------------------------------
console.log("\n=== 7. Bucles ===");
for (let i = 0; i < 3; i++) {
  console.log("for:", i);
}

let i = 0;
while (i < 3) {
  console.log("while:", i);
  i++;
}

i = 0;
do {
  console.log("do...while:", i);
  i++;
} while (i < 3);

// ------------------------------------------------------
// 8. Manejo de Errores
// ------------------------------------------------------
console.log("\n=== 8. Manejo de Errores ===");
try {
  throw new Error("Algo salió mal");
} catch (err) {
  console.error("Error atrapado:", err.message);
}

// ------------------------------------------------------
// 9. Funciones y Scope
// ------------------------------------------------------
console.log("\n=== 9. Funciones y Scope ===");
function saludar(nombre) {
  return `Hola, ${nombre}`;
}
console.log(saludar("Carlos"));

const persona = {
  nombre: "Luisa",
  saludar: function () {
    console.log("Nombre con this:", this.nombre);
  },
};
persona.saludar();

// ------------------------------------------------------
// 10. Métodos de Arrays (map, filter, reduce)
// ------------------------------------------------------
console.log("\n=== 10. Métodos de Arrays ===");
const nums = [1, 2, 3, 4];
const dobles = nums.map((n) => n * 2);
const pares = nums.filter((n) => n % 2 === 0);
const suma = nums.reduce((acc, n) => acc + n, 0);

console.log("Dobles:", dobles);
console.log("Pares:", pares);
console.log("Suma:", suma);

// ------------------------------------------------------
// 11. Promesas
// ------------------------------------------------------
console.log("\n=== 11. Promesas ===");
const promesa = new Promise((resolve, reject) => {
  setTimeout(() => resolve("¡Listo!"), 1000);
});

promesa
  .then((msg) => console.log("Promesa resuelta:", msg))
  .catch((err) => console.error("Promesa fallida:", err));


// ------------------------------------------------------
// 5.1. Destructuring (Arrays y Objetos) — Guía avanzada
// ------------------------------------------------------
console.log("\n=== 5.1 Destructuring avanzado (Arrays y Objetos) ===");

/*
  IDEA CLAVE:
  - El destructuring te permite “desempacar” valores de arrays u objetos en variables individuales.
  - Puedes saltarte posiciones, asignar valores por defecto, renombrar variables y extraer estructuras anidadas.
  - En objetos: { prop: alias = default }
  - En arrays:  [a = default, , c, ...rest]
*/

// ------------------------------------------------------
// A) ARRAYS
// ------------------------------------------------------
console.log("\n-- A) Arrays --");

// A1) Básico, saltos y 'rest'
const arrA = [10, 20, 30, 40];
const [firstA, secondA] = arrA;           // 10, 20
const [, , thirdA] = arrA;                // 30 (saltando dos)
const [headA, ...tailA] = arrA;           // headA=10, tailA=[20,30,40]
console.log({ firstA, secondA, thirdA, headA, tailA });
const arrC = [10, 20, 30, 40];
const [firstC, secondC] = arrC;           // 10, 20
const [, , thirdC] = arrC;                // 30 (saltando dos)
const [headC, ...tailC] = arrC;           // headC=10, tailC=[20,30,40]
console.log({ firstC, secondC, thirdC, headC, tailC });

// A2) Valores por defecto en arrays
// El valor por defecto solo se usa si el ítem es === undefined (NO si es null)
const arrB = [1, undefined, null];
const [b1 = 100, b2 = 200, b3 = 300, b4 = 400] = arrB;
console.log("Defaults en array:", { b1, b2, b3, b4 }); // b3 será null, no 300

// A3) Intercambio de variables con destructuring
let left = "A", right = "B";
[right, left] = [left, right];
console.log("Swap:", { left, right });

// A4) Anidamiento
const coords = [12, [34, 56], 78];
const [x1, [y1, y2], z1] = coords;
console.log("Anidado:", { x1, y1, y2, z1 });

// A5) Destructuring de retorno de función
function dividir(a, b) {
  const q = Math.floor(a / b);
  const r = a % b;
  return [q, r];
}
const [q1, r1] = dividir(10, 3);
console.log("dividir(10,3):", { q1, r1 });

// A6) Destructuring en parámetros de función (arrays)
function promedio([n1 = 0, n2 = 0, n3 = 0] = []) {
  return (n1 + n2 + n3) / 3;
}
console.log("promedio([10,20,40]):", promedio([10, 20, 40]));
console.log("promedio([]):", promedio([]), " | promedio():", promedio());

// A7) Destructuring en bucles con pares
const pairs = [["a", 1], ["b", 2], ["c", 3]];
for (const [k, v] of pairs) {
  if (k === "a") console.log(`Par: ${k} -> ${v}`);
}

// ------------------------------------------------------
// B) OBJETOS
// ------------------------------------------------------
console.log("\n-- B) Objetos --");

// B1) Básico, renombrado y defaults
const user1 = { id: 42, name: "Ada Lovelace", active: true, meta: { verified: false } };
const { id: userId, name: fullName } = user1;           // renombrado
const { role = "user" } = user1;                        // default (solo si es undefined)
console.log({ userId, fullName, role });

// B2) Anidamiento
const order = {
  id: 1,
  customer: { name: "Ana", address: { city: "Bogotá", zip: 110111 } },
  items: [{ sku: "X", price: 10 }, { sku: "Y", price: 20 }],
};
const {
  customer: { name: customerName, address: { city, zip } },
  items: [firstItemObj],
} = order;
console.log("Anidado obj:", { customerName, city, zip, firstItemObj });

// B3) Rest properties (...rest)
const { id: orderId, ...restOfOrder } = order;
console.log("Rest properties:", { orderId, restOfOrder });

// B4) Claves computadas en destructuring
// Útil cuando la propiedad a extraer se conoce dinámicamente
const keyName = "name";
const { [keyName]: dynamicName } = user1;
console.log("Clave computada:", { dynamicName });

// B5) Defaults seguros con objetos posiblemente null/undefined
const apiResponse = null;
// Evita TypeError con `|| {}` o `?? {}`
const { data: rows = [], error: apiError = null } = apiResponse || {};
console.log("Defaults seguros:", { rows, apiError });

// B6) Asignación a variables existentes (¡requiere paréntesis!)
let foo, bar;
// Si no pones paréntesis, `{}` se interpreta como bloque
({ foo, bar } = { foo: 1, bar: 2 });
console.log("Asignación posterior:", { foo, bar });

// B7) Renombrado con default simultáneo
const settings = { theme: "dark", lang: undefined };
const { theme: currentTheme = "light", lang: language = "es" } = settings;
// lang toma default porque es undefined; theme mantiene "dark"
console.log("Rename + default:", { currentTheme, language });

// B8) Destructuring en parámetros de función (objetos)
function conectar({ host = "localhost", port = 5432, secure = false } = {}) {
  return `Conectando a ${host}:${port} (secure=${secure})`;
}
console.log("conectar({port:3306}):", conectar({ port: 3306 }));
console.log("conectar():", conectar());

// B9) Extraer y omitir propiedades (patrón “omit”)
const productoX = { name: "Camiseta", price: 49.9, stock: 10, tags: ["ropa"] };
const sinPrice = (({ price, ...rest }) => rest)(productoX);
console.log("Omitir propiedad:", sinPrice);

// B10) Destructuring en bucles con objetos
for (const { sku, price } of order.items) {
  if (sku === "X") console.log(`Item ${sku} cuesta ${price}`);
}

// ------------------------------------------------------
// C) MAPS, SETS y combinaciones útiles
// ------------------------------------------------------
console.log("\n-- C) Maps, Sets y combinaciones --");

// C1) Destructuring de entradas en Map
const map1 = new Map([["x", 10], ["y", 20]]);
for (const [k, v] of map1) {
  if (k === "x") console.log(`Map: ${k} -> ${v}`);
}

// C2) Array de objetos con destructuring
const cart = [{ sku: "A", qty: 2 }, { sku: "B", qty: 1 }, { sku: "C", qty: 5 }];
const [{ sku: firstSkuInCart, qty: firstQty }, , ...restCart] = cart;
console.log("Array de objs:", { firstSkuInCart, firstQty, restCart });

// C3) Promesas y destructuring (Promise.all)
const p1 = Promise.resolve("uno");
const p2 = Promise.resolve("dos");
Promise.all([p1, p2]).then(([rUno, rDos]) => {
  console.log("Promise.all destructuring:", { rUno, rDos });
});

// C4) Múltiples asignaciones en cadena
let aa = 1, bb = 2, cc = 3;
[aa, bb, cc] = [aa + 1, bb + 1, cc + 1];
console.log("Asignación múltiple:", { aa, bb, cc });

// ------------------------------------------------------
// D) ERRORES FRECUENTES Y CÓMO EVITARLOS
// ------------------------------------------------------
console.log("\n-- D) Errores comunes --");

/*
  D1) Destructurar null/undefined lanza TypeError:
    const { x } = null; // ❌ rompe
  Solución: usa default vacío:
*/
const maybeNull = null;
const { x: safeX = 0 } = maybeNull || {};  // ✅ seguro
console.log("Safe destructuring:", { safeX });

/*
  D2) Defaults solo aplican cuando el valor es === undefined.
      null NO dispara el default.
  D3) En asignaciones a variables ya declaradas desde objetos,
      recuerda envolver en paréntesis: ({ a } = obj);
  D4) Evita colisiones de nombres renombrando: { prop: alias }.
*/

// ------------------------------------------------------
// E) PATRONES PRÁCTICOS (muy usados en apps reales)
// ------------------------------------------------------
console.log("\n-- E) Patrones prácticos --");

// E1) Extraer campos de respuestas de API con alias y default
const resp = { ok: true, payload: { rows: [1, 2, 3] } };
const {
  ok: success = false,
  payload: { rows: dataRows = [] } = {},
  error: respError = null,
} = resp || {};
console.log("API pattern:", { success, dataRows, respError });

// E2) Parámetros de función con opciones opcionales
function crearUsuario({ name, email, role = "user", active = true } = {}) {
  return { id: cryptoRandomId(), name, email, role, active };
}
function cryptoRandomId() {
  // mock simple para ejemplo (no cripto real)
  return Math.random().toString(36).slice(2, 10);
}
console.log(
  "crearUsuario:",
  crearUsuario({ name: "Rita", email: "rita@mail.com" })
);

// E3) Extraer y “el resto” para pasar props hacia abajo (React-like)
const buttonProps = { label: "Guardar", type: "submit", className: "btn", disabled: false };
const { label, ...domProps } = buttonProps;
console.log("props:", { label, domProps });

// E4) Destructuring con arrays de resultados (regex, split, etc.)
const match = "2025-08-24".match(/^(\d{4})-(\d{2})-(\d{2})$/) || [];
const [, year, month, day] = match; // índice 0 es la cadena completa
console.log("Regex match:", { year, month, day });

// E5) Destructurar opciones con defaults profundos
const config = { ui: { theme: { name: "dark" } } };
const {
  ui: {
    theme: { name: themeName = "light", contrast = "normal" } = {},
  } = {},
} = config || {};
console.log("Deep defaults:", { themeName, contrast });
