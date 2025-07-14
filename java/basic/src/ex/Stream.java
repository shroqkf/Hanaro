package ex;

import java.util.Comparator;
import java.util.List;
import java.util.stream.IntStream;

public class Stream {
	public static void main(String[] args) {
		List<Integer> list = List.of(10, 6, 3, 3, 5, 4, 2, 7, 7, 9, 8, 10);

		long evenCount = list.stream().filter(n -> n % 2 == 0).count();
		System.out.println("짝수의 개수 = " + evenCount);

		List<Integer> squared = list.stream().map(n -> n * n).toList();
		System.out.println("각 숫자를 제곱 = " + squared);

		List<Integer> noDistinct = list.stream().distinct().toList();
		System.out.println("중복 제거 = " + noDistinct);

		List<Integer> sort = list.stream().sorted().toList();
		System.out.println("기본 정렬 = " + sort);

		List<Integer> reverseSort = list.stream().sorted(Comparator.reverseOrder()).toList();
		System.out.println("역순(내림차순) 정렬 = " + reverseSort);

		List<Integer> five = list.stream().limit(5).toList();
		System.out.println("처음 5개만 출력 = " + five);

		List<Integer> jumpFive = list.stream().skip(5).toList();
		System.out.println("처음 5개 건너뛰고 출력 = " + jumpFive);

		List<Integer> overFive = list.stream().dropWhile(n -> n <= 5).toList();
		System.out.println("값이 5보다 큰 것만 출력 = " + overFive);

		IntStream rangeSum = IntStream.rangeClosed(1, 10);
		System.out.println("1~10의 합계 = " + rangeSum.sum());

		IntStream rangeAvg = IntStream.rangeClosed(1, 10);
		System.out.println("1~10의 평균 = " + rangeAvg.average().orElse(0));
	}
}
