
var PageTitle=document.URL.split('=')[1]

document.title=`${PageTitle} |MovieApp`;

var body=document.querySelector('.body');

var navBar=document.querySelector('.navBar');

// var modal=document.querySelector('.modal');
// var login=document.querySelector('.login');
// var register=document.querySelector('.register');

var search=document.querySelector('.search');

var sideBar=document.querySelector('.sideBar');

var filtered=document.querySelector('.filtered');

var indexBar=document.querySelector('.indexBar');

var main=document.querySelector('.mainContainer');

var mainContainer=document.querySelector('.mainContainer');

let arr=navBar.children[3].children;
navBar.removeChild(search);

for(let i=0;i<arr.length;i++){
    if(arr[i].dataset.action===PageTitle){
        arr[i].style.backgroundColor='#064663';
    }
    else{arr[i].style.backgroundColor='';}
}

var loginStatus=JSON.parse(localStorage.getItem('login'));

showUsers();

function showUsers(){
    var url='https://script.google.com/macros/s/AKfycbw8kvWm_BI8YMB8h4CsmFXwm2JK-aALpgSBD9zu2BKBw3RMXeB7Lr4kTt9yoZnnnfkyrw/exec';

    var obj={
        type:`${PageTitle}`,
        userHash:loginStatus.userHash
    }
    // console.log(`fetching your ${PageTitle}`,obj);

    url+=`?type=${PageTitle}&userHash=${loginStatus.userHash}`;

    // console.log(url);
    //making get request for getting users wishlist favorites watched 
    let p=fetch(url)
    .then((resp)=>resp.json())
    .then((data)=>{
        var arr=data.data;
        console.log(arr);

        for(let i=0;i<arr.length;i++){
            let itm=arr[i];
            if(itm[`${PageTitle}`]===false){continue;}
            var card=document.createElement('div');
            card.classList.add('card');
            var cardImg=document.createElement('div');
            cardImg.classList.add('cardImage');
            var img=document.createElement('img');
            img.classList.add('cardImg');
            img.setAttribute('src',`${itm.img_link}`);
            img.setAttribute('alt',`${itm.name}`);
            img.setAttribute('onerror',`this.onerror=null; this.src='./asset/posterNA.jpg';`);
            img.setAttribute('height','100%');
            img.setAttribute('width','100%');
            cardImg.appendChild(img);
            card.appendChild(cardImg);
            var cardDetails=document.createElement('div');
            cardDetails.classList.add('cardDetails');
            var title=document.createElement('div');
            title.classList.add('title');
            title.innerText=`${itm.name}`;
            cardDetails.appendChild(title);
            var genre=document.createElement('div');
            genre.classList.add('genre');
            genre.innerText=`Genre: ${itm.genre}`;
            cardDetails.appendChild(genre);
            var ratings=document.createElement('div');
            ratings.classList.add('ratings');
            var starRatings=document.createElement('div');
            starRatings.classList.add('starRatings');
            var star=document.createElement('span');
            star.classList.add('material-icons');
            star.innerText='star';
            starRatings.appendChild(star);
            var rating=document.createElement('span');
            rating.innerText=`${itm.imdb_rating}`;
            starRatings.appendChild(rating);
            ratings.appendChild(starRatings);
            var duration=document.createElement('p');
            duration.innerText=`${itm.duration} mins`;
            ratings.appendChild(duration);
    
            cardDetails.appendChild(ratings);
            card.appendChild(cardDetails);

            var showMore=document.createElement('div');
            showMore.classList.add('show');
            var sname=document.createElement('div');
            sname.innerText=`${itm.name}`;
            showMore.appendChild(sname);
            var cast=document.createElement('div');
            cast.classList.add('cast');
            var t=document.createElement('p');
            t.innerText='Cast';
            cast.appendChild(t);
            let a=itm.cast_name.split(',',3);
            cast.innerHTML+=`${a.map(i=>'<a href="https://www.google.com/search?q='+i.split(' ').join('+')+'">'+i+'</a>')}`;
            cast.innerHTML+=`<a href="https://www.google.com/search?q=cast+of+${itm.name}"> ...</a>`;
            
            showMore.appendChild(cast);
            var wtr=document.createElement('div');
            wtr.classList.add('writer');
            var t=document.createElement('p');
            t.innerText='Writer';
            wtr.appendChild(t);
            a=itm.writer_name.split(',');
            wtr.innerHTML+=`${a.map(i=>'<a href="https://www.google.com/search?q='+i.split(' ').join('+')+'">'+i+'</a>')}`;
            showMore.appendChild(wtr);
            var dir=document.createElement('div');
            dir.classList.add('director');
            var t=document.createElement('p');
            t.innerText='Director';
            dir.appendChild(t);
            dir.innerHTML+=`${itm.director_name}`;
            showMore.appendChild(dir);
            var about=document.createElement('div');
            var abt=document.createElement('p');
            abt.classList.add('about');
            abt.innerHTML=`<p>About</p>${itm.about}`;
            var year=document.createElement('p');
            year.classList.add('year');
            year.innerHTML=`<p>Year</p>${itm.year}`;
            about.appendChild(abt);
            about.appendChild(year);
            showMore.appendChild(about);

            var icons=document.createElement('div');
            icons.classList.add('icons');
            var btnb1=document.createElement('button');
            btnb1.setAttribute('data-mh',itm.movieHash);
            btnb1.setAttribute('data-action','wishlist');
            var btnb2=document.createElement('button');
            btnb2.setAttribute('data-mh',itm.movieHash);
            btnb2.setAttribute('data-action','watched');
            var btnb3=document.createElement('button');
            btnb3.setAttribute('data-mh',itm.movieHash);
            btnb3.setAttribute('data-action','favorites ');
            btnb1.innerHTML+=(!itm.wishlist)?`<svg data-mh="${itm.movieHash}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="wishlist"><path data-mh="${itm.movieHash}" data-action="wishlist" d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></svg>`:`<svg data-mh="${itm.movieHash}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="wishlist"><path data-mh="${itm.movieHash}" data-action="wishlist" d="m576-80-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104L576-80ZM120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Z"/></svg>`;
            btnb2.innerHTML+=(!itm.watched)?`<svg data-mh="${itm.movieHash}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="watched"><path data-mh="${itm.movieHash}" data-action="watched" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`:`<svg data-mh="${itm.movieHash}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="watched"><path data-mh="${itm.movieHash}" data-action="watched" d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800l240 240H160v320h560l80 80H160Zm711-44-71-71v-285H514L274-800h66l67 133 27 27h106l-80-160h100l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 10-2 19t-7 17ZM791-55 55-791l57-57 736 736-57 57ZM446-400Zm211-18Z"/></svg>`;
            btnb3.innerHTML+=(!itm.favorites)?`<svg data-mh="${itm.movieHash}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="favorites"><path data-mh="${itm.movieHash}" data-action="favorites" d="m389-400 91-55 91 55-24-104 80-69-105-9-42-98-42 98-105 9 80 69-24 104ZM200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>`:`<svg data-mh="${itm.movieHash}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="favorites"><path data-mh="${itm.movieHash}" data-action="favorites" d="M840-680H600v-80h240v80ZM200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Z"/></svg>`;
            var s1=document.createElement('span');
            s1.setAttribute('data-mh',itm.movieHash);
            s1.setAttribute('data-action','wishlist');
            s1.innerText=(itm.wishlist)?'Remove Wishlist':'Add Wishlist';
            btnb1.appendChild(s1);
            var s2=document.createElement('span');
            s2.setAttribute('data-mh',itm.movieHash);
            s2.setAttribute('data-action','watched');
            s2.innerText=(itm.watched)?'Remove Watched':'Add Watched';
            btnb2.appendChild(s2);
            var s3=document.createElement('span');
            s3.setAttribute('data-mh',itm.movieHash);
            s3.setAttribute('data-action','favorites');
            s3.innerText=(itm.favorites)?'Remove Favorites':'Add Favorites';
            btnb3.appendChild(s3);

            icons.appendChild(btnb1);
            icons.appendChild(btnb2);
            icons.appendChild(btnb3);
            
            showMore.appendChild(icons);
            card.appendChild(showMore);

            mainContainer.appendChild(card);
        }
        if(mainContainer.innerText===''){
            mainContainer.classList.toggle('mainContainer');
            mainContainer.classList.toggle('mainContainerEmpty');
            mainContainer.innerHTML=`Your ${PageTitle} is empty!`;
        }
    });

}

