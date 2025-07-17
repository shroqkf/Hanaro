package ex;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class FileFiles {
	public static void main(String[] args) throws IOException {
		File file = new File("./tmp/system.ini");
		String res = file.isFile() ? "파일" : "디렉터리";
		System.out.println("res = " + res);

		// rename file
		boolean b = false;
		if (file.exists())
			b = file.renameTo(new File("./tmp/s.ini"));
		else
			b = new File("./tmp/s.ini").renameTo(file);
		System.out.println("b = " + b);

		long startTime = System.currentTimeMillis();
		// copy by using Files
		Path sourceFile = Path.of("./tmp/tmp.txt");
		Path targetFile = Path.of("./tmp/tmp2.txt");
		Files.copy(sourceFile, targetFile, StandardCopyOption.REPLACE_EXISTING);
		System.out.println(System.currentTimeMillis() - startTime);
	}
}
