package lambda;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lambda.annotaions.IllegalAnnotationException;
import lambda.annotaions.In;
import lambda.annotaions.Max;
import lambda.annotaions.Min;
import lambda.annotaions.NotNull;

public class Reflects {
	public static void makeNotNullFields(Object obj) {
		for (Field f : obj.getClass().getDeclaredFields()) {
			try {
				f.setAccessible(true);
				if (f.get(obj) != null)
					continue;

				switch (f.getType().getSimpleName()) {
					case "String" -> f.set(obj, "");
					case "Boolean" -> f.set(obj, false);
					case "Long" -> f.set(obj, 0L);
					case "Double" -> f.set(obj, 0.0);
					default -> f.set(obj, 0);
				}
			} catch (IllegalAccessException e) {
				e.printStackTrace(System.out);
			}
		}
	}

	public static String[] vaidate(Object obj) throws IllegalAccessException {
		MessageCollector messageCollector = new MessageCollector();

		for (Field f : obj.getClass().getDeclaredFields()) {
			f.setAccessible(true);
			Object val = f.get(obj);
			String fname = f.getName();

			if (val == null && f.isAnnotationPresent(NotNull.class)) {
				NotNull notNull = f.getAnnotation(NotNull.class);
				messageCollector.addMessage(fname, notNull.value());
			}

			if (f.isAnnotationPresent(Min.class)) {
				Min min = f.getAnnotation(Min.class);
				var len = 0.0;
				if (f.getType() == String.class) {
					len = val == null ? 0 : ((String)val).length();
				} else {
					len = val == null ? 0 : (double)val;
				}

				if (len < min.value()) {
					messageCollector.addMessage(fname, min.msg().formatted(min.value()));
				}
			}

			if (f.isAnnotationPresent(Max.class)) {
				Max max = f.getAnnotation(Max.class);
				var len = 0.0;
				if (f.getType() == String.class) {
					len = val == null ? 0 : ((String)val).length();
				} else {
					len = val == null ? 0 : (double)val;
				}

				if (len > max.value()) {
					messageCollector.addMessage(fname, max.msg().formatted(max.value()));
				}
			}

			if (f.isAnnotationPresent(In.class)) {
				In in = f.getAnnotation(In.class);
				if (f.getType() != String.class)
					throw new IllegalAnnotationException("Only use In annotaion for String field!!");

				if (val == null || !Arrays.asList(in.value()).contains((String)val)) {
					messageCollector.addMessage(fname, in.msg().formatted(Arrays.toString(in.value())));
				}
			}
		}

		return messageCollector.toStringArray();
	}

}

class MessageCollector {
	Map<String, List<String>> collectedMessage = new HashMap<>();

	public void addMessage(String key, String message) {
		List<String> messages;
		if (collectedMessage.containsKey(key)) {
			messages = collectedMessage.get(key);
		} else {
			messages = new ArrayList<>();
			collectedMessage.put(key, messages);
		}
		messages.add(message);
	}

	public String[] toStringArray() {
		String[] results = new String[collectedMessage.size()];
		int idx = 0;
		for (Map.Entry<String, List<String>> entry : collectedMessage.entrySet()) {
			results[idx++] = entry.getKey() + ":" + entry.getValue();
		}

		return results;
	}
}
