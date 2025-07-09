package oopEx;

public class Circle extends Shape implements GeomericObject {
	protected double radius;

	public Circle(double radius) {
		this.radius = radius;
	}

	@Override
	double calArea() {
		return this.radius * this.radius * Math.PI;
	}

	@Override
	public double calcPerimeter() {
		return this.radius * Math.PI * 2;
	}

	@Override
	public String toString() {
		return "Circle{"
			+ "radius=" + radius
			+ '}';
	}

}
