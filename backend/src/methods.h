#pragma once
#include <string>
#include<nlohmann/json.hpp>

using json = nlohmann::json;
using namespace std;

bool UserLoggedInStatus(string& data);

string GetHwId();