document.addEventListener('click',(event)=>{
    console.log(event.target);
    //closing sideBar
    if(body.classList.value.includes('show')&&((!sideBar.contains(event.target))&&(event.target.dataset.action!=='menu'))){
        //closing the sideBar automatically
        body.classList.remove('show');
        body.classList.add('hide');
        sideBar.style.display='none';
    }
    // if(modal.style.display==='block'&&(!modal.children[0].contains(event.target))){
    //     //closing the modal automatically
    //     modal.style.display='none';
    //     modal.children[0].children[1].style.display='none';
    //     modal.children[0].children[2].style.display='none';
    // }

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
        //No search option for this page
        // else if(event.target.dataset.action==='search'){
        //     let par=event.target;
        //     while(par.classList!='search'){par=par.parentElement;}
        //     if(par.children[0].value){
        //         //set currentPage to zero
        //         currentPage=0;
        //         filter.search=par.children[0].value;
        //         showMovies(filter);
        //     }
        // }
        else if(event.target.dataset.action==='login'){

            modal.style.display='block';
            modal.children[0].children[1].style.display='block';
            modal.children[0].children[2].style.display='none';
            //setting color modalheader login
            modal.children[0].children[0].children[0].classList.toggle('active',true);
            modal.children[0].children[0].children[0].classList.toggle('deactive',false);
            modal.children[0].children[0].children[1].classList.toggle('deactive',true);
            modal.children[0].children[0].children[1].classList.toggle('active',false);
        }
        else if(event.target.dataset.action==='signup'){

            modal.style.display='block';
            modal.children[0].children[2].style.display='block';
            modal.children[0].children[1].style.display='none';
            
            modal.children[0].children[0].children[0].classList.toggle('deactive',true);
            modal.children[0].children[0].children[0].classList.toggle('active',false);
            modal.children[0].children[0].children[1].classList.toggle('active',true);
            modal.children[0].children[0].children[1].classList.toggle('deactive',false);
        }
        else{
            // if(event.target.dataset.action){window.open(`${event.target.dataset.action}.html`,'_blank');}
            if(event.target.dataset.action&&event.target.dataset.action!==PageTitle){
                if(event.target.dataset.action==='home'){
                    window.open(`index.html`,'_blank');
                }
                window.open(`users.html?page=${event.target.dataset.action}`,'_blank');
            }
        }
    }
    //No modal for this page
    // else if(modal.contains(event.target)){
    //     if(event.target.dataset.action==='login'){
    //         modal.style.display='block';
    //         modal.children[0].children[1].style.display='block';
    //         modal.children[0].children[2].style.display='none';
    //         //setting color modalheader login
    //         modal.children[0].children[0].children[0].classList.toggle('deactive',false);
    //         modal.children[0].children[0].children[0].classList.toggle('active',true);
    //         modal.children[0].children[0].children[1].classList.toggle('active',false);
    //         modal.children[0].children[0].children[1].classList.toggle('deactive',true);
    //     }
    //     else if(event.target.dataset.action==='signup'){
    //         modal.style.display='block';
    //         modal.children[0].children[2].style.display='block';
    //         modal.children[0].children[1].style.display='none';
    //         modal.children[0].children[0].children[0].classList.toggle('deactive',true);
    //         modal.children[0].children[0].children[0].classList.toggle('active',false);
    //         modal.children[0].children[0].children[1].classList.toggle('active',true);
    //         modal.children[0].children[0].children[1].classList.toggle('deactive',false);
    //     }
    //     else if(event.target.dataset.action==='close'){
    //         modal.style.display='none';
    //         modal.children[0].children[1].style.display='none';
    //         modal.children[0].children[2].style.display='none';
    //     }
    //     else if(event.target.dataset.action==='loginSubmit'){
    //         var obj={nameoremail:document.getElementById('nameoremail').value,password:document.getElementById('loginPassword').value};
            
    //         var url='https://script.google.com/macros/s/AKfycbxAhPOgt-5bH66Qx8idEbyf4PAS20LGvlfd8vN5RZMDNEsWFCEfAt_RcFhFM8jWzHxOFQ/exec';

    //         url+='?nameoremail='+obj.nameoremail+'&password='+obj.password;
    //         console.log("url to be fetched ",url);
            
    //         let p = fetch(url).then((resp)=>resp.json())
    //         .then((data)=>{
    //             console.log(data);
    //             loginStatus=data;
    //             console.log(loginStatus);

    //             if(loginStatus.found){
    //                 loginStatus.username=obj.nameoremail;
    //                 localStorage.setItem('login',JSON.stringify(loginStatus));
    //                 location.reload();
    //             }
    //         });
    //     }
    //     else if(event.target.dataset.action==='signupSubmit'){
    //         var obj={username:document.getElementById('signupName').value,useremail:document.getElementById('signupEmail').value,password:document.getElementById('signupPassword').value};
    //         var url='https://script.google.com/macros/s/AKfycbxAhPOgt-5bH66Qx8idEbyf4PAS20LGvlfd8vN5RZMDNEsWFCEfAt_RcFhFM8jWzHxOFQ/exec';
    //         console.log(obj);

    //         let p = fetch(url,{
    //             method:'POST',
    //             body:JSON.stringify(obj)
    //         }).then((resp)=>resp.text())
    //         .then((data)=>{
    //             console.log(data);
    //         });
    //     }
    // }

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
            
            console.log(` ${event.target.dataset.action}`);
            var obj={
                userHash:loginStatus.userHash,movieHash:Number(event.target.dataset.mh)
                ,wishlist:(event.target.dataset.action==='wishlist')?true:false
                ,watched:(event.target.dataset.action==='watched')?true:false
                ,favorites:(event.target.dataset.action==='favorites')?true:false
            }
            // console.log(obj);
            var url='https://script.google.com/macros/s/AKfycbw8kvWm_BI8YMB8h4CsmFXwm2JK-aALpgSBD9zu2BKBw3RMXeB7Lr4kTt9yoZnnnfkyrw/exec';
            //making post request to add users movie
            let p=fetch(url,{
                method:"POST",
                body:JSON.stringify(obj)
            })
            .then((resp)=>resp.text())
            .then((data)=>{console.log(`item has been added to ${event.target.dataset.action} `,data);location.reload();});
        }

    }
});