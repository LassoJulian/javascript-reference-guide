console.log("script.js iniciado");

const output = document.getElementById("demo-output");
const navLinks = Array.from(document.querySelectorAll(".section-nav a"));
const demoButtons = Array.from(document.querySelectorAll("[data-demo]"));

console.log("output element:", output);
console.log("demoButtons found:", demoButtons.length);
if (output) {
  output.textContent = `✓ Script.js cargado correctamente
✓ Botones de demo encontrados: ${demoButtons.length}
✓ Panel de output inicializado

Haz click en cualquier botón de demostración para ver resultados.
`;
}
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskPriority = document.getElementById("task-priority");
const taskError = document.getElementById("task-error");
const todoList = document.getElementById("todo-list");
const todoStats = document.getElementById("todo-stats");
const newsletterForm = document.getElementById("newsletter-form");
const newsletterName = document.getElementById("newsletter-name");
const newsletterFormat = document.getElementById("newsletter-format");
const newsletterFeedback = document.getElementById("newsletter-feedback");
const newsletterLog = document.getElementById("newsletter-log");
const fetchStatus = document.getElementById("fetch-status");
const removeListenerButton = document.getElementById("remove-listener-btn");

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage no disponible en algunos entornos de preview.
  }
}

function writeOutput(lines) {
  output.textContent = Array.isArray(lines) ? lines.join("\n") : String(lines);
}

const todoStorageKey = "js-guide-todos";
let currentFilter = "all";
const defaultTodos = [
  { id: "seed-1", text: "Leer la sección de eventos", priority: "medium", done: false },
  { id: "seed-2", text: "Crear una tarea y marcarla como hecha", priority: "low", done: true },
];

function readTodos() {
  try {
    const stored = JSON.parse(readStorage(todoStorageKey));
    if (Array.isArray(stored)) return stored;
    return defaultTodos;
  } catch {
    return defaultTodos;
  }
}

function saveTodos(todos) {
  writeStorage(todoStorageKey, JSON.stringify(todos));
}

function renderTodos() {
  const todos = readTodos();
  const filtered = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.done;
    if (currentFilter === "done") return todo.done;
    return true;
  });

  todoList.innerHTML = filtered.length
    ? filtered.map((todo) => `
      <li class="todo-item ${todo.done ? "is-done" : ""}" data-id="${todo.id}">
        <button class="todo-toggle" type="button" data-action="toggle" aria-label="Marcar tarea">
          ${todo.done ? "◼" : "◻"}
        </button>
        <div class="todo-body">
          <strong>${todo.text}</strong>
          <span>${todo.priority}</span>
        </div>
        <button class="todo-delete" type="button" data-action="delete">Eliminar</button>
      </li>
    `).join("")
    : `<li class="todo-empty">No hay tareas en este filtro.</li>`;

  const pending = todos.filter((todo) => !todo.done).length;
  todoStats.textContent = `${pending} tarea${pending === 1 ? "" : "s"} pendiente${pending === 1 ? "" : "s"}`;
}

function setTaskError(message) {
  taskError.textContent = message;
}

function addTodo(text, priority) {
  const todos = readTodos();
  todos.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    text,
    priority,
    done: false,
  });
  saveTodos(todos);
  renderTodos();
}

function updateTodo(id, updater) {
  const todos = readTodos();
  const next = todos.map((todo) => (todo.id === id ? updater(todo) : todo));
  saveTodos(next);
  renderTodos();
}

function deleteTodo(id) {
  const next = readTodos().filter((todo) => todo.id !== id);
  saveTodos(next);
  renderTodos();
}

const demos = {
  fundamentos() {
    const price = "120";
    const quantity = 3;
    const total = Number(price) * quantity;
    return [
      "Tipos y coerción",
      `typeof price -> ${typeof price}`,
      `total -> ${total}`,
      `Boolean(\"\") -> ${Boolean("")}`,
      `Number.isFinite(total) -> ${Number.isFinite(total)}`,
    ];
  },
  closures() {
    function createCounter(start = 0) {
      let value = start;
      return () => ++value;
    }

    const counter = createCounter(10);
    return [
      "Closures",
      `counter() -> ${counter()}`,
      `counter() -> ${counter()}`,
      "Use case: cache, factories, state privado.",
    ];
  },
  async() {
    return [
      "Async/Await",
      "Promise -> representa una operación que terminará en éxito o error",
      "Promise.all -> agrupa solicitudes en paralelo",
      "try/catch -> captura fallos de red o parseo",
      "Use case: dashboards y cargas concurrentes.",
    ];
  },
  dom() {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.action = "save";
    button.textContent = "Guardar";
    return [
      "DOM y eventos",
      `Elemento creado -> <${button.tagName.toLowerCase()} data-action=\"save\">`,
      "Delegación: una sola escucha para muchos nodos.",
      "Use case: menús, tabs, listas y formularios.",
    ];
  },
  events() {
    const supported = ["click", "input", "submit", "keydown", "scroll"];
    return [
      "Eventos y listeners",
      "Evento -> señal disparada por el navegador o por el usuario",
      `Listeners comunes -> ${supported.join(", ")}`,
      "addEventListener acepta opciones: once, capture y passive.",
      "Delegación: escuchar en un contenedor y filtrar con event.target.",
      "Use case: modales, navegación, formularios y accesibilidad.",
    ];
  },
  forms() {
    return [
      "Eventos con formularios",
      "input -> reacciona en cada cambio de texto",
      "change -> dispara al confirmar un valor",
      "submit -> valida y envía el formulario",
      "reset -> limpia campos y estado visual",
    ];
  },
  todo() {
    return [
      "Mini todo app",
      "Formulario -> valida la entrada antes de mutar el estado",
      "Valida el formulario antes de agregar tareas.",
      "Usa delegación para toggle y delete en la lista.",
      "Filtra entre all, active y done.",
      "Persistencia: localStorage.",
    ];
  },
  storage() {
    writeStorage("js-guide-theme", "dark");
    return [
      "APIs del navegador",
      `localStorage[\"js-guide-theme\"] -> ${readStorage("js-guide-theme")}`,
      "URLSearchParams, fetch y AbortController pertenecen a este bloque.",
      "Use case: persistencia simple y preferencias de usuario.",
    ];
  },
  fetch() {
    return [
      "Fetch + AbortController",
      "fetch() obtiene recursos remotos y devuelve una Promise.",
      "AbortController permite cancelar solicitudes largas.",
      "Use case: búsqueda remota, dashboards y autosuggest.",
    ];
  },
  proxy() {
    const model = new Proxy({ age: 18 }, {
      set(target, key, value) {
        if (key === "age" && value < 0) throw new Error("Edad inválida");
        target[key] = value;
        return true;
      },
    });

    model.age = 21;
    return [
      "Proxy",
      "Generador -> produce valores bajo demanda con yield",
      `age -> ${model.age}`,
      "Use case: validación, observabilidad y capas reactivas.",
      "Reflect complementa las operaciones de bajo nivel.",
    ];
  },
};

