type User = { id: number; name: string };

let hong: User = { id: 1, name: "Hong" };
hong = Object.assign({ id: 1 }, { name: "Kim" });

// hong = { id: 2, name: "Kim", addr: "Seoul" }; // freshness 상태라서 바로 값 넣지 못함
const hongX = { id: 2, name: "Kim", addr: "Seoul" };
hong = hongX;
