package bank;

public class Gen {
	static <T extends Number> T powx(T t) {
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

	static Integer pow(Integer i) {
		return i * i;
	}

	public static void main(String[] args) {
		System.out.println(powx(5));
		System.out.println(powx(15L));
		System.out.println(pow(15));
	}
}
