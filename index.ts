import fs from 'fs';

interface Config {
  protocol: string;
  ip: string;
  port: number;
  resource: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function loadConfig(file: string): Config {
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

function pickRandomId(): number {
  return Math.floor(Math.random() * 100) + 1;  // 1..100
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

function processTodo(todo: Todo): void {
  console.log('✅ Fetched Todo:');
  console.log(` • ID: ${todo.id}`);
  console.log(` • Title: "${todo.title}"`);
  console.log(` • Completed: ${todo.completed}`);
}

async function main() {
  const cfg = loadConfig('config.json');
  const id = pickRandomId();
  const url = `${cfg.protocol}${cfg.ip}:${cfg.port}${cfg.resource}${id}`;

  console.log('🔗 Fetching URL:', url);

  try {
    const todo = await fetchJson<Todo>(url);
    processTodo(todo);
  } catch (err) {
    console.error('Error fetching todo:', err);
  }
}

main();

