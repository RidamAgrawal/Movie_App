

export const movieCards=(element,start,filter)=>{

    var URL='https://script.google.com/macros/s/AKfycbz4ygYaKsvuxq6LeFR8wB5sdkbZRp7s577T3W-oXt7KARD6qeexx2rLFInbM2y91FqW/exec'; 

    URL+=`?start=${start}`;

    if(JSON.stringify(filter)!=='{}'){

        for(let i in filter){
            URL+='&';

            URL+=i+'='+filter[i];
        }
    }
    // console.log(URL);

    var promise=fetch(URL);

    promise.then((resp)=>{return resp.json();})
    .then((data)=>{
        var arr=data.data;
        for(let i=0;i<arr.length;i++){
            let itm=arr[i];
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
            btnb3.setAttribute('data-action','favorites');
            btnb1.innerHTML+=`<svg data-mh="${itm.movieHash}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="wishlist"><path data-mh="${itm.movieHash}" data-action="wishlist" d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></svg>`;
            btnb2.innerHTML+=`<svg data-mh="${itm.movieHash}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="watched"><path data-mh="${itm.movieHash}" data-action="watched" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
            btnb3.innerHTML+=`<svg data-mh="${itm.movieHash}" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="favorites"><path data-mh="${itm.movieHash}" data-action="favorites" d="m389-400 91-55 91 55-24-104 80-69-105-9-42-98-42 98-105 9 80 69-24 104ZM200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>`;
            var s1=document.createElement('span');
            s1.setAttribute('data-mh',itm.movieHash);
            s1.setAttribute('data-action','wishlist');
            s1.innerText='Add Wishlist';
            btnb1.appendChild(s1);
            var s2=document.createElement('span');
            s2.setAttribute('data-mh',itm.movieHash);
            s2.setAttribute('data-action','watched');
            s2.innerText='Add Watched';
            btnb2.appendChild(s2);
            var s3=document.createElement('span');
            s3.setAttribute('data-mh',itm.movieHash);
            s3.setAttribute('data-action','favorites');
            s3.innerText='Add Favorites';
            btnb3.appendChild(s3);

            icons.appendChild(btnb1);
            icons.appendChild(btnb2);
            icons.appendChild(btnb3);
            
            showMore.appendChild(icons);
            card.appendChild(showMore);

            element.appendChild(card);
        }
    })
    .catch((err)=>{console.log('there was an error',err);})

}
// main.innerHTML+=`<div class="card">
//             <div class="cardImage"><img src=${i.img_link} alt="moviePoster" height="100%" width="100%"></div>
//             <div class="cardDetails">
//                 <div class="title">${i.name}</div>
//                 <div class="genre">Genre: ${i.genre}</div>
//                 <div class="ratings">
//                     <div class="starRatings">
//                         <span class="material-icons">star</span>
//                         <span>${i.imdb_rating}</span>
//                     </div>
//                     <p>${i.duration} mins</p>
//                 </div>
//             </div>
//             <div class="show">
            // <div class="name">${i.name}</div>
            // <div class="cast">Cast:${i.cast}</div>
            // <div class="writer">Writer:${i.writer}</div>
            // <div class="director">Director:${i.director}</div>
            // <div><p class="about">About:${i.info}</p><p class="year">Year:${i.year}</p></div>
            // <div class="icons">
            //     <button data-action="wishlist"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="wishlist"><path data-action="wishlist" d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></svg><span data-action="wishlist">Add Wishlist</span></button>
            //     <button data-action="watched"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="watched"><path data-action="watched" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg><span data-action="watched">Add Watched</span></button>
            //     <button data-action="favorites"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" data-action="favorites"><path data-action="favorites" d="m389-400 91-55 91 55-24-104 80-69-105-9-42-98-42 98-105 9 80 69-24 104ZM200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg><span data-action="favorites">Add Favorites</span></button>
            // </div>
            // </div>
//         </div>`;