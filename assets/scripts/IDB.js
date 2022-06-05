import { openDB, deleteDB, wrap, unwrap } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

const DBNAME = "TodoDB";
const DBOS = "Todo";

const db = await openDB(DBNAME, 1, {
  upgrade(db) {
    const store = db.createObjectStore(DBOS, {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('id', 'id');
  },
});

export async function get(key) {
  return (await db).get(DBOS, key);
};
export async function set(todoID, todoCategory, todoTitle, todoBody) {
  return (await db).put(DBOS, {
    id: todoID,
    title: todoTitle,
    date: Date(),
    body: todoBody,
  })
};
export async function add(todoID, todoCategory, todoTitle, todoBody) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = monthNames[date.getMonth()];
  const today = date.getDate();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  return (await db).add(DBOS, {
    id: todoID,
    category: todoCategory,
    title: todoTitle,
    date: `${currentMonth} ${today} ${currentYear}  ${time} `,
    body: todoBody,
  })
};
export async function del(key) {
  return (await db).delete(DBOS, key);
};
export async function clear() {
  return (await db).clear(DBOS);
};
export async function keys() {
  return (await db).getAllKeys(DBOS);
};
export async function countKeys() {
  return (await db).count(DBOS);
};
export async function getAll() {
  return (await db).getAll(DBOS);
};

