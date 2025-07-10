package oopex;

public class Triangle extends Shape implements GeometricObject {
	private final double base;
	private final double height;

	public Triangle(double base, double height) {
		this.base = base;
		this.height = height;
	}

	@Override
	double calcArea() {
		return base * height / 2;
	}

	@Override
	public double calcPerimeter() {
		double hypo = Math.pow(base / 2, 2) + Math.pow(height, 2);
		return Math.sqrt(hypo);
	}

	@Override
	public String toString() {
		return "Triangle{"
			+ "base=" + base
			+ ", height=" + height
			+ '}';
	}
}
