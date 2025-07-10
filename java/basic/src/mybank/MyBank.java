package mybank;

public class MyBank {
	// private AppAccount[] accounts = ;

	public static void main(String[] args) {

		Account[] accounts = {
			new FreeAccount(10000),
			new SavingAccount(10000),
			new FreeAccount(1000000)
		};

		FreeAccount fAcc = new FreeAccount(10000);
		AppAccount<FreeAccount> appAccount = new AppAccount<>(fAcc);

	}
}
