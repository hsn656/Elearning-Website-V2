(function(){
    var courseName = ''
    var quizCourse=''
    // console.log(decodeURI(location.search.split('=')[1]))

    courseCollection.limit(4).get()
    .then(res =>{
        res.docs.forEach((d) => {
            document.getElementsByClassName("courses-aside")[0].innerHTML+=
            `
            
            <div class="d-flex mt-2 justify-content-between">
            <div>
                <img class="shadow" src="./images/server_content/courses/${d.data().img}" width="80"
                    height="80">
            </div>
            <div>
                <p class="text-right pt-2">${d.data().name}</p>
                <div class="text-right">
                <i class="fas fa-school"></i>
                    
                </div>
            </div>
        </div>`;
          });
          document.getElementsByClassName("courses-aside")[0].innerHTML+=`
          <button onclick="location.assign('./')" class="btn btn-info w-100 py-2 my-4">تصفح دوراتنا</button>
          `
    })

    courseCollection.doc(decodeURI(location.search.split('=')[1])).get()
        .then(res=> {
            console.log(res.data())
            // var repeatedStr = `<li><i class="fas fa-star"></i></li>`
            courseName = res.data().name
            document.getElementById("courseImg").src=`images/server_content/courses/${res.data().img}`
            document.getElementsByClassName("course-name")[0].innerHTML= `رحيق النحو: ${res.data().name}` 
            document.getElementById("attendance").innerHTML = Math.floor(Math.random() * 20) + 10;
            document.getElementById("durationNumber").innerHTML = Math.floor(Math.random() * 10) + 5;
            // document.getElementById("rate-number").innerHTML = res.data().rating
            document.getElementById("desc-text").innerHTML = res.data().description
            // document.getElementsByClassName("rating-stars")[0].innerHTML=repeatedStr.repeat(res.data().rating)
            quizCourse=res.data().exam
        }).catch(err => console.error(err))

    lessonCollection.where("courseID", "==", decodeURI(location.search.split('=')[1])).orderBy('img', 'asc').get()
        .then(res=> {
            var tmp=``
            document.getElementById("lessonNumber").innerHTML=res.docs.length
            res.docs.forEach((data) => {
                // console.log(data.data())
                tmp+=`
                
                <div>
                <div class="d-flex justify-content-between mt-3">
                    <div>
                        <button onclick="getSpecificLesson('${data.id}', '${data.data().videoLink}')" class="btn btn-info">الذهاب الآن</button>
                    </div>
                    <p>
                        <a class="text-decoration-none text-dark">${data.data().name}</a>
                        <i class="fa fa-file-text-o text-info" style="font-size:20px"> </i>
                    </p>
                </div>
            </div>`
            });
            console.log(quizCourse)
            tmp+=`
            
            <button onclick="location.assign('./${quizCourse}?name=${courseName}')" class="btn btn-info w-100 py-3  my-4">
                <p class="h4">الاختبار علي الدورة</p>
            </button>`

            document.getElementsByClassName("lessons")[0].innerHTML=tmp

        })

})()




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

