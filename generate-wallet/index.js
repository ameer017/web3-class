const keccak256 = require("keccak256")

k = process.env.SECRET

const generate = keccak256(k).toString("hex");

console.log(generate)

console.log(keccak256(k))

// wallet address: 0x98f4b729bcb6f6f78bbb45187fb3edc09f61ba67