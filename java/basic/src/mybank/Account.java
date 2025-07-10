package mybank;

public class Account {
	int balance;

	public Account(int balance) {
	}

	public int deposit(int amt) {
		this.balance += amt;
		return this.balance;
	}

	@Override
	public String toString() {
		return "Account{"
			+ "balance=" + balance
			+ '}';
	}
}
