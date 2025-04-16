const assert = require("assert");

const LINE2 = [
  "신도림",
  "성수",
  "신설동",
  "용두",
  "신답",
  "용답",
  "시청",
  "충정로",
  "아현",
  "이대",
  "신촌",
  "공항철도",
  "홍대입구",
  "합정",
  "당산",
  "영등포구청",
  "문래",
  "대림",
  "구로디지털단지",
  "신대방",
  "신림",
  "봉천",
  "서울대입구",
  "낙성대",
  "사당",
  "방배",
  "서초",
  "교대",
  "강남",
  "역삼",
  "선릉",
  "삼성",
  "종합운동장",
  "신천",
  "잠실",
  "잠실나루",
  "강변",
  "구의",
  "건대입구",
  "뚝섬",
  "한양대",
  "왕십리",
  "상왕십리",
  "신당",
  "동대문역사문화공원",
  "을지로4가",
  "을지로3가",
  "을지로입구",
];

class Subway {
  #start;
  #end;
  #currIdx;
  #didEnd = false;
  constructor(start, end) {
    this.#start = start;
    this.#end = end;
    this.#currIdx = LINE2.indexOf(start);
  }

  nextStation() {
    if (this.#currIdx === LINE2.length) {
      this.#currIdx = 0;
    }
    this.#didEnd = this.#currIdx === LINE2.indexOf(this.#end);
    return LINE2[this.#currIdx++];
  }

  *[Symbol.iterator]() {
    while (true) {
      if (this.#didEnd) {
        this.#didEnd = false;
        this.#currIdx = LINE2.indexOf(this.#start);
        break;
      }

      yield this.nextStation();
    }
  }

  iterator() {
    return this[Symbol.iterator]();
  }

  toString() {
    return `${this.#start}->${this.#end} (This stop is: ${
      LINE2[this.#currIdx - 1]
    })`;
  }
}

const routes = new Subway("문래", "신림");
console.log([...routes]);
assert.deepStrictEqual(
  [...routes],
  ["문래", "대림", "구로디지털단지", "신대방", "신림"]
);

const it1 = routes[Symbol.iterator]();
["문래", "대림", "구로디지털단지", "신대방", "신림"].forEach((value, i) => {
  assert.deepStrictEqual(it1.next(), { value, done: false });
  console.log(i, routes.toString());
});
// console.log(it1.next());
assert.deepStrictEqual(it1.next(), { value: undefined, done: true });

// for (const s of [...routes]) { // bad
// for (const s of routes[Symbol.iterator]()) {
for (const s of routes.iterator()) {
  console.log("🚀 s:", s);
}

const route3 = new Subway("문래", "합정"); // 46개 정거장이면 통과!
assert.strictEqual([...route3].length, 46);

const route4 = new Subway("신도림", "을지로입구"); // 48개 정거장이면 통과!
assert.strictEqual([...route4].length, 48);
