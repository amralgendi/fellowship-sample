#include "backend.h"
#include "methods.h"
#include <iostream>
#include<nlohmann/json.hpp>
#include "utility.hpp"
#include "listener.hpp"
#include "backup.hpp"
#include "conversion.hpp"

using json = nlohmann::json;

int i = 0;

Napi::Value SetCallbackWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env, "Missing argument");
  }

  if (!info[0].IsFunction()) {
    throw Napi::TypeError::New(env, "Function Expected");
  }

  Napi::Function napiFunction = info[0].As<Napi::Function>();

  listener::globalListener.setCallback(Napi::ThreadSafeFunction::New(env, napiFunction, "Callback", 0, 1));

  return Napi::Boolean::New(env, true);
}

Napi::Value ReleaseCallbackWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  listener::globalListener.release();

  return Napi::Boolean::New(env, true);
}

Napi::Value TriggerCallbackWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    listener::globalListener.call();
  }
  else {
    listener::globalListener.call(conversion::napiValueToJson(info[0]));
  }

  return Napi::Boolean::New(env, true);
}

Napi::Value UserLoggedInStatusWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  string data;  // This will be modified by FirstFunc to contain a message.

  bool result = UserLoggedInStatus(data);

  Napi::Object returnObj = Napi::Object::New(env);
  returnObj.Set("success", Napi::Boolean::New(env, result));
  returnObj.Set("data", Napi::String::New(env, data));

  return returnObj;
}

Napi::Value GetHwIdWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  std::string hwId = GetHwId();

  Napi::String returnStr = Napi::String::New(env, hwId);

  return returnStr;
}

Napi::Value getJsonWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

    json js;
    string msg;

    bool res = wieps::getJson(js, msg);

    Napi::Object returnObj = Napi::Object::New(env);
    //TODO: Need error check?

    returnObj.Set("success", Napi::Boolean::New(env, res));
    if (res)
    {
        returnObj.Set("json", conversion::jsonToNapiValue(env, js));
    }
    else
    {
        returnObj.Set("message", Napi::String::New(env, msg));
    }

    return returnObj;
}

Napi::Value getBackupDataWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

    vector<BackupData> data;
    vector<json> jsArr;
    string msg;

    bool res = getBackupData(data, msg);

    for (BackupData i : data) {
      jsArr.push_back({ 
        { "id", i.id },
        { "location", i.location },
        { "type", i.type },
        { "status", i.status }
      });
    }

    json js = jsArr;

    Napi::Object returnObj = Napi::Object::New(env);
    //TODO: Need error check?

    returnObj.Set("success", Napi::Boolean::New(env, res));
    if (res)
    {
        returnObj.Set("data", conversion::jsonToNapiValue(env, js));
    }
    else
    {
        returnObj.Set("message", Napi::String::New(env, msg));
    }

    return returnObj;
}

Napi::Value addBackupDataWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env, "Missing arguments");
  }

  if (!info[0].IsArray()) {
    throw Napi::TypeError::New(env, "Array Expected");
  }

  Napi::Array arr = info[0].As<Napi::Array>();

  vector<BackupData> data;
  vector<vector<string>> in;
  vector<json> jsArr;
  string msg;

  for (uint32_t i = 0; i < arr.Length(); ++i) {
    Napi::Object obj = arr.Get(i).As<Napi::Object>();
    vector<string> tmp = { obj.Get("type").As<Napi::String>() , obj.Get("path").As<Napi::String>() };
    in.push_back(tmp);
  }


  bool res = addBackupData(in, data, msg);

    for (BackupData i : data) {
      jsArr.push_back({ 
        { "id", i.id },
        { "location", i.location },
        { "type", i.type },
        { "status", i.status }
      });
    }

    json js = jsArr;

  Napi::Object returnObj = Napi::Object::New(env);
  //TODO: Need error check?

  returnObj.Set("success", Napi::Boolean::New(env, res));
  if (res)
  {
      returnObj.Set("data", conversion::jsonToNapiValue(env, js));
  }
  else
  {
      returnObj.Set("message", Napi::String::New(env, msg));
  }

  return returnObj;
}

