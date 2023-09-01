const { BankAccount } = require("./index");

describe("BankAccount function:", () => {
  const account = new BankAccount();

  describe("blockingBalance function:", () => {
    test("should be defined", () => {
      expect(account.blockingBalance(true)).toBeDefined();
    });

    test("should block the account when true is passed", () => {
      const result = account.blockingBalance(true);

      expect(account.locked).toBe(true);
      expect(result).toBe("Your bank account is blocked.");
    });

    test("should unblock the account when false is passed", () => {
      const result = account.blockingBalance(false);

      expect(account.locked).toBe(false);
      expect(result).toBe("Your bank account is unblocked.");
    });

    test("should throw an error if the parameter is invalid", () => {
      expect(() => {
        account.blockingBalance("false");
      }).toThrow("Parameter is invalid.");
      expect(() => {
        account.blockingBalance(1);
      }).toThrow("Parameter is invalid.");
      expect(() => {
        account.blockingBalance(null);
      }).toThrow("Parameter is invalid.");
    });
  });

  describe("deposit function:", () => {
    beforeEach(() => {
      account.balance = 1000;
    });

    test("should be defined", () => {
      expect(account.deposit(1000)).toBeDefined();
    });

    test("should increase the balance if amount is valid", () => {
      const result = account.deposit(1500);

      expect(account.balance).toBe(2500);
      expect(result).toBe(
        "You have topped up your balance by 1500$, your current balance is 2500$."
      );
    });

    test("should throw an error if parameter is invalid", () => {
      expect(() => {
        account.deposit(null);
      }).toThrow("Parameter is invalid.");
      expect(() => {
        account.deposit();
      }).toThrow("Parameter is invalid.");
      expect(() => {
        account.deposit("null");
      }).toThrow("Parameter is invalid.");
    });
  });

  describe("withdraw function:", () => {
    beforeEach(() => {
      account.locked = false;
      account.balance = 1000;
    });

    test("should throw an error if account is blocked", () => {
      account.locked = true;

      expect(() => {
        account.withdraw(500);
      }).toThrow("Your bank account is blocked, you can't withdraw funds.");
    });

    test("should decrease amount from the balance if amount is valid", () => {
      const result = account.withdraw(200);

      expect(account.balance).toBe(800);
      expect(result).toBe("You cashed out 200$, your current balance is 800$.");
    });

    test("should throw an error if parameter is invalid", () => {
      expect(() => {
        account.withdraw(null);
      }).toThrow("Parameter is invalid.");
      expect(() => {
        account.withdraw();
      }).toThrow("Parameter is invalid.");
      expect(() => {
        account.withdraw("null");
      }).toThrow("Parameter is invalid.");
    });

    test("should throw an error if there are not enough funds on the balance", () => {
      expect(() => {
        account.withdraw(2000);
      }).toThrow("Insufficient funds on the balance.");
    });
  });
});
