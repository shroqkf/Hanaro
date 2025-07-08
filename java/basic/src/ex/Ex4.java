package ex;

import java.util.Scanner;

public class Ex4 {
	public static void scoreToGrade(int score) {
		char grade = switch (score / 10) {
			case 10, 9 -> 'A';
			case 8 -> 'B';
			case 7 -> 'C';
			default -> 'F';
		};
		System.out.println(grade);
	}

	// public static void gradeToMessage()
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.println("Score/grade?");
		// scoreToGrade(scanner.nextInt());
		String msg = switch (scanner.next()) {
			case "A", "B" -> "Good";
			case "C", "D" -> "So so";
			default -> "See u again";
		};
		System.out.println(msg);
	}
}