Napi::Value deleteBackupDataWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env, "Missing arguments");
  }

  if (!info[0].IsString()) {
    throw Napi::TypeError::New(env, "String Expected");
  }

  string id = info[0].As<Napi::String>();

  string msg;


  bool res = deleteBackupData(id, msg);

  Napi::Object returnObj = Napi::Object::New(env);
  //TODO: Need error check?

  returnObj.Set("success", Napi::Boolean::New(env, res));

  if (!res)
  {
      returnObj.Set("message", Napi::String::New(env, msg));
  }

  return returnObj;
}

void TestObjectWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env, "Missing arguments");
  }

  auto js = conversion::napiValueToJson(info[0]);

  std::cout << js.dump(4) << std::endl;

  return;
}

bool changeBool = false;

Napi::Value SendCommandWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    throw Napi::Error::New(env, "Missing arguments");
  }

  json js = conversion::napiValueToJson(info[0]);

  json response = { { "hwId", "123944743281432047002340" } };

  // SEND COMMAND
  // EXAMPLE: bool isSuccess = SendCommand(js, response);

  changeBool = !changeBool;

  if(changeBool)
  {
    return conversion::jsonToNapiValue(env, { {"success", true}, { "data", response }, { "message", "Executed Successfully!" }});
  }
  else
  {
    return conversion::jsonToNapiValue(env, { {"success", false}, { "message", "An error has occurred!"}});  
  }

}

Napi::Value SendCommandAsyncWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 2) {
    throw Napi::Error::New(env, "Missing arguments");
  }

  if (!info[1].IsFunction()) {
    throw Napi::TypeError::New(env, "Function Expected");
  }

  Napi::Function napiFunction = info[1].As<Napi::Function>();

  listener::Listener listener = listener::Listener(Napi::ThreadSafeFunction::New(env, napiFunction, "Callback", 0, 1), false);

  json js = conversion::napiValueToJson(info[0]);

  changeBool = !changeBool;

  json response = { 
    {"success", changeBool},
    {"data", { { "num", 2 } }},
    {"message", changeBool ? "Executed Successfully!" : "key_required"}, 
  };

  // SEND COMMAND
  // EXAMPLE: bool isSuccess = SendCommand(js, response, listener);


  listener.call(response);

  if(true)
  {
    return conversion::jsonToNapiValue(env, { {"success", true}, { "message", "Executed Successfully!" }});
  }
  else
  {
    return conversion::jsonToNapiValue(env, { {"success", false}, { "message", "An error has occurred!"}});  
  }
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "SetCallback"), Napi::Function::New(env, SetCallbackWrapped));
  exports.Set(Napi::String::New(env, "ReleaseCallback"), Napi::Function::New(env, ReleaseCallbackWrapped));
  exports.Set(Napi::String::New(env, "TriggerCallback"), Napi::Function::New(env, TriggerCallbackWrapped));
  exports.Set(Napi::String::New(env, "UserLoggedInStatus"), Napi::Function::New(env, UserLoggedInStatusWrapped));
  exports.Set(Napi::String::New(env, "GetHwId"), Napi::Function::New(env, GetHwIdWrapped));
  exports.Set(Napi::String::New(env, "GetJson"), Napi::Function::New(env, getJsonWrapped));
  exports.Set(Napi::String::New(env, "GetBackupData"), Napi::Function::New(env, getBackupDataWrapped));
  exports.Set(Napi::String::New(env, "AddBackupData"), Napi::Function::New(env, addBackupDataWrapped));
  exports.Set(Napi::String::New(env, "DeleteBackupData"), Napi::Function::New(env, deleteBackupDataWrapped));
  exports.Set(Napi::String::New(env, "TestObject"), Napi::Function::New(env, TestObjectWrapped));
  exports.Set(Napi::String::New(env, "SendCommand"), Napi::Function::New(env, SendCommandWrapped));
  exports.Set(Napi::String::New(env, "SendCommandAsync"), Napi::Function::New(env, SendCommandAsyncWrapped));

  return exports;
}

NODE_API_MODULE(addon, Init)
