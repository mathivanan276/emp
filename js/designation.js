import {postData,getData, BASE_URL} from './fetch.js'

const form = document.getElementById('myform');
const alert = document.getElementById('add-alert');

let data = getData('designation/read','get')
const table = document.querySelector('#designation_table');
const editSection = document.getElementById('edit');
const editform = document.getElementById('myeditform')
if(sessionStorage.getItem('desAdded')){
    setInterval(()=>{
        console.log('timerr')
        sessionStorage.removeItem('desAdded');
    },5000)
}

data.then(res=>{
    let s=1;
    res.data.forEach(element => {
        const t_row = document.createElement('tr');
        const t_s_no = document.createElement('td');
        const t_designation = document.createElement('td');
        const t_edit = document.createElement('td');
        const edit = document.createElement('p');
        edit.innerText='Edit'
        edit.setAttribute('id',element.id+';'+element.designation);
        t_s_no.innerText=s;
        t_designation.innerText=element.designation;
        t_edit.appendChild(edit);
        t_row.appendChild(t_s_no);
        t_row.appendChild(t_designation);
        t_row.appendChild(t_edit);
        table.appendChild(t_row);
        s++;
        edit.addEventListener('click',(e)=>{
            console.log(e.target.id);
            editSection.style.display = 'block';
            let [Id,value] = [...e.target.id.split(';')];
            editform[0].value = value; 
            editform[1].value = Id; 
        })
    });
})

if(sessionStorage.getItem('desAdded') === 'true'){
    alert.innerText='Designation Added'
    alert.className='success'
}
if(sessionStorage.getItem('desAdded') === 'false'){
    alert.innerText='Not Added'
    alert.className='danger'
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let data = new FormData(form);
    let designation = document.forms['myform']['designation'].value;
    data.append('designation',designation);
    postData('designation/add','post',formData2json(data))
    .then(res=>{
        if(res.status === 201){
            sessionStorage.setItem('desAdded','true');
            window.location.reload(false);
        } else {
            localStorage.setItem('desAdded','false');
            window.location.reload(false);          
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

editform.addEventListener('submit',(e)=>{
    e.preventDefault();
    let data = new FormData(form);
    let designation = document.forms['myeditform']['designation'].value;
    let id = document.forms['myeditform']['id'].value;
    data.append('designation',designation);
    data.append('id',id);
    postData('designation/update','POST',formData2json(data))
    .then(res=>{
        if(res.status === 200){
            sessionStorage.setItem('desUpdated','true');
            window.location.reload(false);
        } else {
            localStorage.setItem('desUpdated','false');
            window.location.reload(false);          
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

function formData2json(data){
    let obj={};
    for(let key of data.keys()){
        obj[key] = data.get(key);
    }
    return obj;
}