// Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyCNiYvXdYze9dCL4oANqBigWXdMsqDte0A",
//     authDomain: "elearning-fefd0.firebaseapp.com",
//     projectId: "elearning-fefd0",
//     storageBucket: "elearning-fefd0.appspot.com",
//     messagingSenderId: "558840923885",
//     appId: "1:558840923885:web:2ffb4d2296c24b62f9eee4"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // for data base
// const db = firebase.firestore();
// db.settings({ timestampsInSnapshots: true });



    exec()
    document.getElementsByClassName("quiz-title")[0].innerHTML = `امتحان ${decodeURI(location.search.split('=')[1])}`


// DOM variables
let allAnswers = document.getElementsByClassName("answer")
let Answerbtn = document.getElementById("Answerbtn")
let result = document.getElementById("result")
let resultContent = document.getElementById("resultContent")
let profileEmail = document.getElementById("profileEmail")
let signout = document.getElementById("signout")


document.getElementById("Answerbtn").onclick = function(){
    this.style.display = "none"
  }


// My variables
let finalResult = 0;

//to know if user exists or not
// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//         profileEmail.innerHTML = user.email

//     } else {
//         // No user is signed in.
//         alert("no active user")
//     }
// });

//to sign out

// signout.addEventListener("click", () => {
//     // firebase.auth().signout();
//     auth.signOut().then(resp => {
//         location.assign("../login.html")
//     }).catch((error) => {
//         console.log(error.message)
//     })
// })



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
    }, 3000);
 
});


//event to enhance user experience
for (let i = 0; i < allAnswers.length; i++) {
    allAnswers[i].addEventListener("click", () => {
        allAnswers[i].firstElementChild.checked = true
    })
}

// function to replace english numbers with arabic ones
String.prototype.toIndiaDigits = function() {
    var id = ['۰', '۱', '۲', '۳', '٤', '۵', '٦', '۷', '۸', '۹'];
    return this.replace(/[0-9]/g, function(w) {
        return id[+w]
    });
}



// send answers
Answerbtn.addEventListener("click", () => {
    for (let i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].lastElementChild.checked) {
            allAnswers[i].classList.add("selected")
        }
        if (allAnswers[i].lastElementChild.dataset.answer == "true") {
            // allAnswers[i].style.backgroundColor = "#72e672"
            // allAnswers[i].style.color = "white"
            allAnswers[i].classList.add("right")

        }

        if ((allAnswers[i].lastElementChild.checked) && (allAnswers[i].lastElementChild.dataset.answer == "true")) {

            finalResult++

        }
    }
    result.innerHTML = finalResult.toString().toIndiaDigits()
    window.scrollTo(0, 0)
    resultContent.classList.remove("hide")
})