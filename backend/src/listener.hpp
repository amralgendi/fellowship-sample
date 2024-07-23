#pragma once

#include <napi.h>
#include "conversion.hpp"

namespace listener {
    class Listener {
        private:
            Napi::ThreadSafeFunction threadSafeCallback;
            bool isListener;

        public: 
            inline Listener(Napi::ThreadSafeFunction threadSafeCallback, bool isListener = false)
            {
                this->threadSafeCallback = threadSafeCallback;
                this->isListener = isListener;
            }

            inline Listener(bool isListener = false)
            {
                this->isListener = isListener;
            }

            inline void setCallback(const Napi::ThreadSafeFunction& _threadSafeCallback) {
                threadSafeCallback = _threadSafeCallback;
            }
        
            inline bool call(const json& js) {
                auto callback = [js](Napi::Env env, Napi::Function jsCallback) {
                    jsCallback.Call({ conversion::jsonToNapiValue(env, js) });
                };

                threadSafeCallback.BlockingCall(callback);

                if(!isListener)
                {
                    release();
                }

                return true;
            }

            inline bool call(const Napi::Value& val) {
                auto callback = [val](Napi::Env env, Napi::Function jsCallback) {
                    jsCallback.Call({ val });
                };

                threadSafeCallback.BlockingCall(callback);

                if(!isListener)
                {
                    release();
                }

                return true;
            }

            inline bool call() {
                auto callback = [](Napi::Env env, Napi::Function jsCallback) {
                    jsCallback.Call({ Napi::Object::New(env) });
                };

                threadSafeCallback.BlockingCall(callback);

                if(!isListener)
                {
                    release();
                }

                return true;
            }

            inline void release() {
                threadSafeCallback.Release();
            }

    };

    extern Listener globalListener = Listener(true);
}