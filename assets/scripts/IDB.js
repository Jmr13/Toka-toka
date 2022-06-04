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
export async function set(todoID, todoTitle, todoBody) {
  return (await db).put(DBOS, {
    id: todoID,
    title: todoTitle,
    date: Date(),
    body: todoBody,
  })
};
export async function add(todoID, todoTitle, todoBody) {
  return (await db).add(DBOS, {
    id: todoID,
    title: todoTitle,
    date: Date(),
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



// db.getAll('Todo').then("Values: " + console.log);

// db.count('Todo').then(e => console.log(e));
// await db.add('Todo', { id: 'Message001', title: 'Article 1', date: new Date('2019-01-01'), body: '…', });