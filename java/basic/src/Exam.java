public class Exam {
	public static void main(String[] args) {
		System.out.println("args=" + args.length);
		int midScore = 100;
		int finalScore = 100;
		int sum = midScore + finalScore;
		System.out.println("midScore=" + midScore);
		System.out.printf("finalScore=%d%n", finalScore);
		System.out.printf("mid: %d + final: %d = %d%n", midScore, finalScore, sum);
	}
}
