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

function showWithdrawForm(account) {
  content.innerHTML = '';
  
  const greeting = document.createElement('h1');
  greeting.innerHTML = `Ingresa la cantidad que deseas retirar de tu cuenta`;
  content.appendChild(greeting);
  
  const balance = document.createElement('h3');
  balance.innerText = `Tu saldo actual es ${account.getBalance()}`;
  content.appendChild(balance);

  const formContainer = document.createElement('div');
  const label = document.createElement('label');
  label.setAttribute('for', 'quantityInput');
  label.innerHTML = 'Cantidad a retirar: <br>';
  formContainer.appendChild(label);

  const quantityInput = document.createElement('input');
  label.setAttribute('type', 'number');
  label.setAttribute('id', 'quantityInput');
  formContainer.appendChild(quantityInput);

  const errorMsg = document.createElement('div');
  errorMsg.style.color = 'red';
  formContainer.appendChild(errorMsg);

  content.appendChild(formContainer);

  const actions = document.createElement('div');

  const continueButton = document.createElement('button');
  continueButton.innerText = 'Continuar';
  actions.appendChild(continueButton);

  continueButton.addEventListener('click', () => {
    let quantity = Number(quantityInput.value);
    if (quantity <= 0) {
      errorMsg.innerHTML = 'Favor de ingresar una cantidad válida';
      return;
    }

    let result = account.transaction(-quantity);

    if (result.completed) {
      showAccountData(account, result.info + `, se han retirado \$${quantity} pesos del saldo de tu cuenta`);
    } else {
      errorMsg.innerHTML = result.info;
    }
  });

  const exitButton = document.createElement('button');
  exitButton.innerText = 'Regresar';
  actions.appendChild(exitButton);

  exitButton.addEventListener('click', () => {
    showAccountData(account);
  });

  content.appendChild(actions);
}

function showDepositForm(account) {
  content.innerHTML = '';
  
  const greeting = document.createElement('h1');
  greeting.innerHTML = `Ingresa la cantidad que deseas depositar a tu cuenta`;
  content.appendChild(greeting);
  
  const balance = document.createElement('h3');
  balance.innerText = `Tu saldo actual es ${account.getBalance()}`;
  content.appendChild(balance);

  const formContainer = document.createElement('div');
  const label = document.createElement('label');
  label.setAttribute('for', 'quantityInput');
  label.innerHTML = 'Cantidad a depositar: <br>';
  formContainer.appendChild(label);

  const quantityInput = document.createElement('input');
  label.setAttribute('type', 'number');
  label.setAttribute('id', 'quantityInput');
  formContainer.appendChild(quantityInput);

  const errorMsg = document.createElement('div');
  errorMsg.style.color = 'red';
  formContainer.appendChild(errorMsg);

  content.appendChild(formContainer);

  const actions = document.createElement('div');

  const continueButton = document.createElement('button');
  continueButton.innerText = 'Continuar';
  actions.appendChild(continueButton);

  continueButton.addEventListener('click', () => {
    let quantity = Number(quantityInput.value);
    if (quantity <= 0) {
      errorMsg.innerHTML = 'Favor de ingresar una cantidad válida';
      return;
    }

    let result = account.transaction(quantity);

    if (result.completed) {
      showAccountData(account, result.info + `, se han depositado \$${quantity} pesos al saldo de tu cuenta`);
    } else {
      errorMsg.innerHTML = result.info;
    }
  });

  const exitButton = document.createElement('button');
  exitButton.innerText = 'Regresar';
  actions.appendChild(exitButton);

  exitButton.addEventListener('click', () => {
    showAccountData(account);
  });

  content.appendChild(actions);
}

function showAccountData(account, lastTransactionMsg = '') {
  content.innerHTML = '';
  
  const greeting = document.createElement('h1');
  greeting.innerHTML = `Bienvenido ${account.getName()}`;
  content.appendChild(greeting);

  const lastTransactionMessage = document.createElement('h3');
  lastTransactionMessage.innerText = lastTransactionMsg;
  lastTransactionMessage.style.color = 'green';
  content.appendChild(lastTransactionMessage);

  const balanceContainer = document.createElement('div');
  const balanceMsg = document.createElement('h2');
  balanceMsg.innerHTML = 'El saldo en tu cuenta es';
  balanceContainer.appendChild(balanceMsg);

  const balance = document.createElement('h2');
  balance.innerHTML = account.getBalance();
  balanceContainer.appendChild(balance);

  content.appendChild(balanceContainer);

  const actions = document.createElement('div');

  const depositButton = document.createElement('button');
  depositButton.innerText = 'Depositar';
  actions.appendChild(depositButton);

  depositButton.addEventListener('click', () => {
    showDepositForm(account);
  });

  const withdrawButton = document.createElement('button');
  withdrawButton.innerText = 'Retirar';
  actions.appendChild(withdrawButton);

  withdrawButton.addEventListener('click', () => {
    showWithdrawForm(account);
  });

  const exitButton = document.createElement('button');
  exitButton.innerText = 'Regresar';
  actions.appendChild(exitButton);

  exitButton.addEventListener('click', () => {
    showAccounts();
  });

  content.appendChild(actions);
}

function showValidationForm(account) {
  content.innerHTML = '';
  
  const greeting = document.createElement('h1');
  greeting.innerHTML = `Bienvenido ${account.getName()}, ingresa tu contraseña para continuar`;
  content.appendChild(greeting);

  const formContainer = document.createElement('div');
  const label = document.createElement('label');
  label.setAttribute('for', 'passwordInput');
  label.innerHTML = 'Contraseña: <br>';
  formContainer.appendChild(label);

  const passwordInput = document.createElement('input');
  label.setAttribute('id', 'passwordInput');
  formContainer.appendChild(passwordInput);

  const errorMsg = document.createElement('div');
  errorMsg.style.color = 'red';
  formContainer.appendChild(errorMsg);

  content.appendChild(formContainer);

  const actions = document.createElement('div');

  const continueButton = document.createElement('button');
  continueButton.innerText = 'Continuar';
  actions.appendChild(continueButton);

  continueButton.addEventListener('click', () => {
    let password = passwordInput.value;
    if (account.checkPassword(password)) {
      showAccountData(account);
    } else {
      errorMsg.innerHTML = 'La contraseña ingresada es incorrecta';
    }
  });

  const exitButton = document.createElement('button');
  exitButton.innerText = 'Regresar';
  actions.appendChild(exitButton);

  exitButton.addEventListener('click', () => {
    showAccounts();
  });

  content.appendChild(actions);
}

function showAccounts() {
  content.innerHTML = '';

  const greeting = document.createElement('h1');
  greeting.innerHTML = 'Bienvenido, seleccione una cuenta';
  content.appendChild(greeting);

  accounts.forEach(account => {
    const div = document.createElement('div');

    const name = document.createElement('h2');
    name.innerHTML = account.getFullName();

    div.appendChild(name);
    content.appendChild(div);

    div.addEventListener('click', () => {
      showValidationForm(account);
    });
  });
}

showAccounts();