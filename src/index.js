import "./styles/styles.css";

function BankAccount(ownerName, initialBalance) {
  this.ownerName = ownerName;
  this.balance = initialBalance;
  this.locked = false;
}

const BankAccountPrototype = {
  blockingBalance(boolean) {
    if (typeof boolean === "boolean") {
      this.locked = boolean;
      return `Your bank account is ${boolean ? "blocked" : "unblocked"}.`;
    } else {
      throw new Error("Parameter is invalid.");
    }
  },

  deposit(amount) {
    this.balance += amount;
    return `You have topped up your balance by ${amount}$, your current balance is ${this.balance}$.`;
  },

  withdraw(amount) {
    if (this.locked) {
      throw new Error(
        "Your bank account is blocked, you can't withdraw funds."
      );
    } else if (this.balance >= amount) {
      this.balance -= amount;
      return `You cashed out ${amount}$, your current balance is ${this.balance}$.`;
    } else {
      throw new Error("Insufficient funds on the balance.");
    }
  },

  getBalance() {
    return `Your current balance is ${this.balance}$.`;
  },
};

BankAccount.prototype = BankAccountPrototype;

const myBankAccount = new BankAccount("Zohrab", 5000);

console.log(myBankAccount);
console.log(myBankAccount.blockingBalance(true));
console.log(myBankAccount.blockingBalance(false));
console.log(myBankAccount.withdraw(2000));
console.log(myBankAccount.getBalance());

const usersBankAccount = new BankAccount("newUser", 8000);

console.log(usersBankAccount);
console.log(usersBankAccount.withdraw(3000));
console.log(usersBankAccount.deposit(4500));
console.log(usersBankAccount.getBalance());
console.log(usersBankAccount.withdraw(12000));
