#pragma once

#include <vector>
#include <string>
#include <nlohmann/json.hpp>

using namespace std;
using json = nlohmann::json;

struct BackupData {
    string id;
    string location;
    string type;
    string status;
};

vector<BackupData> allBackupData = {};
bool first = true;

inline bool getBackupData(vector<BackupData>& data, string& msg){
    // Alternatively, use emplace_back for in-place construction
    if(first)
    {
        string location = "C:\\EPS_GUIEPS_GUI";
        string type = "folder";
        string status = "-";
        for(int i = 1; i <= 20; i++){
            string id = "dummy_id_" + to_string(i);
            BackupData bd = { id, location, type, status };

            allBackupData.push_back(bd);
        }

        first = false;
    }

    data = allBackupData;

    return true;
}

inline bool addBackupData(const vector<vector<string>>& in, vector<BackupData>& data, string& msg) {
    
    for(auto i: in) {
        BackupData tmp = { "dummy_id", i[1], i[0], "-" };
        data.push_back(tmp);
        allBackupData.push_back(tmp);
    }

    return true;
}

inline bool deleteBackupData(const string& id, string& msg) {
    // for(auto bd : allBackupData)
    // {
    //     if(bd.id == id)
    //     {
    //         allBackupData.
    //     }
    // }
    return true;
}