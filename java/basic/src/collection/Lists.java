package collection;

import java.util.ArrayList;
import java.util.List;

public class Lists {
	public static void main(String[] args) {
		List<String> al = new ArrayList<>();
		al.add("Hello");
		al.add("Hi");
		al.add("Java");
		al.add("사과");

		System.out.println(al);

		al.clear();
		System.out.println(al);
	}
}
