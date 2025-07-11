package ex;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Dictionary {

	public static void main(String[] args) throws IOException {
		Map<String, String> dictionary = new HashMap<>();
		dictionary.put("love", "사랑");
		dictionary.put("apple", "사과");
		dictionary.put("baby", "아기");

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		while (true) {
			System.out.print("찾고 싶은 단어는? ");
			String word = br.readLine();

			if (word == null || word.isBlank())
				break;

			String result = dictionary.get(word);
			if (result == null) {
				System.out.println("해당 단어는 등록되어 있지 않습니다. 다른 단어를 입력하세요!");
			} else {
				System.out.println(result);
			}
		}
	}
}
