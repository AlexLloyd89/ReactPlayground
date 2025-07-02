const users = [
  { id: 1, name: 'John Doe', role: 'admin' },
  { id: 2, name: 'Jane Smith', role: 'user' },
];

export const fetchUsers = async () => {
  await new Promise((res) => setTimeout(res, 300)); // fake delay
  return [...users];
};

export const createUser = async (user: { name: string; role: 'admin' | 'user' }) => {
  users.push({ id: +Date.now(), ...user });
};
