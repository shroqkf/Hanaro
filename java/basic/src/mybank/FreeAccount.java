package mybank;

public class FreeAccount extends Account implements WithDrawable {
	public FreeAccount(int balance) {
		super(balance);
	}

	@Override
	public int withdraw(int amt) {
		this.balance -= amt;
		return this.balance;
	}
}
