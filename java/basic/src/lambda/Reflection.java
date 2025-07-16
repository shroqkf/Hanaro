package lambda;

import java.util.Arrays;

import lambda.annotaions.In;
import lambda.annotaions.Max;
import lambda.annotaions.Min;
import lambda.annotaions.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Reflection extends Parent {
	@Min(value = 3, msg = "3글자 이상 입력하세요!")
	@In({"Hong", "Kim", "Lee", "Choi"})
	private String name;

	@NotNull()
	@Min(value = 5, msg = "5보다는 커야합니다!")
	@Max(value = 10, msg = "10보다 작아야합니다!")
	private Integer deptId;

	@NotNull("필수값이에요")
	@Min(3)
	@Max(15)
	private Double addr;
	private Boolean isGuest;

	public Reflection(int id, String name) {
		super(id);
		this.name = name;
	}

	public static void main(String[] args) throws IllegalAccessException {
		Reflection r = new Reflection(5, null);
		System.out.println(Arrays.toString(Reflects.vaidate(r)));
		// System.out.println("r-before = " + r);
		Reflects.makeNotNullFields(r);
		// System.out.println("r-after = " + r);
	}
}

@AllArgsConstructor
@NoArgsConstructor
@ToString
class Parent {
	private int id;
}
