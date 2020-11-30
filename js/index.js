import {getData} from './fetch.js'

let data = getData('employee/read','get')
const table = document.querySelector('#emp_table');

data.then(res=>{
    res.forEach(element => {
        console.log(element);
        const t_row = document.createElement('tr');
        const t_name = document.createElement('td');
        const t_designation = document.createElement('td');
        t_name.innerText=element.name;
        t_designation.innerText=element.designation;
        t_row.appendChild(t_name);
        t_row.appendChild(t_designation);
        table.appendChild(t_row);
    });
})