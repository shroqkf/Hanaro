package ex;

import java.util.AbstractCollection;
import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import oop.Circle;

public class Maps {
	public static void main(String[] args) {
		// Map<String, Circle> mapCircles = new HashMap<>();
		Map<String, Circle> mapCircles = new TreeMap<>();
		mapCircles.put("C1", new Circle(25));
		mapCircles.put("C3", new Circle(50));
		mapCircles.put("C2", new Circle(5));

		System.out.println("mapCircles = " + mapCircles);

		Set<String> strings = mapCircles.keySet();
		System.out.println("strings = " + strings);

		Collection<Circle> values = mapCircles.values();
		System.out.println("values11 = " + values + ", " + (AbstractCollection<Circle>)values);

		Set<Map.Entry<String, Circle>> entries = mapCircles.entrySet();
		System.out.println(entries);

	}
}
