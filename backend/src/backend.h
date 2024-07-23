#include <napi.h>
#include<nlohmann/json.hpp>

// class Backend : public Napi::ObjectWrap<Backend>
// {
// public:
//     Backend(const Napi::CallbackInfo&);
//     Napi::Value Greet(const Napi::CallbackInfo&);

//     static Napi::Function GetClass(Napi::Env);

// private:
//     std::string _greeterName;
// };