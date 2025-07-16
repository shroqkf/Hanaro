package thread;

public class ThreadEx {
	public static void main(String[] args) {
		Thread t = new Thread(new TimerRunnable());
		t.start();

		Thread t2 = new Thread(new Runnable() {
			@Override
			public void run() {
				for (int i = 0; i < 5; i++) {
					System.out.println(i);
				}
			}
		});

		Thread t3 = new Thread(() -> {
			for (int i = 0; i < 5; i++) {
				System.out.println(i);
			}
		});
	}
}
