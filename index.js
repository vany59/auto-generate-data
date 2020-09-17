var random_name = require("node-random-name");
const _ = require("lodash");
const uuid = require("uuid");
const clipboardy = require("clipboardy");
const jdenticon = require("jdenticon");
const fs = require("fs");

var data = [];
const amount = 100;
const imgSize = 200;

var i = 0;
while (i < amount) {
  const name = random_name();
  if (!_.includes(data, name)) {
    i++;
    data.push(name);
  }
}

data = data.map((d) => {
  const value = d.split(" ");
  const firstName = value[0];
  const lastName = value[1];
  const username = firstName.toLowerCase() + lastName.toLowerCase();
  const email = `${username}@gmail.com`;
  const phone = "03" + (Math.random() * (99999999 - 10000000) + 100000000);
  const id = uuid.v4();
  const status = !!Math.floor(Math.random() * 2) ? "lock" : "active";
  const png = jdenticon.toPng(d, imgSize);
  fs.writeFileSync(`./uploads/${username}.png`, png);
  const imgUrl = `http://localhost:3000/${username}.png`;

  return {
    firstName,
    lastName,
    username,
    email,
    phone,
    id,
    status,
    avatar: imgUrl,
  };
});

clipboardy.writeSync(JSON.stringify(data));
console.log("copied to clipboard");
// console.log(data);
