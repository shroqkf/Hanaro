package annotation;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class PrintAnnotaionEx {
	public static void main(String[] args) throws InvocationTargetException, IllegalAccessException {
		for (Method m : Service.class.getDeclaredMethods()) {
			if (!m.isAnnotationPresent(PrintAnnotation.class))
				continue;

			PrintAnnotation pa = m.getAnnotation(PrintAnnotation.class);
			printLine(pa);

			m.invoke(new Service());
			printLine(pa);
		}
	}

	private static void printLine(PrintAnnotation pa) {
		System.out.println(pa.value().repeat(pa.number()));
	}
}
