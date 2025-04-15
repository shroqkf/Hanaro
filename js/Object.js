class Animal {
  static ID = 1;
  constructor(name) {
    this.name = name;
  }

  feed(nutrient) {
    console.log(`feed to ${this.name} :`, nutrient);
  }
}

const petMixin = {
  likepeople() {
    console.log(`${this.name} like…`);
  },
};

class Dog extends Animal {
  #age = 0; // # 붙이면 private
  constructor(name, age) {
    super(name); // 부모의 생성자
    // this.name = name;
    this.#age = age;
  }

  setName(newName) {
    this.name = newName;
  }

  getAge() {
    return this.#age;
  }

  get age() {
    return this.#age;
  }

  set age(newAge) {
    this.#age = newAge;
  }

  f() {
    return this.ID;
  }
  static sf() {
    return this.ID;
  }
}
const ani = new Animal();
const aid = ani.ID;
console.log("🚀 aid:", aid);

const dog = new Dog("Dog", 3);
console.log("🚀 dog:", dog.f(), Dog.sf());
dog.setName("Maxx");

console.log("🚀 Name:", dog.name, dog.getAge());
dog.feed("VC");
// Object.assign(dog, petMixin);
Object.assign(Dog.prototype, petMixin);
dog.likepeople();

const marry = new Dog("Marry");
marry.likepeople();
return;

// ----------------------------------------------------

function wrapFullName(user) {
  return new Proxy(user, {
    get(target, prop) {
      if (prop === "full name") {
        return `${target.firstName} ${target.lastName}`;
      } else {
        return target[prop];
      }
    },
    set(target, prop, value) {
      if (prop === "full name") {
        [target.firstName, target.lastName] = value.split(" ");
      } else {
        target[prop] = value;
      }
    },
  });
}

console.log("🚀 kim:", kim);

// ----------------------------------------------------

Array.prototype.mapBy = function (k) {
  return this.map((a) => a[k]);
};
users = [
  { id: 1, name: "Hong" },
  { id: 2, name: "Kim" },
];
users.mapBy("id");
