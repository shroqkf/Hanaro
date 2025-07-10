package oopex;

public class NumberUtils {
	public static <T extends Number> T pow(T t) {
		double squared = t.doubleValue() * t.doubleValue();

		return switch (t) {
			case Integer i -> (T)Integer.valueOf((int)squared);
			case Long l -> (T)Long.valueOf((long)squared);
			case Float v -> (T)Float.valueOf((float)squared);
			default -> (T)Double.valueOf(squared);
		};

	}
}
