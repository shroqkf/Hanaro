package ex;

import java.text.DecimalFormat;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.StringTokenizer;

public class StringPlay {
	public static void main(String[] args) {
		String s = "Hello Senior Coding~ Coding";

		String s1 = s.concat(":concat");
		System.out.println("s1 = " + s1);
		String s2 = s + ":concat";
		System.out.println("s2 = " + s2);

		StringBuffer sb = new StringBuffer();
		sb.append("ABC");
		sb.append("EFG");
		System.out.println(sb.toString());

		String query = "abc=123&efg=456&age=10";
		StringTokenizer st = new StringTokenizer(query, "&=");
		while (st.hasMoreElements()) {
			System.out.println(st.nextToken());
		}

		double mr = Math.random();
		System.out.println("mr = " + mr);

		Random r = new Random();
		System.out.println(r.nextInt(5) + 1);

		Format df = new DecimalFormat("#,###.0");
		String result = df.format(12345678.19);
		System.out.println("result = " + result);

		Format sdf = new SimpleDateFormat("yyyy-MM-dd (E) K:mm:ss.S a [D]");
		System.out.println(sdf.format(new Date()));

		// long startTime = System.currentTimeMillis();
		// // String x = "";
		// StringBuilder sb1 = new StringBuilder(20000);
		// for (int i = 0; i < 100000; i++) {
		// 	// x += "hahaha";
		// 	sb1.append("hahaha");
		// }
		// System.out.println(System.currentTimeMillis() - startTime);
	}
}
