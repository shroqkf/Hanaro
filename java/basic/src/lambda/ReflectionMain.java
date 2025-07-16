package lambda;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;

public class ReflectionMain {
	public static void main(String[] args) {
		Reflection inst = new Reflection(1, "Hong");
		System.out.println("inst.getName() = " + inst.getName());
		Class<? extends Parent> aClass = inst.getClass();
		System.out.println("aClass = " + aClass.getName() + ", " + aClass.getSimpleName());

		try {
			Class<?> rc2 = Class.forName("lambda.Reflection");
			System.out.println("rc2 = " + rc2);
		} catch (ClassNotFoundException e) {
			e.printStackTrace(System.out);
		}

		Class<Reflection> rc = Reflection.class;
		System.out.println("rc = " + rc);
		// rc.getDeclaredConstructor().newInstance();
		try {
			Parent rinst = rc.getDeclaredConstructor(int.class, String.class).newInstance(2, "Kim");
			System.out.println("rinst = " + rinst);
			System.out.println("rc.getMethods() = " + Arrays.toString(rc.getMethods()));
			System.out.println("------------------");
			System.out.println("rc.getDeclaredMethods() = " + Arrays.toString(rc.getDeclaredMethods()));

			Method getName = rc.getDeclaredMethod("getName");
			System.out.println("getName.invoke(rinst) = " + getName.invoke(rinst));

			System.out.println("rc.getDeclaredFields() = " + Arrays.toString(rc.getDeclaredFields()));

			Field nameField = rc.getDeclaredField("name");
			nameField.setAccessible(true);

			System.out.println("nameField = " + nameField);
			nameField.set(rinst, "Lee");
			System.out.println("nameField.get(rinst) = " + nameField.get(rinst));
		} catch (InstantiationException
				 | IllegalAccessException
				 | InvocationTargetException
				 | NoSuchMethodException | NoSuchFieldException e) {
			e.printStackTrace(System.out);
		}

	}
}
