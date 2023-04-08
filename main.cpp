#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <limits>
#include <sstream>
#include <iomanip>
#include <algorithm>
#include <cstring>
#include <iterator>

using namespace std;


vector<string> get_positive_phrases(string positive_words_file){

    vector<string> positive_phrases;

    ifstream file;

    file.open(positive_words_file);

    string positive_phrase;

    if (!file.is_open()) {
        cout << "failure: " + positive_words_file + " not found";
    }

    while (!file.eof()) {
        getline(file, positive_phrase);
        positive_phrases.push_back(positive_phrase);
    }


    return positive_phrases;

}


void ban_words(string user_input, string list_of_banned_words_file){

    vector <string> phrase;

    bool valid = false;

    phrase = get_positive_phrases("positivePhrases.txt");

    ifstream file;

    file.open(list_of_banned_words_file);

    string banned_word;

    if (!file.is_open()) {
        cout << "failure: " + list_of_banned_words_file + " not found";
    }

    while (!file.eof()) {
        getline(file, banned_word);
        
        int idx = user_input.find(banned_word);

        if (idx != string::npos){
            valid = true;
            break;
            
        }
    }

    if (valid){
        int ran_indx = rand() % phrase.size();
        cout << phrase.at(ran_indx);

    }else{
        cout << user_input;

    }
    

    
    
            





}

int main()
{
    string input;

    cout << "Enter: "; 
    cin >> input;

    ban_words(input, "bannedWords.txt");







    return 0;
}