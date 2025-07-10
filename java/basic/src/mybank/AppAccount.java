package mybank;

public class AppAccount<T extends Account> {
	private final T account;

	public AppAccount(T account) {
		this.account = account;
	}

	public boolean isWithdrawable() {
		return this.account instanceof WithDrawable;
	}

	public int deposit(int amt) {
		var benefit = (int)(amt * 0.1);
		return this.account.deposit(amt + benefit);
	}
}
