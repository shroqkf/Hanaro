package bank;

import java.util.Arrays;
import java.util.Scanner;

public class Account {
	private String accountNo;
	private String name;
	private int balance;
	private Account targetAccount;

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
		final Account[] accounts = {
			new Account().insert("1111", "Conan", 30000),
			new Account("2222", "Rose").deposit(10000),
			new Account("3333", "Miran", 20000),
		};

		String accountsInfo = Arrays.toString(accounts)
			.replace(", Account", "\nAccount")
			.replaceAll("[\\[\\]]", "");
		// System.out.println(accountsInfo);

		Scanner scanner = new Scanner(System.in);
		while (true) {
			System.out.println();
			System.out.print(Arrays.toString(Action.values()));
			Action action = Action.종료;
			String cmd = scanner.next();
			for (Action _act : Action.values()) {
				if (_act.isMe(cmd)) {
					action = _act;
				}
			}

			if (action == Action.종료)
				break;

			System.out.println(action + "할 계좌를 선택하세요");
			System.out.println(accountsInfo);
			System.out.print("계좌번호> ");
			String accountNo = scanner.next();
			Account targetAccount = Account.findByAccountNo(accounts, accountNo);

			if (action == Action.송금) {
				while (true) {
					System.out.print("출금할 계좌는> ");
					String acc = scanner.next();
					if (acc.equals(targetAccount.getAccountNo())) {
						System.out.println("송금할 계좌와 출금할 계좌가 같을 수 없습니다!");
					} else {
						targetAccount.setTargetAccount(findByAccountNo(accounts, acc));
						break;
					}
				}
			}

			if (action == Action.조회) {
				action.banking(targetAccount, 0);
			} else {
				System.out.print("얼마를 " + action + "하시겠어요? ");
				action.banking(targetAccount, scanner.nextInt());
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
		this.withdraw(amt, Action.출금);
	}

	public void withdraw(int amt, Action act) {
		if (amt > this.balance) {
			System.out.println(act + "액이 부족합니다!");
			return;
		}

		this.action(-amt);
	}

	public void setTargetAccount(Account targetAccount) {
		this.targetAccount = targetAccount;
	}

	public void transferTo(int amt) {
		this.transferTo(this.targetAccount, amt);
	}

	public void transferTo(Account targetAccount, int amt) {
		this.withdraw(amt, Action.송금);
		targetAccount.deposit(amt);
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
