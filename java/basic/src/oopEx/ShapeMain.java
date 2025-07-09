package oopEx;

public class ShapeMain {
	public static void main(String[] args) {
		Shape[] shapes = {new Circle(3), new Rectangle(3, 4), new ResizableCircle(7), new ResizableRectangle(7, 8)};

		for (Shape shape : shapes) {
			double perimeter = ((GeometricObject)shape).calcPerimeter();
			System.out.printf("%n%s의 둘레는 %,.1f, 면적은 %,.1f%n", shape, perimeter, shape.calcArea());

			int resizeRate = 10;
			if (shape instanceof ResizableCircle || shape instanceof ResizableRectangle) {
				System.out.printf("크기를 %d%% 변경 후%n", resizeRate);
				Resizable resizableShape = (Resizable)shape;
				resizableShape.resize(resizeRate);
				double resizablePerimeter = ((GeometricObject)resizableShape).calcPerimeter();
				System.out.printf("RESIZE: %s의 둘레는 %,.1f, 면적은 %,.1f%n", shape, resizablePerimeter, shape.calcArea());
			}

		}
	}
}
