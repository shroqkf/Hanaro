package oopex;

public class AppShape<T extends Shape & GeometricObject> {
	// public class AppShape<T extends Shape> {
	private final T shape;

	public AppShape(T shape) {
		this.shape = shape;
	}

	public static <R extends Resizable> void safeResize(R t, int percent) {
		t.resize(percent);
	}

	public static void safeResize2(Resizable t, int percent) {
		t.resize(percent);
	}
	// public double calcPerimeter() {
	// 	if (shape instanceof GeometricObject)
	// 		return ((GeometricObject)shape).calcPerimeter();
	//
	// 	throw new IllegalStateException("Cannot calcPerimeter!! " + getShapeName());
	// }

	public double calcArea() {
		return shape.calcArea();
	}

	public double calcPerimeter() {
		return shape.calcPerimeter();
	}

	public void resize(int percent) {
		if (shape instanceof Resizable)
			((Resizable)shape).resize(percent);
		else
			throw new IllegalStateException("Cannot resize::" + getShapeName());
	}

	T getShape() {
		return shape;
	}

	public void print() {
		System.out.printf("%s: %.1f의 둘레, %.1f의 넓이%n", getShapeName(), calcPerimeter(), calcArea());
	}

	@Override
	public String toString() {
		return "AppShape{" + getShapeName()
			+ "=" + shape
			+ '}';
	}

	private String getShapeName() {
		return shape.getClass().getSimpleName();
	}
}
