package ex;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Book implements Comparable<Book> {
	public int id;
	public String title;
	public String author;
	public int quantity;

	public Book(int id, String title, String author, int quantity) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.quantity = quantity;
	}

	static void wordCount() {
		Map<String, Integer> m = new HashMap<String, Integer>();
		String[] sample = {"to", "be", "or", "not", "to", "be", "is", "a", "problem"};

		for (String a : sample) {
			if (!m.containsKey(a)) {
				m.put(a, 1);
				continue;
			}

			m.put(a, m.get(a) + 1);
		}
		System.out.println(m.size() + " 단어가 있습니다.");
		System.out.println(m.containsKey("to"));
		if (Math.random() > 0.5)
			m.clear();
		System.out.println(m.isEmpty());
		System.out.println(m);
	}

	public static void main(String[] args) {
		Map<Integer, Book> map = new HashMap<>();
		map.put(100, new Book(100, "어린왕자", "쌩떽쥐베리", 5));
		map.put(50, new Book(200, "행복한왕자", "오스카와일드", 8));
		map.put(5, new Book(300, "셜록홈즈", "코난도일", 10));

		for (Map.Entry<Integer, Book> entry : map.entrySet()) {
			// int key = entry.getKey();
			Book val = entry.getValue();
			System.out.println(val);
		}

		System.out.println("map = " + map);

		Set<Integer> keys = map.keySet();
		List<Integer> keyList = new ArrayList<>(keys);
		Collections.sort(keyList);
		System.out.println("keyList = " + keyList);

		Collection<Book> values = map.values();
		List<Book> bookList = new ArrayList<>(values);
		Collections.sort(bookList);
		System.out.println("bookList = " + bookList);
		Collections.reverse(bookList);
		System.out.println("bookList = " + bookList);
	}

	@Override
	public String toString() {
		return "Book{"
			+ "id=" + id
			+ ", title='" + title + '\''
			+ ", author='" + author + '\''
			+ ", quantity=" + quantity
			+ '}';
	}

	@Override
	public int compareTo(Book otherBook) {
		return Integer.compare(id, otherBook.id);
	}

}
