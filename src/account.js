export default class Account {
  constructor(firstname, lastname, password, balance) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._password = password;
    this._balance = balance;
  }

  getName() {
    return this._firstname;
  }

  getFullName() {
    return `${this._firstname} ${this._lastname}`
  }

  getBalance() {
    return this._balance;
  }

  setPassword(previousPassword, newPassword) {
    if (this._password === previousPassword) {
      this._password = newPassword;
      return true;
    }

    return false;
  }

  checkPassword(password) {
    return this._password === password;
  }

  transaction(amount) {
    if (this._balance + amount < 10 || this._balance + amount > 990) {
      return {
        completed: false,
        info:
          `Lo sentimos la transacción no pudo ser completada,
          ${(this._balance + amount < 10)
            ? "el saldo de tu cuenta no puede ser menor a $10"
            : "el saldo de tu cuenta no puede exceder $990"}
          `
      };
    }

    this._balance += amount;
    return {
      completed: true,
      info: "Transacción completada exitosamente"
    };
  }
}
