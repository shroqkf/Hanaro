package mybank;

public class MyBank {
	// private AppAccount[] accounts = ;

	public static void main(String[] args) {

		Account[] accounts = {
			new FreeAccount(10000),
			new SavingAccount(10000),
			new LoanAccount(1000000),
		};

		FreeAccount fAcc = new FreeAccount(10000);
		AppAccount<FreeAccount> appAccount = new AppAccount<>(fAcc);

		AppAccount<?>[] appAccounts = new AppAccount[accounts.length];
		for (int i = 0; i < accounts.length; i++) {
			appAccounts[i] = new AppAccount<>(accounts[i]);
		}

		for (AppAccount<?> aacc : appAccounts) {
			System.out.println("aacc = " + aacc);
			int balance = aacc.deposit(1000);
			System.out.println("depo.balance = " + balance);
			try {
				System.out.println("with.balance = " + aacc.withdraw(2000));
			} catch (IllegalStateException ise) {
				ise.printStackTrace(System.err);
			}
		}
	}
}
