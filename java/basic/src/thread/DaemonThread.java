package thread;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DaemonThread extends Thread {

	public static void main(String[] args) {
		System.out.println("Thread.currentThread().getName() = " + Thread.currentThread().getName());

		DaemonThread dt = new DaemonThread();
		// dt.setDaemon(true);
		dt.start();

		System.out.println("Main thread ended!!");
	}

	@Override
	public void run() {
		System.out.println("DaemonThread started!!");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
		System.out.println("DaemonThread ended!!");
	}
}
