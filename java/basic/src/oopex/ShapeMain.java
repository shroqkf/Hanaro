package oopex;

public class ShapeMain {
	public static void main(String[] args) {
		Circle circle = new Circle(3);
		ResizableCircle resizableCircle = new ResizableCircle(7);
		AppShape<Circle> ac = new AppShape<>(circle);

		// AppShape.safeResize(circle, 10);
		AppShape.safeResize(resizableCircle, 10);
		// AppShape.safeResize2(circle, 10);
		AppShape.safeResize2(resizableCircle, 10);

		AppShape<?>[] shapes = {
			new AppShape<>(circle),
			new AppShape<>(new Rectangle(3, 4)),
			new AppShape<>(resizableCircle),
			new AppShape<>(new ResizableRectangle(7, 8)),
			new AppShape<>(new Triangle(4, 3))
		};

		for (AppShape<?> shape : shapes) {
			shape.print();
			try {
				shape.resize(10);
			} catch (IllegalStateException e) {
				System.err.println(e.getMessage());
			}
		}
	}
}
