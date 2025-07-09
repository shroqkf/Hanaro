package oop;

public interface Drawable {
	void draw();
}

class Rectangle implements Drawable {
	@Override
	public void draw() {
		System.out.println("Draw Rectangle");
	}
}

class Triangle implements Drawable {
	@Override
	public void draw() {
		System.out.println("Draw Triangle");
	}
}

class DrawEx {
	static void drawAnything(Drawable shape) {
		shape.draw();
	}

	public static void main(String[] args) {
		Drawable d = new Triangle();
		d.draw();

		Drawable[] shapes = {new Triangle(), new Rectangle()};
		for (Drawable shape : shapes)
			drawAnything(shape);
	}
}
