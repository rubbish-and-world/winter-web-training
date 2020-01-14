//get elements
let title = document.querySelector("#title");
let startm = document.querySelector("#start-m");
let startd = document.querySelector("#start-d");
let endm = document.querySelector("#end-m");
let endd = document.querySelector("#end-d");
let content = document.querySelector("#content");
let type = document.querySelector("#type");
let confirm = document.querySelector("#btn1");
let cancel = document.querySelector("#btn2");
let will_list = document.querySelector(".will");
let doing_list = document.querySelector(".doing");
let done_list = document.querySelector(".done");
let overtime_list = document.querySelector(".overtime");

//get data
let date = new Date();
let month = date.getMonth()+1;
let day = date.getDate();


//set id counter
let  id_cot = 1;

//tips
let tp = ["ID:","Title:","Start-Time:","End-Time:","Content:","Type:"];

//clear inputbar
function clear(){
    title.value = "";
    startm.value = "";
    startd.value = "";
    endm.value = "";
    endd.value = "";
    content.value = "";
    type.value = "";
}

//creat task
let creattask = () => {
let newtask = document.createElement("div");
newtask.className = "task";
return newtask;
}

//creat id
function creatid(){
    let newid = document.createElement("div");
    newid.id = "id";
    newid.innerText = tp[0] + id_cot;
    id_cot++;
    return newid;
}

//creat checkbox
function creatcheck(){
    let check = document.createElement("input");
    check.type = "checkbox";
    check.addEventListener("click",del);
    return check;
}

//creat title
function creattitle(){
    let newtitle = document.createElement("div");
    newtitle.className = "title";
    newtitle.innerText =tp[1] + title.value;
    return newtitle;
}

//creat start and end
function creatstart(){
    let newstart = document.createElement("div");
    newstart.className = "start";
    newstart.innerText = tp[2] + startm.value +" / "+ startd.value;
    return newstart;
}
function creatend(){
    let newend = document.createElement("div");
    newend.className = "end";
    newend.innerText = tp[3] + endm.value + " / " + endd.value;
    return newend;
}

//creat content
function creatcontent(){
    let newcon = document.createElement("div");
    newcon.className = "content";
    newcon.addEventListener("click",modify);
    newcon.innerText = tp[4] + content.value;
    return newcon;
}

//creat type
function creattype(){
    let newtype = document.createElement("div");
    newtype.className = "type";
    newtype.innerText = tp[5] + type.value;
    return newtype;
}





//change month and day into days in order to compare.
function change(month,day){
    let sum = 0;
    switch (month){
        case 1:{sum = 31 + day;break;}
        case 2:{sum = 31 + 29 +day;break;}
        case 6:
        case 4:{sum =60+ ((month/3)*31 + (month-(month/3)-2)*30)}
        default:{sum =60 + ((month / 2)*31 + (month-(month/2)-2)*30);}
    }
    return sum;
}


//judge where should the task go 
function judge(){
    let sm = startm.value;
    let sd = startd.value;
    let em = endm.value;
    let ed = endd.value;
    let flag = 0;
    if(change(sm,sd)<change(em,ed)){
       flag = 1;//will
    }
    else if(change(sm,sd)==change(em,ed)){
        flag = 2;//doing
    }
    else{
        flag = 3;//overtime
    }
    return flag;
}

//make  random color
function color(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    return 'rgba('+r +','+g +','+ b +',0.8)';
 }


//find the insert position and insert
function find(list,obj){
    let listitems = list.querySelectorAll(".type");
let cot = 0;
    for(;cot<listitems.length;cot++){
        if(listitems[cot].innerText == obj.querySelector(".type").innerText){
            list.insertBefore(obj,listitems[cot].parentNode);
            obj.style.background = listitems[cot].parentNode.style.background;
            return;
        }
    }
    obj.style.background = color();
    list.appendChild(obj);

}



//creat whole new task
function creat(){
    let ts = creattask();
    let Id = creatid();
    ts.appendChild(Id);
    let tt = creattitle();
    ts.appendChild(tt);
    let st = creatstart();
    ts.appendChild(st);
    let Ed = creatend();
    ts.appendChild(Ed);
    let ct = creatcontent();
    ts.appendChild(ct);
    let ty = creattype();
    ts.appendChild(ty);

    let flag = judge();
    switch (flag){
        case 1:{
            let ck = creatcheck();
            ts.appendChild(ck);
            find(will_list,ts);
            break;
        }
        case 2:{
            let ck = creatcheck();
            ts.appendChild(ck);
            find(doing_list,ts);
            break;
        }
        default:{
            find(overtime_list,ts);
        }
    }
    clear();
}


//bind
confirm.addEventListener("click",creat);
cancel.addEventListener("click",clear);




//modify
function modify(){
           
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
}

//del(finish)
function del(){
    let obj = event.target;
    let p = obj.parentNode;
    p.removeChild(obj);
    let fake = p.cloneNode(true);
    p.remove(obj);
    find(done_list,fake);

}