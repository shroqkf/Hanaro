public class Ex5 {
	public static void main(String[] args) {
		short dan = 11;
		while (dan <= 19) {
			System.out.printf("%n%6d단%n", dan);
			for (short i = 1; i <= 9; i++) {
				System.out.printf("%2d x %d = %3d%n", dan, i, dan * i);
			}
			dan++;
		}

		String str = "   Hello World   ";
		String result = str.trim();
		System.out.println("'" + result + "'");    // 'Hello World'
		String str2 = "\u2000\u2001  Hello World  \u2002\u2003";
		System.out.println(":" + str2 + ":");
		System.out.println("trim(): '" + str2.trim() + "'");     // 유니코드 공백 제거 안됨!
		System.out.println("strip(): '" + str2.strip() + "'");   // 모든 공백 제거됨

		char s = 33;
		System.out.println(":" + s + ":");

		String s1 = new String("Abcdefg");
		System.out.println(s1.replace("cde", "CDE"));
	}
}
