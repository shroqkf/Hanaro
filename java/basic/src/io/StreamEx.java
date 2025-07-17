package io;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;

public class StreamEx {
	public static final String SRC_FILE = "./tmp.txt";
	public static final String DEST_FILE = "./tmp2.txt";

	public static void main(String[] args) throws IOException {
		// sysout();
		// bufFos();
		// sysinout();

		long startTime = System.currentTimeMillis();
		// oneByte();
		// bufByte();
		buffed();
		System.out.printf("EllapseTime is %d%n", (System.currentTimeMillis() - startTime));
	}

	private static void buffed() {
		try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(SRC_FILE));
			 BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(DEST_FILE))) {
			while (bis.available() > 0) {
				bos.write(bis.read());
			}
		} catch (IOException e) {
			e.printStackTrace(System.out);
		}
	}

	private static void bufByte() {
		try (FileInputStream fis = new FileInputStream(SRC_FILE);
			 FileOutputStream fos = new FileOutputStream(DEST_FILE)) {
			int c = -1;
			byte[] buf = new byte[512];
			while ((c = fis.read(buf)) != -1) {
				fos.write(buf, 0, c);
				fos.write('\n');
			}
		} catch (IOException e) {
			e.printStackTrace(System.out);
		}
	}

	private static void oneByte() {
		try (FileInputStream fis = new FileInputStream(SRC_FILE);
			 FileOutputStream fos = new FileOutputStream(DEST_FILE)) {
			int c = -1;
			while ((c = fis.read()) != -1) {
				fos.write(c);
			}
		} catch (IOException e) {
			e.printStackTrace(System.out);
		}
	}

	private static void sysinout() throws IOException {
		int b = 0;
		int len = 0;
		int[] buf = new int[100];
		System.out.println("---input stream---");
		while ((b = System.in.read()) != '\n') {
			System.out.printf("%c %d%n", (char)b, b);
			buf[len++] = b;
		}

		System.out.println("---output stream---");
		for (int i = 0; i < len; i++) {
			System.out.write(buf[i]);
		}
		System.out.close();
	}

	private static void bufFos() {
		// FileOutputStream fos = new FileOutputStream("./tmp.txt");
		// for (int i = 0; i < 1024 * 1024; i++) {
		// 	fos.write(65);
		// }
		// fos.close();
		int BS = 512;
		long start = System.currentTimeMillis();
		try (FileOutputStream fos = new FileOutputStream(SRC_FILE)) {
			byte[] buf = new byte[BS];
			int idx = 0;
			for (int i = 0; i < 2 * 1024 * 1024; i++) {
				buf[idx++] = 65;
				if (idx == BS) {
					fos.write(buf);
					idx = 0;
				}
			}

			// flush
			if (idx > 0) {
				fos.write(buf, 0, idx);
			}
		} catch (Exception e) {
			e.printStackTrace(System.out);
		}
		System.out.println(System.currentTimeMillis() - start);
	}

	private static void sysout() throws IOException {
		byte[] buf = new byte[] {97, 98, 99};
		PrintStream out = System.out;
		out.println("PrintLN");
		out.write(65);
		out.write(1024);
		out.write('\n');
		out.write(buf);
		out.write('\n');
		out.write('!');
		out.close();
	}
}
