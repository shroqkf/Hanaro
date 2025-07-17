package vote;

public class VoteEx {
	public static void main(String[] args) {
		Runnable region1 = new VoteRunnable("제1지역구");
		Runnable region2 = new VoteRunnable("제2지역구");
		Runnable region3 = new VoteRunnable("제3지역구");

		Thread thread1 = new Thread(region1);
		Thread thread2 = new Thread(region2);
		Thread thread3 = new Thread(region3);

		thread1.start();
		thread2.start();
		thread3.start();
	}
}
