// document.getElementById("signin").onclick = ()=>{location.replace("login.html")};
// document.getElementById("signup").onclick = ()=>{location.replace("register.html")};
// document.getElementById("courses-page").onclick = ()=>{location.replace("search.html")};

let myNav = document.querySelector(".header");
// let signout = document.getElementById("signout")

window.onscroll = function () { 
    if (window.scrollY > 10 ) {
       // console.log(window.scrollY)
        myNav.classList.add("background");
        myNav.classList.remove("color");
    } 
    else {
        myNav.classList.remove("background");
        myNav.classList.add("color");
    }
};

window.onscroll = function(){
    if(window.pageYOffset >=600){
        document.getElementById("goUp").style.display = "block"
    }else{
        document.getElementById("goUp").style.display = "none"
    }
}

$(document).ready(function() {
 
    setTimeout(function(){
        $('body').addClass('loaded');
        $('h1').css('color','#222222');
        AOS.init();

    }, 3000);
 
});

//slide show
// var imges= ['images/public/slider1.png','images/public/slider2.png','images/public/slider5.png','images/public/slider6.png','images/public/slider7.png'];
// var i = 0;

// var slideShow =  function(){
//     document.slideshow.src = imges[i];
//     // document.getElementById("img").style.animation="fadeIn"
//     // document.getElementById("img").style.animationIterationCount="infinite"
//     if( i < imges.length - 1){
//         i++;
//     }else{
//         i=0;
//     }

//     setTimeout("slideShow()",3000);
// }
// slideShow();



/****************************************************************************** */
// handel the articals 
var artical_1 = document.getElementById("artical1")
var artical_2 = document.getElementById("artical2")
var artical_3 = document.getElementById("artical3")
artical_1.onclick = function(){
    localStorage.setItem("artical","one")
    location.replace("artical.html")
}
artical_2.onclick = function(){
    localStorage.setItem("artical","two")
    location.replace("artical.html")
}
artical_3.onclick = function(){
    localStorage.setItem("artical","three")
    location.replace("artical.html")
}