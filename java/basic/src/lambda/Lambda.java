package lambda;

import java.util.ArrayList;
import java.util.List;

@FunctionalInterface
interface MyPredicate<T> {
	boolean test(T t);
}

@FunctionalInterface
interface MyFunction<T, R> {
	R apply(T t);
}

@FunctionalInterface
interface MyReducer<E, R> {
	R reduce(R acc, E e);
}

public class Lambda {
	static List<Integer> filter(List<Integer> list, MyPredicate<Integer> predicate) {
		List<Integer> results = new ArrayList<>();
		for (int e : list) {
			if (predicate.test(e))
				results.add(e);
		}

		return results;
	}

	static List<Integer> map(List<Integer> list, MyFunction<Integer, Integer> function) {
		List<Integer> results = new ArrayList<>();
		for (int e : list)
			results.add(function.apply(e));

		return results;
	}

	static Integer find(List<Integer> list, MyPredicate<Integer> predicate) {
		for (int e : list) {
			if (predicate.test(e))
				return e;
		}

		return -1;
	}

	static Integer reducer(List<Integer> list, Integer initValue, MyReducer<Integer, Integer> reducer) {
		Integer result = initValue;
		for (Integer e : list) {
			result = reducer.reduce(result, e);
		}

		return result;
	}

	public static void main(String[] args) {
		List<Integer> numbers = List.of(1, 2, 3, 4, 5);
		List<Integer> evens = filter(numbers, value -> value % 2 == 0);

		System.out.println("evens = " + evens);
		List<Integer> squares = map(numbers, value -> value * value);
		System.out.println("squares = " + squares);
		Integer bigger3 = find(numbers, value -> value > 3);
		System.out.println("bigger3 = " + bigger3);

		int sum = reducer(numbers, 0, Integer::sum);
		int sum2 = reducer(numbers, 1, Integer::sum);
		System.out.println("sum = " + sum + ", " + sum2);
	}
}
