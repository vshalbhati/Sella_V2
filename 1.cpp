#include<bitc++.h>
using namespace std;
int main(){
    int n=1,m=1,p=5;
    vector<int> v;
    v.push_bac(n+m);
    v.push_back(v[0]+m);
    for(int i=2; i<p;i++){
        int next_number=v[i-1]+v[i-2];
        v.push_back(next_number);
    }
    int inp;
    cout<<"Write the input"<<endl;
    cin>>inp;
    cout<<v[inp]<<endl;
}