
// import { movies } from "./db/MOVIES.js";
import {movieCards} from "./showMovieCards.js";

var body=document.querySelector('.body');

var navBar=document.querySelector('.navBar');

var modal=document.querySelector('.modal');
var allCautions=document.getElementsByClassName('cautions');
var nameRegexp=/^[a-z]+$/;
var emailRegexp=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// var login=document.querySelector('.login');
// var register=document.querySelector('.register');

var search=document.querySelector('.search');

var sideBar=document.querySelector('.sideBar');

var filtered=document.querySelector('.filtered');

var indexBar=document.querySelector('.indexBar');

var notificationBar=document.querySelector('.notificationBar');

var main=document.querySelector('.mainContainer');

var currentPage=0,lastPage=Math.ceil(250/10);

var loginStatus=JSON.parse(localStorage.getItem('login'))||{found:false,userHash:null};

var filter={};

// const dat = movies.map((item)=>{return item}); //when was using ./db/MOVIES.js to get data
// console.log(dat);

navBar.children[3].children[0].style.backgroundColor='#064663';  //setting color of home on navbar as activated

chk();
showMovies(filter);

function showMovies(filter){
    main.innerHTML='';
    movieCards(main, (currentPage*10)+0,filter);

    if(currentPage===0){indexBar.children[0].style.display='none';}
    else{indexBar.children[0].style.display='block';}

    indexBar.children[1].innerText=`${currentPage+1}`;
    indexBar.children[1].dataset.action=`${currentPage+1}`;

    indexBar.children[2].innerText=`${currentPage+2}`;
    indexBar.children[2].dataset.action=`${currentPage+2}`;

    if(Number.parseFloat(currentPage+1)>=Number.parseFloat(lastPage)){indexBar.children[2].style.display='none';}
    else{indexBar.children[2].style.display='block';}

    indexBar.children[3].innerText=`${currentPage+3}`;
    indexBar.children[3].dataset.action=`${currentPage+3}`;

    if(Number.parseFloat(currentPage+2)>=Number.parseFloat(lastPage)){indexBar.children[3].style.display='none';}
    else{indexBar.children[3].style.display='block';}

    indexBar.children[4].innerText=`${currentPage+4}`;
    indexBar.children[4].dataset.action=`${currentPage+4}`;

    if(Number.parseFloat(currentPage+3)>=Number.parseFloat(lastPage)){indexBar.children[4].style.display='none';}
    else{indexBar.children[4].style.display='block';}

    if(currentPage===lastPage-1){
        indexBar.children[5].style.display='none';
        indexBar.children[6].style.display='none';
    }else{
        indexBar.children[5].style.display='block';
        indexBar.children[6].style.display='block';
    }
}

function chk(){
    if(loginStatus.found){
        var logBtn=navBar.children[3].children[6];
        var regBtn=navBar.children[3].children[7];

        logBtn.removeAttribute('data-action');
        logBtn.setAttribute('data-action','logout');
        logBtn.innerHTML='<svg data-action="logout" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path data-action="logout" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg><span data-action="logout">Logout</span>';

        regBtn.removeAttribute('data-action');
        regBtn.setAttribute('data-action','unregister');
        regBtn.innerHTML=`<svg data-action="unregister" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path data-action="unregister" d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg><span data-action="unregister">${loginStatus.username}</span>`;

    }
    else{
        var logBtn=navBar.children[3].children[6];
        var regBtn=navBar.children[3].children[7];

        logBtn.removeAttribute('data-action');
        logBtn.setAttribute('data-action','login');
        logBtn.innerHTML='<svg data-action="login" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path data-action="login" d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg><span data-action="login">Login</span>';

        regBtn.removeAttribute('data-action');
        regBtn.setAttribute('data-action','signup');
        regBtn.innerHTML=`<svg data-action="signup" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path data-action="signup" d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg><span data-action="signup">Signup</span>`;
    }
}

let timerId;
search.children[0].addEventListener('keyup',(event)=>{
    var obj={search:event.target.value};
    filter.search=event.target.value;
    if(event.key==='Enter'){
        currentPage=0;
        showMovies(filter);
    }

    clearTimeout(timerId); //clearTimeout pichle timeoutfunction ko erase ya stop kr deta he 
    timerId=setTimeout(()=>{showMovies(filter)},1000); //yaha par ek naya setTimeout function set kiya ja rha h
});

