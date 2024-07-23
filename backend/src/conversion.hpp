#pragma once

#include <napi.h>
#include <nlohmann/json.hpp>
#include <cmath>

namespace conversion {
    inline Napi::Value jsonToNapiValue(const Napi::Env& env, const nlohmann::json& json) {
        if (json.is_object()) {
            Napi::Object obj = Napi::Object::New(env);

            for (auto it = json.begin(); it != json.end(); ++it) {
                obj.Set(it.key(), jsonToNapiValue(env, it.value()));
            }

            return obj;
        } else if (json.is_array()) {
            Napi::Array array = Napi::Array::New(env);

            for (size_t i = 0; i < json.size(); ++i) {
                array.Set(i, jsonToNapiValue(env, json[i]));
            }

            return array;
        } else if (json.is_string()) {
            return Napi::String::New(env, json.get<std::string>());
        } else if (json.is_number_integer()) {
            return Napi::Number::New(env, json.get<int>());
        } else if (json.is_number_float()) {
            return Napi::Number::New(env, json.get<double>());
        } else if (json.is_boolean()) {
            return Napi::Boolean::New(env, json.get<bool>());
        } else if (json.is_null()) {
            return env.Null();
        }

        return env.Undefined();
    }

    inline nlohmann::json napiValueToJson(const Napi::Value& value) {
        if (value.IsNull() || value.IsUndefined()) {
            return nullptr;
        } else if (value.IsBoolean()) {
            return value.As<Napi::Boolean>().Value();
        } else if (value.IsNumber()) {
            double doubleVal = value.As<Napi::Number>().DoubleValue();

            return ceil(doubleVal) == doubleVal
                ? value.As<Napi::Number>().Int64Value()
                : doubleVal;
        } else if (value.IsString()) {
            return value.As<Napi::String>().Utf8Value();
        } else if (value.IsArray()) {
            Napi::Array arr = value.As<Napi::Array>();
            nlohmann::json jsonArray = nlohmann::json::array();
        
            for (uint32_t i = 0; i < arr.Length(); ++i) {
                Napi::Value val = arr[i];
                jsonArray.push_back(napiValueToJson(val));
            }
            
            return jsonArray;
        } else if (value.IsObject()) {
            nlohmann::json jsonObject;
            Napi::Object object = value.As<Napi::Object>();
            
            Napi::Array propertyNames = object.GetPropertyNames();
            for (uint32_t i = 0; i < propertyNames.Length(); ++i) {
                Napi::Value key = propertyNames[i];
                std::string keyStr = key.As<Napi::String>();
                Napi::Value val = object.Get(keyStr);
                jsonObject[keyStr] = napiValueToJson(val);
            }
            
            return jsonObject;
        } else {
            // Handle other types if necessary
            throw std::runtime_error("Unsupported Napi::Value type.");
        }
    }
} // conversion