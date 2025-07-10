package mybank;

public class LoanAccount extends Account {
	public LoanAccount(int balance) {
		super(-balance);
	}
}