// function debounce(callback,delay){
//     let timerId;

//     return (...args)=>{
//         clearTimeout(timerId);
//         timerId=setTimeout(()=>{callback(...args)},delay);
//     };
// }


function addFiltered(ele){
    let svg=ele.lastChild;
    ele.removeChild(svg);
    ele.innerHTML+=`<svg ${ele.attributes[0].nodeName}=${ele.attributes[0].nodeValue} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path ${ele.attributes[0].nodeName}=${ele.attributes[0].nodeValue} d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path ${ele.attributes[0].nodeName}=${ele.attributes[0].nodeValue} d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>`;
    filtered.appendChild(ele);
}
function removeFiltered(ele){
    let svg=ele.lastChild;
    ele.removeChild(svg);
    ele.innerHTML+=`<svg ${ele.attributes[0].nodeName}=${ele.attributes[0].nodeValue} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path ${ele.attributes[0].nodeName}=${ele.attributes[0].nodeValue} d="M0 0h24v24H0V0z" fill="none"/><path ${ele.attributes[0].nodeName}=${ele.attributes[0].nodeValue} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>`;
    console.log(ele,ele.attributes[0].nodeName);
    if(ele.attributes[0].nodeName==='data-rating'){sideBar.children[4].appendChild(ele);}
    else{sideBar.children[7].appendChild(ele);}
}


