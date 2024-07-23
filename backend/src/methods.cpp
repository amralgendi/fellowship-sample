#include "methods.h"
#include <iostream>

using namespace std;
using json  = nlohmann::json;

bool UserLoggedInStatus(string& data) {
    // data = {
    //     {"token", "232432ejwdsnjfdsdjfjdsnf2fndssd"},
    // };

    data = "232432ejwdsnjfdsdjfjdsnf2fndssd";
    
    return true;
}

string GetHwId() {
    return "18374628";
}