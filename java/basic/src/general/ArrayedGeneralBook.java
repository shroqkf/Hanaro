package general;

public class ArrayedGeneralBook implements GeneralBook {
	private static final int CAPACITY = 10;

	private String[] names;
	private String[] records;

	private int size;

	public ArrayedGeneralBook(String[] names, String[] records) {
		if (names == null || records == null || names.length != records.length) {
			throw new IllegalStateException("Not valid names and records!");
		}

		this.size = names.length;
		this.names = new String[this.size + CAPACITY];
		this.records = new String[this.size + CAPACITY];

		cloneNameRecord(names, this.names);
		cloneNameRecord(records, this.records);
	}

	public static void main(String[] args) {
		String[] names = {"Sam", "Rhee", "Kim"};
		String[] records = {"1111", "2222", "3333"};

		ArrayedGeneralBook gb = new ArrayedGeneralBook(names, records);
		System.out.println(gb.names()); //Sam Rhee Kim
		gb.add("Allan", "4444");
		gb.print(); //Allan4444\nKim3333\nRhee2222\nSam1111
		System.out.println("현재 저장된 데이터의 크기 : " + gb.size()); //4
		gb.add("Alex", "5555");
		System.out.println("현재 저장된 데이터의 크기 : " + gb.size()); //5
		gb.print(); //Alex5555\nAllan4444\nKim3333\nRhee2222\nSam1111\n
		System.out.println(gb.nameExist("Alex")); //true
		gb.remove("Alex", "5555");
		gb.remove("Sam", "1111");
		gb.print(); //Allan4444\nKim3333\nRhee2222
		String foundRecord = gb.get("Allan");
		System.out.println(foundRecord); //4444
	}

	@Override
	public int size() {
		return this.size;
	}

	@Override
	public String names() {
		return joinString(names);
	}

	@Override
	public String records() {
		return joinString(records);
	}

	private String joinString(String[] str) {
		StringBuilder sb = new StringBuilder(size * 10);
		for (String s : str) {
			sb.append(s);
		}
		return sb.toString();
	}

	private int indexOf(String[] strs, String str) {
		for (int i = 0; i < strs.length; i++) {
			if (strs[i].equals(str)) {
				return i;
			}
		}
		return -1;
	}

	@Override
	public boolean nameExist(String name) {
		int idx = indexOf(this.names, name);
		return idx != -1;
	}

	private String[] cloneNameRecord(String[] sources, String[] targets) {
		System.arraycopy(sources, 0, targets, 0, size);
		return targets;
	}

	private void expand() {
		String[] tmps = new String[size + (size >> 1)];
		cloneNameRecord(names, tmps);
	}

	@Override
	public void add(String name, String record) {
		if (nameExist(name)) {
			System.out.println("이미 목록에 있는 이름입니다!");
			return;
		}

		if (this.size == this.names.length) {
			expand();
		}

		sort();
	}

	@Override
	public void remove(String name, String record) {
		int idx = indexOf(this.names, name);
		if (idx == -1) {
			System.out.println("삭제할 이름이 없습니다.");
			return;
		}
		System.arraycopy(this.names, idx + 1, this.names, idx, this.size - idx - 1);
	}

	@Override
	public String get(String name) {
		for (int i = 0; i < names.length; i++) {
			if (names[i].equals(name))
				return records[i];
		}
		return null;
	}

	@Override
	public void sort() {
		for (int i = 0; i < size - 1; i++) {
			for (int j = 0; j < size - i - 1; j++) {
				if (names[j].compareTo(names[j + 1]) > 0) {
					String tName = names[j];
					String tRecord = records[j];
					names[j] = names[j + 1];
					records[j] = records[j + 1];
					names[j + 1] = tName;
					records[j + 1] = tRecord;
				}
			}
		}
	}

	@Override
	public void print() {
		this.sort();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < size; i++) {
			sb.append(this.names[i]).append(this.records[i]).append('\n');
		}
		System.out.println(sb);
	}
}
