(function () {
    // <h4>${d.data().name}</h4>
    lessonCollection.orderBy("name", "asc").limit(9).get()
        .then(res =>{
            res.docs.forEach((d) => {
                document.getElementsByClassName("trending-courses")[0].innerHTML+=
                `
                <div data-aos="fade-in" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" class="col-lg-4 col-sm-12 mb-5">
                <div class="card p-3 m-auto" style="width: 18rem;">
                    <img  src="images/server_content/lessons/${d.data().img}" class="card-img-top shadow bg-white rounded" alt="..." >
                    <div class="card-body">
                        <h5 class="card-title text-right mt-3">
                        ${d.data().name}
                        </h5>
                        <button href=" #" class=" card-title btn btn-info"onclick="getSpecificLesson('${d.id}', '${d.data().videoLink}')">ابدأ الآن</button>

                    </div>
                </div>
            </div>`;
                // d.data()
              });
        })
    //////////////////////////////////////////////
    courseCollection.limit(4).get()
    .then(res =>{
        res.docs.forEach((d) => {
            document.getElementsByClassName("tracks-slider")[0].innerHTML+=
            `
            <div class="col-lg-3 col-sm-12 mb-4">
                <div class="card h-100">
                    <img src="./images/server_content/courses/${d.data().img}"class="card-img-top" alt="...">
                    <div class="card-img-overlay ml-auto mr-auto h-100">
                        <a href=" #"  class="btn btn-dark mb-1"onclick="getSpecificCourse('${d.id}')">التفاصيل</a>
                    </div>
                    <div class="card-body middle1">
                        <h5 class="card-title text-right">
                            ${d.data().name}                
                        </h5>
                    </div>
                </div>
            </div>`;
          });
    })
    // commentCollection.orderBy("user_name", "asc").limit(1).get().then(res=>{
    //    // console.log(res.docs[0].data())
    //     // document.getElementById("imgComment").src = res.docs[0].data().user_image
    //     document.getElementById("nameComment").innerHTML = res.docs[0].data().user_name
    //     // document.getElementById("contentComment").innerHTML = res.docs[0].data().content
    // })
    
})()

function getSpecificCourse(id){
    location.assign("./course_details.html?id="+id)
}

function getSpecificLesson(id, q){
    redirectIfAuth(`./lesson.html?id=${id}&q=${q}`)
}