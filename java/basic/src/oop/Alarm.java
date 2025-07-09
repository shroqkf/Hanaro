package oop;

import java.awt.*;

public interface Alarm {
	public static void main(String[] args) {
		Alarm a = new SmartPhone();
		a.playMusic("비의 랩소디");
		a.beep();
		a.setTime("12:00");
	}

	void playMusic(String title);

	abstract public void beep();

	default void setTime(String time) {
		System.out.println("Set time to " + time);
	}

}

class SmartPhone implements Alarm {
	private String phoneNumber;

	void call() {
		System.out.println("Call to " + this.phoneNumber);
	}

	@Override
	public void playMusic(String title) {
		System.out.printf("[%s] 재생%n", title);
	}

	@Override
	public void beep() {
		for (int i = 0; i < 3; i++) {
			Toolkit.getDefaultToolkit().beep();
		}
	}

}
