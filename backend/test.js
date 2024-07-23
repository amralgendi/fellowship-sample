const {
  SetCallback,
  TriggerCallback,
  ReleaseCallback,
  GetJson,
  GetBackupData,
  AddBackupData,
  DeleteBackupData,
  TestObject,
  SendCommand,
  SendCommandAsync,
} = require("./index");

// // const data = GetJson();
// // console.log("DATA: ", data);

// const backupData = GetBackupData();
// console.log(backupData);

// const res = AddBackupData([
//   { type: "folder", path: "C:\\Users\\amragProjects" },
// ]);

// console.log(res);

// const backupDataTwo = GetBackupData();

// console.log(backupDataTwo);
// DeleteBackupData("dummy_id");
// console.log(res);
// const onJsonUpdated = (json) => {
//   console.log("JSON UPDATED!");

//   console.log(json);
// };

// SetCallback(onJsonUpdated);

// // CALLABLE FROM C++
// setInterval(TriggerCallback, 2000);

// ReleaseCallback();

// setTimeout(() => ReleaseCallback(), 10000);

console.log("THIS IS A SYNCHRONOUS COMMAND");
const sync = SendCommand({ command: "CHECK_IF_LOGGED_IN" });
console.log(sync);

console.log("THIS IS AN ASYNCHRONOUS COMMAND");
const async = SendCommandAsync(
  { command: "LOGIN", data: { username: "amr", password: "asdasdsadj" } },
  (data) => {
    console.log("ASYNC RESPONSE");
    console.log(data);
  }
);

console.log(async);

// SetCallback(() => {
//   console.log("CALLED!");
// });

// TriggerCallback();
// TriggerCallback();
// ReleaseCallback();
