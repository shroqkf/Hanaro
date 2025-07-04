import java.util.Scanner;

public class Ex1 {
	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		System.out.print("당신의 이름을 입력하세요-->> ");
		String name = scan.next();
		System.out.print("당신의 주소를 입력하세요-->> ");
		scan.nextLine();
		String address = scan.nextLine();
		System.out.print("당신의 나이를 입력하세요-->> ");
		short age = scan.nextShort();
		System.out.print("당신의 키를 입력하세요-->> ");
		double height = scan.nextDouble();

		System.out.println("이름: " + name);
		System.out.println("주소: " + address);
		System.out.println("나이: " + age);
		System.out.println("키: " + height);
	}
}