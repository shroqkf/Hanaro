package oop;

public class Student extends Person {
	private String program;
	private int year;
	private double fee;

	public Student(String name, String addr, String program, int year, double fee) {
		super(name, addr);
		this.program = program;
		this.year = year;
		this.fee = fee;
	}

	public static void method(Person p) {
		try {
			Student stu = (Student)p;
		} catch (ClassCastException e) {
			System.err.println(e.getMessage());
		}
		System.out.println("DownCasting!!");
	}

	public static void main(String[] args) {
		Person p1 = new Person("Hong", "Seoul");
		Person p2 = new Student("Kim", "Pusan", "xx", 2025, 2000);
		Staff s1 = new Staff("xx", "xx", "xx", 500);
		Student.method(p1);
		Student.method(p2);
	}

	public String getProgram() {
		return program;
	}

	public void setProgram(String program) {
		this.program = program;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public double getFee() {
		return fee;
	}

	public void setFee(double fee) {
		this.fee = fee;
	}

	@Override
	public String toString() {
		return "Student["
			+ super.toString()
			+ ", program='" + program + '\''
			+ ", year=" + year
			+ ", fee=" + fee
			+ ']';
	}
}
