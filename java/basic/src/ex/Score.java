package ex;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Score {
	public static void main(String[] args) throws IOException {
		List<Integer> scores = new ArrayList<>();
		// Scanner scan = new Scanner(System.in);
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		while (true) {
			System.out.print("점수를 입력하세요: ");
			try {
				int score = Integer.parseInt(br.readLine());
				if (score < 0)
					break;
				scores.add(score);
			} catch (NumberFormatException e) {
				System.out.println("정수를 입력하세요!");
			}

		}

		System.out.println("학생들의 성적: " + scores);

		for (int i = 0; i < scores.size(); i++) {
			int score = scores.get(i);
			String grade = getGrade(score);
			System.out.printf("%d 학생의 성적은 %d점이며 학점은 %s이다\n", i, score, grade);
		}
	}

	static String getGrade(Integer score) {
		return switch (score / 10) {
			case 10, 9 -> "A";
			case 8 -> "B";
			case 7 -> "C";
			case 6 -> "D";
			default -> "F";
		};
	}
}
