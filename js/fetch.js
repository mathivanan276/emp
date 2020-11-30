export const BASE_URL = 'http://localhost:80/employee/';


export async function getData(url){
    let data =  await fetch(BASE_URL+url,{
        method:'get'
    })
    return data.json();
}
export async function postData(url,method,data){
    let res = await fetch(BASE_URL+url,{
        method:method,
        body:JSON.stringify(data)   
    })
    return res;
}