document.addEventListener('click',(event)=>{
    // console.log(event.target);
    //closing notificationBar
    if(notificationBar.contains(event.target)){
        if(event.target.dataset.action==='close'){
            console.log('closing');
            closeNotificationBar();
        }
        return;
    }
    if(body.classList.value.includes('show')&&((!sideBar.contains(event.target))&&(event.target.dataset.action!=='menu'))){
        //closing the sideBar automatically
        console.log(event.target);
        body.classList.remove('show');
        body.classList.add('hide');
        sideBar.style.display='none';
        return;
    }
    if(modal.style.display==='block'&&(!modal.children[0].contains(event.target))){
        //closing the modal automatically
        modalClose();
        return;
    }

    if(navBar.contains(event.target)){

        if(event.target.dataset.action==='menu'){
            if(body.classList.value.includes('show')){
                body.classList.remove('show');
                body.classList.add('hide');
                sideBar.style.display='none';
            }else{
                body.classList.remove('hide');
                body.classList.add('show');
                sideBar.style.display='flex';
            }
        }
        else if(event.target.dataset.action==='search'){
            let par=event.target;
            while(par.classList!='search'){par=par.parentElement;}
            if(par.children[0].value){
                //set currentPage to zero
                currentPage=0;
                filter.search=par.children[0].value;
                showMovies(filter);
            }
        }
        else if(event.target.dataset.action==='login'){
            openLogin();
        }
        else if(event.target.dataset.action==='signup'){
            openSignup();
        }
        else if(event.target.dataset.action==='logout'){
            //first display the notification Bar to ask for logout
            loginStatus.username=undefined;
            loginStatus.found=false;
            localStorage.removeItem('login');
            //display the notification Bar with successful logout
            chk();
        }
        else if(event.target.dataset.action==='unregister'){
            //this event will occur only when user is already loggedin 
            // and i want him to provide functionality to edit his profile(change username or password)
        }
        else{
            if(event.target.dataset.action&&event.target.dataset.action!=='home'){
                if(loginStatus.found){
                    // window.open(`${event.target.dataset.action}.html`,'_blank');
                    window.open(`users.html?page=${event.target.dataset.action}`,'_blank');
                }
                else{
                    showNotificationBar('alert','Log-in Required','Please Log-in first in order to view your collections');
                    openLogin();
                }
            }
        }
    }

    else if(modal.contains(event.target)){
        if(event.target.dataset.action==='login'){
            openLogin();
        }
        else if(event.target.dataset.action==='signup'){
            openSignup();
        }
        else if(event.target.dataset.action==='close'){
            modalClose();
        }
        else if(event.target.dataset.action==='loginSubmit'){
            var obj={nameoremail:document.getElementById('nameoremail').value,password:document.getElementById('loginPassword').value};
            var url='https://script.google.com/macros/s/AKfycbxAhPOgt-5bH66Qx8idEbyf4PAS20LGvlfd8vN5RZMDNEsWFCEfAt_RcFhFM8jWzHxOFQ/exec';
            
            url+='?nameoremail='+obj.nameoremail+'&password='+obj.password;
            console.log("url to be fetched ",url);
            
            let p = fetch(url).then((resp)=>resp.json())
            .then((data)=>{
                console.log(data);
                loginStatus=data;
                console.log(loginStatus);
                
                if(loginStatus.found){
                    loginStatus.username=obj.nameoremail;
                    localStorage.setItem('login',JSON.stringify(loginStatus));
                    //close the modal display the notification bar and say successfull login
                    modalClose();
                    showNotificationBar('success','Logged In','Yay! You are logged in successfully');
                    chk();
                }
                else{
                    showNotificationBar('danger','Wrong Credentials','Either Username or password is incorrect');
                }
                document.getElementById('loginPassword').value='';
            });
        }
        else if(event.target.dataset.action==='signupSubmit'){
            //DataValidation before register Validate(signupName,signupEmail,signupPassword);
            //if valid else close modal and open notification Bar with danger mode
            var nm=document.getElementById('signupName').value;
            var em=document.getElementById('signupEmail').value;
            var pw=document.getElementById('signupPassword').value;
            if(DataValidation(nm,em,pw)){
                var obj={username:nm,useremail:em,password:pw};
                var url='https://script.google.com/macros/s/AKfycbxAhPOgt-5bH66Qx8idEbyf4PAS20LGvlfd8vN5RZMDNEsWFCEfAt_RcFhFM8jWzHxOFQ/exec';
                console.log(obj);

                let p = fetch(url,{
                    method:'POST',
                    body:JSON.stringify(obj)
                }).then((resp)=>resp.text())
                .then((data)=>{
                    console.log(data);
                });
                //close the modal display the notification for succesfull register 
                modalClose();
                showNotificationBar('success','Signed Up','Yay! You are registered successfully\nNow you can Log in to add movies');
            }
        }
        else if(event.target.dataset.action==='show'){
            var inputEle=document.getElementById(event.target.dataset.mode+'Password');
            if(inputEle.getAttribute("type")==='text'){inputEle.setAttribute("type","password");}
            else{inputEle.setAttribute("type","text");}
        }
    }

    else if(sideBar.contains(event.target)){
        var ele=event.target;
        if(ele===sideBar){return;}
        while(ele.localName!=='button'){ele=ele.parentNode;}

        // console.log(ele.attributes[0].nodeName);

        if(filtered.contains(ele)){
            filtered.removeChild(ele);
            removeFiltered(ele);
            let nwFilter=filter[ele.attributes[0].nodeName].split(',').filter(i=>i!==ele.attributes[0].nodeValue).join(',');
            if(nwFilter.length!==0){
                filter[ele.attributes[0].nodeName]=nwFilter;
            }else{
                filter[ele.attributes[0].nodeName]=undefined;
            }
        }
        else{
            addFiltered(ele);
            if(filter[ele.attributes[0].nodeName]){filter[ele.attributes[0].nodeName]+=','+ele.attributes[0].nodeValue;}
            else{filter[ele.attributes[0].nodeName]=ele.attributes[0].nodeValue;}
        }

        currentPage=0;
        showMovies(filter);
    }

    else if(indexBar.contains(event.target)){
        let pageReq=event.target.dataset.action;
        if(pageReq==='previous'){
            if(currentPage!==0){
                currentPage--;
            }
        }
        else if(pageReq==='next'){
            if(currentPage!==lastPage-1){
                currentPage++;
            }
        }
        else if(pageReq==='last'){
            currentPage=lastPage-1;
        }
        else if(pageReq==='first'){
            currentPage=0;
        }
        else{
            pageReq=Number(pageReq)-1;
            // console.log(pageReq);
            if(pageReq<lastPage){
                currentPage=pageReq;
            }
        }
        showMovies(filter);
    }
    else if(main.contains(event.target)){

        if(event.target.dataset.action==='wishlist'||event.target.dataset.action==='watched'||event.target.dataset.action==='favorites'){
            if(loginStatus.found){
                // console.log(`adding to ${event.target.dataset.action}`);
                var obj={
                    userHash:loginStatus.userHash,movieHash:Number(event.target.dataset.mh)
                    ,wishlist:(event.target.dataset.action==='wishlist')?true:false
                    ,watched:(event.target.dataset.action==='watched')?true:false
                    ,favorites:(event.target.dataset.action==='favorites')?true:false
                }
                // console.log(obj);
                var ele=event.target;
                while(!ele.classList.contains('card')){ele=ele.parentNode;}

                var url='https://script.google.com/macros/s/AKfycbw8kvWm_BI8YMB8h4CsmFXwm2JK-aALpgSBD9zu2BKBw3RMXeB7Lr4kTt9yoZnnnfkyrw/exec';

                let p=fetch(url,{
                    method:"POST",
                    body:JSON.stringify(obj)
                })
                .then((resp)=>resp.text())
                .then((data)=>{
                    // console.log(`item has been added to ${event.target.dataset.action} `,data);
                    showNotificationBar('success','Added',`${ele.children[1].children[0].innerText} is added to ${event.target.dataset.action}`);
                });
            }else{
                showNotificationBar('alert','Login','Please Login in order to add');
                openLogin();
            }
        }
    }
});

