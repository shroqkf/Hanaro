package ex;

import java.util.Scanner;

public class Ex2 {
	static final int MIN_HEIGHT = 125;
	static final int MAX_HEIGHT = 165;

	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		System.out.print("어린이의 신장을 입력하세요: ");
		int height1 = scan.nextInt();
		System.out.println(height1 >= MIN_HEIGHT);

		System.out.print("어린이의 신장을 입력하세요: ");
		int height2 = scan.nextInt();
		System.out.println(height2 >= MIN_HEIGHT && height2 < MAX_HEIGHT);
	}
}
