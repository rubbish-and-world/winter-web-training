//get elements
let addbutton = document.querySelector("#add_");
let delbutton = document.querySelector("#del");
let inputbar = document.querySelector("#inputbar");
let cancel = document.querySelector(".cancel");
let save = document.querySelector(".save");
let list = document.querySelector(".tasks");

//when finish a task
function finish(){
let checks = document.querySelectorAll(".task");
    let cot = 0;
    for(;cot<checks.length;cot++){
        checks[cot].addEventListener("click",function (){
            let box = event.target;
            box.parentNode.style.background = "#1dd1a1";
            setTimeout(function(){ 

                let P = box.parentNode.parentNode;
                P.removeChild(box.parentNode);
             }, 500);
        })
    }
}
//include the example
finish();
modify();

//set judge-flag of delete
let flag = false;

//clean the content of inputbar
function clear(){
    document.querySelector('.task-i').value = "";
    document.querySelector('.place-i').value = "";
    document.querySelector('.deadline-i').value = "";
}

//close inputbar
function close(){
    inputbar.style.display = "none";
    clear();
}

//delete tasks
function delete_task(){
    let itemlist = document.querySelectorAll("li");
    let cot = 0;
    
    for (; cot < itemlist.length;cot++)
    {
        if(flag){
        itemlist[cot].style.background = "#ff6b6b";
        itemlist[cot].style.cursor = "pointer";
        itemlist[cot].addEventListener("click",function(){
            //let standard = document.createElement("li");
            let li = event.target;
            // if(li  == standard){
            if(flag){
            let Parent = li.parentNode;
            Parent.removeChild(li);
                }
           //}
        });
    }
    else{
        itemlist[cot].style.background = "white";
        itemlist[cot].style.cursor = "default";
    }
    }
    
}

//open the input bar
function open(){
    inputbar.style.display = "block";
}


//bind
delbutton.addEventListener("click",function (){
    if(!flag){
        delbutton.innerText = "D";
        flag = true;
        delete_task();
    }
    else{
        flag = false;
        delete_task();
        delbutton.innerText = "-";
    }
});
addbutton.addEventListener("click",open);
cancel.addEventListener("click",close);

//save a new task
save.addEventListener("click",function(){
let task = document.querySelector(".task-i").value;
let place = document.querySelector(".place-i").value;
let ddl = document.querySelector(".deadline-i").value;

//creat new item
let newitem = document.createElement("li");

//creat checkbox
let check  = document.createElement("input");
check.type = "checkbox";
check.className = "task";
newitem.appendChild(check);

//creat task
let Task = document.createElement("span");
Task.innerText = "Task:"+task+"  "+"||"+"  "+"Place:"+place;
newitem.appendChild(Task);

//creat deadline
let newddl = document.createElement("span");
newddl.className = "ddl";
newddl.innerText = "Deadline:"+ddl;
newitem.appendChild(newddl);

//finish creat
list.appendChild(newitem);

//close and clear
close();

//rebind
finish();
modify();
});

//modify
function modify(){
    let spanlist = document.querySelectorAll("span");
    let cot = 0;
    for (;cot<spanlist.length;cot++){
        spanlist[cot].addEventListener("click",function (){
    if(!flag){

           
    let inputbox = document.querySelector(".modifybox");
    inputbox.style.display = "block";
    
    let obj = event.target;
    inputbox.value = obj.innerText;

    inputbox.onkeypress = function(event){
            
    if(event.which == 13){
        obj.innerText = inputbox.value;
        inputbox.style.display = "none";
        inputbox.value = "";} 
    }
    }});
    }
    }


