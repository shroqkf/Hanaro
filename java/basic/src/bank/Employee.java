package bank;

import java.util.Scanner;

public class Employee {
	private final int id;
	private final String name;
	private int salary;

	public Employee(int id, String name, int salary) {
		this.id = id;
		this.name = name;
		this.salary = salary;
	}

	public static void main(String[] args) {
		Employee[] emps = new Employee[3];
		Scanner scanner = new Scanner(System.in);

		int idx = 0;
		while (idx < emps.length) {
			System.out.print("id name salary> ");
			String inputStr = scanner.nextLine();
			String[] data = inputStr.split("\\s+");
			if (data.length != 3) {
				System.out.println("id name salary 순으로 입력하세요!");
				continue;
			}
			int id = Integer.parseInt(data[0]);
			int salary = Integer.parseInt(data[2]);
			emps[idx++] = new Employee(id, data[1], salary);
		}

		for (Employee emp : emps) {
			System.out.printf("%s의 연봉은 %,d원, 인상분은 %,d원%n", emp, emp.getAnnualSalary(),
				emp.raiseSalary(emp.getId() * 10));
		}
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	public int getAnnualSalary() {
		return this.salary * 12;
	}

	public int raiseSalary(int percent) {
		return this.salary * percent / 100;
	}

	@Override
	public String toString() {
		return "Employee["
			+ "id=" + id
			+ ", name='" + name + '\''
			+ ", salary=" + salary
			+ ']';
	}
}
