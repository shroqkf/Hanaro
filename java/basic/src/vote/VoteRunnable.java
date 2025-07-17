package vote;

import java.util.Random;

public class VoteRunnable implements Runnable {
	private final Random random = new Random();
	private String name;
	private int voteRate = 0;

	public VoteRunnable(String name) {
		this.name = name;
	}

	@Override
	public void run() {
		while (voteRate < 100) {
			int increment = random.nextInt(5) + 1;

			if (voteRate + increment > 100) {
				increment = 100 - voteRate;
			}

			voteRate += increment;

			System.out.printf("%s 개표율 : %d%% (개표 증가율 : %d%%) %s%n",
				name, voteRate, increment, "*".repeat(voteRate));

			try {
				Thread.sleep(random.nextInt(1000));
			} catch (InterruptedException e) {
				System.out.println(name + " 개표 스레드 오류 발생");
			}
		}
	}

}
