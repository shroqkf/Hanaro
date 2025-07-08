package bank;

import java.util.Arrays;
import java.util.Scanner;

public class Account {
	static int staticValue = 0;
	private String accountNo;
	private String name;
	private int balance;

	public Account() {
	}

	public Account(String accountNo, String name) {
		this.accountNo = accountNo;
		this.name = name;
	}

	public Account(String accountNo, String name, int balance) {
		this(accountNo, name);
		this.balance = balance;
	}

	public static void printStatic() {
		System.out.println("printStatic>>" + Account.staticValue);
	}

	public static Account findByAccountNo(Account[] accounts, String accountNo) {
		Account account = null;
		for (Account acc : accounts) {
			if (acc.getAccountNo().equals(accountNo)) {
				account = acc;
			}
		}

		return account;
	}

	public static void main(String[] args) {
		Account[] accounts = {
			new Account().insert("1111", "Conan", 30000),
			new Account("2222", "Rose").deposit(10000),
			new Account("3333", "Miran", 20000),
		};

		String accountsInfo = Arrays.toString(accounts)
			.replace(", Account", "\nAccount")
			.replace("[", "")
			.replace("]", "");

		Scanner scanner = new Scanner(System.in);
		while (true) {
			System.out.print("\n+: 입금, -: 출금, ^: 송금, Q/Enter: 종료> ");
			String action = scanner.nextLine();
			System.out.println("action = " + action);
			// System.out.println();
			if (action == null || action.isBlank() || "Q".equalsIgnoreCase(action)) {
				System.out.println("작업이 완료되었습니다.");
				break;
			}

			String actionText = switch (action) {
				case "+" -> "입금";
				case "-" -> "출금";
				case "^" -> "송금";
				default -> "조회";
			};

			System.out.println(actionText + "할 계좌를 선택하세요");
			System.out.println(accountsInfo);
			System.out.print("계좌번호> ");
			String accountNo = scanner.next();
			Account targetAccount = Account.findByAccountNo(accounts, accountNo);

			Account fromAccount = null;
			if ("^".equals(action)) {
				while (true) {
					System.out.print("출금할 계좌는> ");
					String acc = scanner.next();
					if (acc.equals(targetAccount.getAccountNo())) {
						System.out.println("송금할 계좌와 출금할 계좌가 같을 수 없습니다!");
					} else {
						fromAccount = findByAccountNo(accounts, acc);
						break;
					}
				}
			}

			System.out.print("얼마를 " + actionText + "하시겠어요? ");
			int amt = scanner.nextInt();

			switch (action) {
				case "+":
					targetAccount.deposit(amt);
					break;
				case "-":
					targetAccount.withdraw(amt);
					break;
				case "^":
					fromAccount.transferTo(targetAccount, amt);
				default:
					targetAccount.display();
			}
		}

	}

	public String getAccountNo() {
		return accountNo;
	}

	public Account insert(String accountNo, String name, int balance) {
		this.accountNo = accountNo;
		this.name = name;
		this.balance = balance;
		return this;
	}

	public Account deposit(int amt) {
		this.action(amt);
		return this;
	}

	public void withdraw(int amt) {
		this.withdraw(amt, "출금");
	}

	public void withdraw(int amt, String act) {
		if (amt > this.balance) {
			System.out.println(act + "액이 부족합니다!");
			return;
		}

		this.action(-amt);
	}

	public void transferTo(Account targetAccount, int amt) {
		this.withdraw(amt, "송금");
		targetAccount.deposit(amt);
		targetAccount.checkBalance();
	}

	private void action(int amt) {
		this.balance += amt;
		this.checkBalance();
	}

	private void checkBalance() {
		System.out.printf("%s님의 잔액은 %,d원 입니다.%n", this.name, this.balance);
	}

	void display() {
		System.out.println(this);
	}

	@Override
	public String toString() {
		return "Account{"
			+ "accountNo=" + accountNo
			+ ", name='" + name + '\''
			+ ", balance=" + balance
			+ '}';
	}

}
