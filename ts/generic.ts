class Factory<T> {
  protected products: T[];

  constructor(product: T) {
    this.products = [product];
  }

  create(product: T) {
    this.products.push(product);
  }
  getProducts() {
    return [...this.products];
  }
}

type Syrup =
  | { syrup: "choco"; price: 500 }
  | { syrup: "strawberry"; price: 800 };
type Topping = "java" | "cherry";
type Coffee = { menu: string; price: number };

class CoffeeFactory extends Factory<Coffee> {
  // order의 T는 CoffeeFactory와 관계없이 자체 제네릭 타입 사용함
  order<T>(menu: string, topping: T[]) {
    const coffee = this.products.find(({ menu: _coffee }) => _coffee === menu);

    return coffee ? { ...coffee, additives: topping } : null;
  }
}

const coffeeFactory = new CoffeeFactory({
  menu: "americano",
  price: 2000,
});

const myCoffee = coffeeFactory.order<Syrup | Topping>("americano", [
  { syrup: "choco", price: 500 },
  "java",
  "cherry",
]);

// const myAdditionalPrice = myCoffee?.additives.reduce(
//   (sum, item) => (sum += item.price),
//   0
// ); // OK? Error? => Error!
const myAdditionalPrice = myCoffee?.additives.reduce((sum, item) => {
  if (typeof item !== "string") sum += item.price;
  return sum;
}, 0);
// cf. sum += (item === 'java' || item === 'cherry') ? 0 : item.price

const yourCoffee = coffeeFactory.order<Syrup>("americano", [
  { syrup: "choco", price: 500 },
  { syrup: "strawberry", price: 800 },
]);
const yourAdditionalPrice = yourCoffee?.additives.reduce(
  (s, c) => (s += c.price),
  0
); // OK? Error? OK!

// -------------------------------------------------------------------------------------------------------------

class BothLogger<OnInstance> {
  instanceLog(value: OnInstance) {
    console.log("instanceLog.value > ", value);
    return value;
  }

  // OnInstance 타입은 인스턴스 생성시 정해진다!
  //   // ex) new BothLogger<number[]>();

  //   // 따라서, 인스턴스를 생성하지 않아도 접근 가능한 정적 클래스 메서드에서는 클래스에 선언된 어떤 타입 매개변수에도 접근할 수 없다!
  //   // static은 instance와 무관하다!
  //   // 따라서 static member에서는 클래스 타입 매개변수에 접근 불가!

  //   static A: OnInstance;
  //   static staticLog<OnStatic>(value: OnStatic) {
  //     let instanceLogValue: OnInstance;

  //     console.log("staticLog.value > ", value);
  //     return value;
  //   }
  static A: number[];
  static staticLog<OnStatic>(value: OnStatic) {
    let instanceLogValue: number[];

    console.log("staticLog.value > ", value);
    return value;
  }
}

const logger = new BothLogger<number[]>(); // BothLogger 인스턴스 생성시에 OnInstance 타입이 number[]로 정해졌기 때문에 instanceLog() 메서드의 매개변수 타입도 number[]!!
const value = logger.instanceLog([1, 2, 3]); // number[]
// logger.instanceLog(['A', 'B', 'C']); // arguments must be number[]

const logger2 = new BothLogger();
const value2 = logger2.instanceLog("Hello"); // unknown. any와 unknow은 최상위 타입이라 뭐가 와도 오류 안남!
// BothLogger 인스턴스(logger2) 생성시에 OnInstance 타입이 정해지지 않았기 때문에 instanceLog() 메서드의 매개변수 및 리턴 타입은 unknown!!

BothLogger.staticLog<string[]>(["a", "b", "c"]); // class에만 Generic을 부여하지 않으면 문제가 안된다! (:메소드 자체 제네릭!)
BothLogger.staticLog([true, false, false]);

// -------------------------------------------------------------------------------------------------------------
interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string;
}
interface IUser {
  id: number;
  age: number;
  name: string;
}

type BN<T, U> = T extends keyof U ? boolean : number;
type IdBN1 = BN<"id", IDept>; // boolean
type IdBN2 = BN<"idd", IDept>; // number

type TX<T, U> = T extends keyof U ? T : U;
type TXID1 = TX<"id", IDept>; // "id"
type TXID2 = TX<"idd", IDept>; // IDept

// 다른 것만 남기는 Except
type Except<T, U> = T extends U ? never : T; // never는 씹힌다!(같으면 제외)
type Ex0 = Except<IUser, IDept>; // IUser
type Ex1 = Except<keyof IUser, keyof IDept>; // name
type Ex2 = Except<keyof IDept, keyof IUser>; // dname | captain

// 같은 것만 남기는 Intersect
type Intersect<T, U> = T extends U ? T : never; // never는 씹힌다!(같은 것만!)
type Ext1 = Intersect<keyof IUser, keyof IDept>; // id | age
type Ext2 = Intersect<keyof IDept, keyof IUser>; // id | age

// cf. Omit (<=> Except)
type O<T> = Omit<T, "id" | "age">;
type Odept = O<IDept>; // dname: string; captain: string;

// cf. Pick  (<=> Intersect)
type P<T, K extends keyof T> = Pick<T, K>;
type Pdept = P<IDept, "id" | "age">; // id: number; age:string;

interface Post {
  id: number;
  title: string;
  content: string;
  user: IUser;
}

const post: Post = {
  id: 10,
  title: "post",
  content: "content",
  user: { id: 1, age: 33, name: "hong" },
};

function get<T, K extends keyof T>(container: T, key: K) {
  return container[key];
}

const user = get<Post, "user">(post, "user");

type X<T> = {
  [x in keyof T]: T[keyof T]; // Bad!!
};

type XDept = X<IDept>;

type Y<T> = {
  [k in keyof T]: T[k]; // Good!
};

type YDept = Y<IDept>;

type XX = (string | number) & (string | boolean);
type XO = IUser & IDept;
type XO2 = { id: number } & { id: number; name: string };
const xo2: XO2 = { id: 1, name: "Hong" };

type valuOf<T> = T[keyof T];

export {};
