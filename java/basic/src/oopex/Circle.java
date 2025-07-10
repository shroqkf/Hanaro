package oopex;

import java.util.Objects;

public class Circle extends Shape implements GeometricObject {
	protected double radius;

	public Circle(double radius) {
		this.radius = radius;
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

	@Override
	double calcArea() {
		return this.radius * this.radius * Math.PI;
	}

	@Override
	public boolean equals(Object o) {
		if (o == null || getClass() != o.getClass())
			return false;
		Circle circle = (Circle)o;
		return Double.compare(radius, circle.radius) == 0;
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(radius);
	}
}
