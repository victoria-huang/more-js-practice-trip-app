let tripAdapter = new Adapter('http://localhost:3000/trips');
let userAdapter = new Adapter('http://localhost:3000/users');

document.addEventListener('DOMContentLoaded', () => {
  userAdapter.getAllResources()
  .then(usersJSON => { return usersJSON.map(user => { return new User(user.id, user.name) }) })
  .then(users => { users.forEach(user => user.showUser()) })
})
