#pragma once
#ifndef __UTILITYY_HPP__
#define __UTILITYY_HPP__
#include<nlohmann/json.hpp>
#include<iostream>
#include<string>
#include<fstream>
#include<thread>

#define g_c_jsonFilePath "./config/app.json"

//
//read plaintext json file and parse as json
// 
namespace wieps {
	inline bool getJson(nlohmann::json& jsAll, std::string& msg) {
		string filePath = g_c_jsonFilePath;

		std::ifstream ifp(filePath);
		if (!ifp.is_open()) {
			int errorCode = errno;
			msg = std::string("Couldn't open the file [") + filePath + "] for reading! ERROR: [" + strerror(errorCode) + "]";
			return false;
		}
		try {
			jsAll = nlohmann::json::parse(ifp);
			return true;
		}
		catch (std::exception& e) {
			msg = std::string("Exception in Func [") + std::string(__FUNCTION__) + std::string(":") +
				std::to_string(__LINE__) + "]: " + e.what();
		}
		return false;
	}
} // namespace wieps

#endif // !__UTILITYY_HPP__
