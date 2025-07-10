package ex;

public class Gener<T> {
	private T t;

	public Gener() {
	}

	public Gener(T t) {
		this.t = t;
	}

	static <T extends Number> T pow(T t) {
		double squared = t.doubleValue() * t.doubleValue();

		if (t instanceof Integer) {
			return (T)Integer.valueOf((int)squared);
		}

		if (t instanceof Long) {
			return (T)Long.valueOf((long)squared);
		}

		if (t instanceof Double) {
			return (T)Double.valueOf(squared);
		}

		if (t instanceof Float) {
			return (T)Float.valueOf((float)squared);
		}

		return (T)Double.valueOf(squared);
	}

	public static void main(String[] args) {
		Gener<Integer> g1 = new Gener<Integer>(1);
		Gener<Integer> g2 = new Gener<>(2);
		Gener<String> g3 = new Gener<>("str");

		System.out.println(pow(5.0));
		System.out.println(pow(5L));

		// Generic array creation not allowed
		// Gener<Integer>[] gs = {g1, g2};

		// Raw type(: 쓰지말 것! 타입 안정성과 표현력 모두 상실!)
		Gener g4 = new Gener(); // Bad
		g4.setT(new Object());
		Gener<Object> g5 = new Gener<>(55); // Good
		System.out.printf("%s %s %s %s %s%n", g1, g2, g3, g4, g5);
	}

	public T getT() {
		return t;
	}

	public void setT(T t) {
		this.t = t;
	}
	// static <T extends Number> T pow(T t, Function<Double, T> converter) {
	// 	double value = t.doubleValue();
	// 	return converter.apply(value * value);
	// }

	@Override
	public String toString() {
		return "Gener{"
			+ "t=" + t
			+ '}';
	}
}
