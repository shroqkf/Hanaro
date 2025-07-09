package oopEx;

public class Rectangle extends Shape implements GeomericObject {
	protected double width;
	protected double height;

	public Rectangle(double width, double height) {
		this.width = width;
		this.height = height;
	}

	@Override
	double calArea() {
		return this.width * this.height;
	}

	@Override
	public double calcPerimeter() {
		return (this.width + this.height) * 2;
	}

	@Override
	public String toString() {
		return "Rectangle{"
			+ "width=" + width
			+ ", height=" + height
			+ '}';
	}

}
