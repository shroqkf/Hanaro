package ex;

import java.util.Scanner;

public class Ex3 {
	final static int[] STIMMIES = {40, 60, 80, 100};
	final static int UNIT = 10_000;

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.println("가족 구성원 수는?");
		int famSize = scanner.nextInt();
		int stimmy;
		if (famSize < 4) {
			stimmy = STIMMIES[famSize - 1];
		} else {
			stimmy = STIMMIES[3];
		}
		System.out.printf("지원금: %,d원%n", stimmy * UNIT);
	}
}
