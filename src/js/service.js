import {makeRow} from './view'
export let reloadingData = () => {
    document.getElementById("mainBody").innerHTML = "";
    let getUrl = "http://localhost:3000/items";
fetch(getUrl)
.then((resp) => resp.json())
.then(data => {
    data.map(item => {
        makeRow(item);
    })  
}
)
}



export function editCart(id,qty,size){
    const jsonUrl = 'http://localhost:3000/items/'+id;
    fetch(jsonUrl)
    .then(resp => resp.json())
    .then((data) => {
    let editedObject = Object.assign({},data,{
    "qty" : qty,
    "size" : size
    });
    const putData = {
    method: 'PUT', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
    'Content-Type': 'application/json; charset=utf-8',
    },
    redirect: 'follow', 
    referrer: 'no-referrer', 
    body: JSON.stringify(editedObject),
    };
    fetch(jsonUrl,putData)
    .then(() => {
    reloadingData();
    })
    })
    } 
      
