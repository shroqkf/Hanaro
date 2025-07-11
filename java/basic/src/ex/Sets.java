package ex;

import java.util.HashSet;
import java.util.Set;

public class Sets {
	public static void main(String args[]) {
		Set<Integer> set1 = new HashSet<>();
		set1.add(1100);
		set1.add(22);
		set1.add(53);
		set1.add(580);
		System.out.println("set1 = " + set1);

		Set<Integer> set2 = new HashSet<>();
		set2.add(1100);
		set2.add(22);
		set2.add(53);
		set2.add(580);
		System.out.println("set2 = " + set2);
	}
}
