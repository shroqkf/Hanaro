package book;

public class Annotation {
	public static void main(String[] args) {
		Class<MyBook> myBookClass = MyBook.class;
		// myBookClass.getAnnotations()
		if (myBookClass.isAnnotationPresent(Book.class)) {
			Book bookAnnotation = myBookClass.getAnnotation(Book.class);
			System.out.println("bookAnnotation = " + bookAnnotation);
		}

	}
}
