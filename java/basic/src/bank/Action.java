package bank;

public enum Action {
	입금("+") {
		@Override
		public void banking(Account account, int amt) {
			account.deposit(amt);
		}
	},
	출금("-") {
		@Override
		public void banking(Account account, int amt) {
			account.withdraw(amt);
		}
	},
	송금("^") {
		@Override
		public void banking(Account account, int amt) {
			account.transferTo(amt);
		}
	},
	조회("*") {
		@Override
		public void banking(Account account, int amt) {
			account.display();
		}
	},
	종료("Q") {
		@Override
		public void banking(Account account, int amt) {
			System.out.println("작업이 종료되었습니다!");
		}
	};

	private final String cmd;

	Action(String cmd) {
		this.cmd = cmd;
	}

	public boolean isMe(String cmd) {
		return this.cmd.equals(cmd);
	}

	public abstract void banking(Account account, int amt);

	@Override
	public String toString() {
		return String.format("%s(%s)", this.name(), this.cmd);
	}
}
