import Account from './account.js';

function randomNumber(min, max, precision = 0) {
  return Math.trunc((min + Math.random() * (max - min) * Math.pow(10, precision))) / Math.pow(10, precision);
}

const content = document.querySelector('.content');
const accounts = [];

accounts.push(new Account("Geraldine", "Alanis", "geraldine", randomNumber(10, 990, 2)));
accounts.push(new Account("Federico", "Rentería", "federico", randomNumber(10, 990, 2)));
accounts.push(new Account("Alberto", "Altamirano", "alberto", randomNumber(10, 990, 2)));
accounts.push(new Account("Fernanda", "Contreras", "fernanda", randomNumber(10, 990, 2)));

function showAccounts() {
  content.innerHTML = '';

  const greeting = document.createElement('h1');
  greeting.innerHTML = 'Bienvenido, seleccione una cuenta';
  content.appendChild(greeting);

  accounts.forEach(account => {
    const div = document.createElement('div');

    const name = document.createElement('h2');
    name.innerHTML = account.getName();

    div.appendChild(name);
    content.appendChild(div);
  });
}

showAccounts();