function openLogin(){
    modal.style.display='block';
    modal.children[0].children[1].style.display='grid';
    modal.children[0].children[2].style.display='none';
    //setting color modalheader login
    modal.children[0].children[0].children[0].classList.toggle('active',true);
    modal.children[0].children[0].children[0].classList.toggle('deactive',false);
    modal.children[0].children[0].children[1].classList.toggle('deactive',true);
    modal.children[0].children[0].children[1].classList.toggle('active',false);
}
function openSignup(){
    modal.style.display='block';
    modal.children[0].children[2].style.display='grid';
    modal.children[0].children[1].style.display='none';
    modal.children[0].children[0].children[0].classList.toggle('deactive',true);
    modal.children[0].children[0].children[0].classList.toggle('active',false);
    modal.children[0].children[0].children[1].classList.toggle('active',true);
    modal.children[0].children[0].children[1].classList.toggle('deactive',false);
}
function modalClose(){
    modal.style.display='none';
    modal.children[0].children[1].style.display='none';
    modal.children[0].children[2].style.display='none';
}
var hideNotification=undefined;

function showNotificationBar(mode,Title,Body){
    if(!hideNotification){
        notificationBar.children[0].children[0].innerText=Title;
        notificationBar.children[1].innerText=Body;
        console.log('notification bar opens');
        notificationBar.classList.remove('alert');
        notificationBar.classList.remove('danger');
        notificationBar.classList.remove('success');
        notificationBar.classList.toggle('show');
        notificationBar.classList.toggle(mode);
        hideNotification=setTimeout(hideNotificationBar,3000);
    }
}
function hideNotificationBar(){
    // notificationBar.innerText='hiding';
    console.log('notification bar closes');
    notificationBar.classList.toggle('show');
    clearTimeout(hideNotification);
    hideNotification=undefined;
}
function closeNotificationBar(){
    if(hideNotification){
        notificationBar.classList.toggle('show');
        clearTimeout(hideNotification);
        hideNotification=undefined;
    }
}

function DataValidation(name,email,password){
    var f=true;
    var cautions=new Set();
    if(name){
        if(name.length<3){cautions.add('nameLength');}
        for(let i=0;i<name.length;i++){
            if(!((name.charCodeAt(i)>=65&&name.charCodeAt(i)<=90)||(name.charCodeAt(i)>=97&&name.charCodeAt(i)<=122))){
                cautions.add('alpha');break;
            }
        }
    }else{
        cautions.add('name');
    }
    if(email){
        if(!emailRegexp.test(email)){cautions.add('validEmail');}        
    }
    else{cautions.add('email');}
    if(password){
        if(password.length<8){cautions.add("length");}
        if(!(/[a-z]/.test(password))){cautions.add('low');}
        if(!(/[A-Z]/.test(password))){cautions.add('up');}
        if(!(/[0-9]/.test(password))){cautions.add('num');}
        if(!(/[0-9]/.test(password))){cautions.add('num');}
        if(!(/[!@#$%^&*()_+{}\[\]:;<>,.?/~]/.test(password))){cautions.add('spl');}
    }
    else{
        cautions.add('pass');
    }
    for(let i in allCautions){
        if(allCautions[i]&&allCautions[i].dataset&& cautions.has(allCautions[i].dataset.errname)){
            allCautions[i].style.display='block';
            f=false;
        }
    }
    return f;
}