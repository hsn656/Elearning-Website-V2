document.getElementById("signin").onclick = ()=>{location.replace("login.html")};
document.getElementById("signup").onclick = ()=>{location.replace("register.html")};
  function getAllData(collection) {
    return collection.get();
  }


function test_me(e, orderBy) {
  debugger;

  if (e != ""||orderBy!=undefined) {
    var text = e.trim();
    // firebase doesn't support full text search
    lessonCollection.orderBy('createdAt', 'desc').get().then((s) => {
      s.docs.forEach((d) => {
        if (d.data().name.includes(text) ==true) {
          document.getElementsByClassName("trending-courses")[0].innerHTML+=
            `
            <div class="col-sm-6 col-lg-4">
            <div class="card m-3 py-3 text-center"
                style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
                
                <img src="images/server_content/lessons/${d.data().img}" class="m-auto">
                
                <h3 class="pb-2 ">${d.data().name}</h3>
                <div class="layer">
                    <a onclick="getSpecificLesson('${d.id}')" class="btn btn-block">
                        ابدأ الآن
                    </a>
                </div>
            </div>
        </div>`;
        }
      });
      // document.getElementsByClassName("trending-courses")[0].innerHTML=`<h1>لا يوجد بيانات لعرضها</h1>`
      document.getElementById("search-result").innerHTML = document.getElementsByClassName("t-course").length;
    });
  } else {
    getAllData(lessonCollection)
    .then(res =>{
      // console.log(res.docs.length)
        res.docs.forEach((d) => {
            document.getElementsByClassName("trending-courses")[0].innerHTML+=
            `
            <div class="col-sm-6 col-lg-4">
            <div class="card m-3 py-3 text-center"
                style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
                
                <img src="images/server_content/lessons/${d.data().img}" class="m-auto">
                
                <h3 class="pb-2 ">${d.data().name}</h3>
                <div class="layer">
                    <a onclick="getSpecificLesson('${d.id}')" class="btn btn-block">
                        ابدأ الآن
                    </a>
                </div>
            </div>
        </div>`;
          });
          document.getElementById("search-result").innerHTML = document.getElementsByClassName("t-course").length;
        })
  }
}
