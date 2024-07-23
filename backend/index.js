const addon = require("./bin/win32-x64-116/backend.node");

module.exports = {
  SetCallback: addon.SetCallback,
  ReleaseCallback: addon.ReleaseCallback,
  TriggerCallback: addon.TriggerCallback,
  UserLoggedInStatus: addon.UserLoggedInStatus,
  GetHwId: addon.GetHwId,
  GetJson: addon.GetJson,
  GetBackupData: addon.GetBackupData,
  AddBackupData: addon.AddBackupData,
  DeleteBackupData: addon.DeleteBackupData,
  TestObject: addon.TestObject,
  SendCommand: addon.SendCommand,
  SendCommandAsync: addon.SendCommandAsync,
};
