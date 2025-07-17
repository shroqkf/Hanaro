package ex;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

public class ReaderWriter {
	public static void main(String[] args) {
		long startTime = System.currentTimeMillis();

		// pureRader();
		try (InputStreamReader in = new InputStreamReader(System.in);
			 FileWriter fout = new FileWriter("./tmp/out.ini")) {

			System.out.print("Input: ");
			int c;
			while ((c = in.read()) != '\n') {
				fout.write(c);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		System.out.printf("\nEllapseTime is %d%n", (System.currentTimeMillis() - startTime));
	}

	private static void pureRader() {
		try (FileReader in = new FileReader("./tmp/system.ini")) {
			int c;
			while ((c = in.read()) != -1) {
				System.out.print((char)c);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace(System.out);
		} catch (IOException e) {
			System.out.println("입출력 오류!");
		}
	}
}