function runDemo(name) {
  const demo = demos[name];
  if (!demo) {
    console.warn(`Demo not found: ${name}`);
    return;
  }
  console.log(`Running demo: ${name}`);
  writeOutput(demo());
}

console.log(`Found ${demoButtons.length} demo buttons`);
demoButtons.forEach((button) => {
  button.addEventListener("click", () => runDemo(button.dataset.demo));
  console.log(`Registered demo: ${button.dataset.demo}`);
});

if (taskForm && todoList) {
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = taskInput.value.trim();
    const priority = taskPriority.value;

    if (text.length < 3) {
      setTaskError("Escribe una tarea con al menos 3 caracteres.");
      taskInput.focus();
      return;
    }

    setTaskError("");
    addTodo(text, priority);
    taskForm.reset();
    taskPriority.value = "medium";
    taskInput.focus();
  });

  todoList.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    const item = event.target.closest(".todo-item");
    if (!actionButton || !item) return;

    const id = item.dataset.id;
    const action = actionButton.dataset.action;

    if (action === "toggle") {
      updateTodo(id, (todo) => ({ ...todo, done: !todo.done }));
    }

    if (action === "delete") {
      deleteTodo(id);
    }
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      renderTodos();
    });
  });

  renderTodos();
}

if (taskInput && taskPriority && !taskForm) {
  // No-op fallback; the practice section is expected to exist.
}

if (newsletterForm && newsletterName && newsletterFormat) {
  const updateNewsletterLog = (message) => {
    if (newsletterLog) newsletterLog.textContent = message;
  };

  newsletterName.addEventListener("input", () => {
    const count = newsletterName.value.trim().length;
    updateNewsletterLog(`input: ${count} carácter${count === 1 ? "" : "es"} escritos.`);
  });

  newsletterFormat.addEventListener("change", () => {
    updateNewsletterLog(`change: formato seleccionado -> ${newsletterFormat.value}.`);
  });

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = newsletterName.value.trim();

    if (name.length < 2) {
      if (newsletterFeedback) newsletterFeedback.textContent = "El nombre debe tener al menos 2 caracteres.";
      newsletterName.focus();
      return;
    }

    if (newsletterFeedback) newsletterFeedback.textContent = "";
    updateNewsletterLog(`submit: ${name} suscrito con formato ${newsletterFormat.value}.`);
  });

  newsletterForm.addEventListener("reset", () => {
    if (newsletterFeedback) newsletterFeedback.textContent = "";
    updateNewsletterLog("reset: formulario restaurado.");
  });
}

if (fetchStatus) {
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, 4000);

  fetch("https://jsonplaceholder.typicode.com/todos/1", { signal: controller.signal })
    .then((response) => response.json())
    .then((data) => {
      clearTimeout(timer);
      fetchStatus.textContent = `fetch: ${data.title}`;
    })
    .catch(() => {
      fetchStatus.textContent = "fetch: no disponible o cancelado.";
    });
}

if (removeListenerButton) {
  const onRemoveClick = () => {
    removeListenerButton.textContent = "Listener ejecutado";
    removeListenerButton.removeEventListener("click", onRemoveClick);
  };

  removeListenerButton.addEventListener("click", onRemoveClick);
}

if (output && output.textContent.includes("Laboratorio listo")) {
  runDemo("fundamentos");
}

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const id = `#${entry.target.id}`;
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === id));
  }
}, {
  rootMargin: "-25% 0px -60% 0px",
  threshold: 0.1,
});

document.querySelectorAll(".section").forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

writeOutput([
  "Laboratorio listo",
  "Selecciona una demo para ejecutar ejemplos interactivos.",
]);
