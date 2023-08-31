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
});
