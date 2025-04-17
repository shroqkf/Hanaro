// const assert = require("assert"); // CommonJS 방식

// module 방식
import assert from "assert";
import moment from "moment";
import { xx, PI } from "./aa.js";

const hello = "Hello Module!";
console.log("🚀 hello:", hello, moment().startOf("day").fromNow());

assert.equal(hello, "Hello Module!");

const aa = xx();
console.log("🚀 aa:", aa, PI);

