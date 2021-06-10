const questionCollection = db.collection("question");

let questionsContainer = document.getElementById("questionsContainer");

questionCollection.orderBy('createdAt', 'desc').get().then(resp => {
    resp.docs.forEach(doc => {
        let name;
        let img;
        doc.data().user.get().then(r => {
            name = r.data().name;
            img = r.data().photo;
        }).then(() => {
            questionsContainer.innerHTML += `
            <div class="col-lg-12">
            <div class="card text-center mb-3" data-aos="fade-in" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out">
                <div class="card-header bgColor1">
                    <div class="d-flex bd-highlight">
                        <div class="mr-auto bd-highlight iconColor">
                            <p class="mb-0" >${doc.data().views} <i class="far fa-eye"></i></p>
                        </div>
                        <div class="bd-highlight mr-3 iconColor">
                            <p class="mb-0" > ${doc.data().answersCount} <i class="fas fa-marker"></i></p>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                                <div class="media">
                                    <img src="${img}" class="align-self-start ml-3 circleImage" alt="...">
                                    <div class="media-body text-right">
                                        <h5 class="mt-0"> ${name} @</h5>
                                        <p> <i class="far fa-clock ml-2"></i>${moment(doc.data().createdAt.toDate()).locale("ar").fromNow()}</p>
                                        <h3 class="mt-3">${doc.data().title}</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer backtrans">
                            <div class="d-flex bd-highlight">
                                <div class="bd-highlight col-sm-3">
                                    <span class="mr-auto">
                                                    <i data-id=${doc.id} onclick="increaseEval(event)" class="fas fa-arrow-up ev evup ml-3"></i>
                                                <span class="ml-auto mr-auto ev">${doc.data().evaluation}</span>
                                    <i data-id=${doc.id} onclick="decreaseEval(event)" class="fas fa-arrow-down ev evdown mr-3"></i>
                                    </span>
                                </div>
                                <div  class="mr-auto bd-highlight">
                                    <button onclick="location.assign('./answer.html?id=${doc.id}')"  data-id=${doc.id} type="button" class="btn btn-outline-info">الاطلاع على الإجابات <i class="fas fa-binoculars"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            `
        })
    })
})

let increaseEvalBtn = document.getElementById("increaseEval");


function increaseEval(event) {
    //change value of evaluation and Enable and disable buttons
    event.target.nextElementSibling.innerHTML = parseInt(event.target.nextElementSibling.innerHTML) + 1;
    event.target.removeAttribute("onclick")
    event.target.classList.add("text-muted")
    event.target.nextElementSibling.nextElementSibling.classList.remove("text-muted")
    event.target.nextElementSibling.nextElementSibling.setAttribute("onclick", "decreaseEval(event)")

    //update value of evaluation in datebase
    questionCollection.doc(event.target.dataset.id).update({
        evaluation: parseInt(event.target.nextElementSibling.innerHTML)
    })

}

function decreaseEval(event) {
    //change value of evaluation and Enable and disable buttons
    event.target.previousElementSibling.innerHTML = parseInt(event.target.previousElementSibling.innerHTML) - 1;
    event.target.removeAttribute("onclick")
    event.target.classList.add("text-muted");
    event.target.previousElementSibling.previousElementSibling.classList.remove("text-muted")
    event.target.previousElementSibling.previousElementSibling.setAttribute("onclick", "increaseEval(event)")

    //update value of evaluation in datebase
    questionCollection.doc(event.target.dataset.id).update({
        evaluation: parseInt(event.target.previousElementSibling.innerHTML)
    })
}

//for search
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

// search if clicked
searchBtn.addEventListener("click", (event) => {
    if (searchInput.value.trim() != "") {

        questionCollection.orderBy('createdAt', 'desc').get().then(resp => {
            let count = false;
            questionsContainer.innerHTML = "";

            resp.docs.forEach(doc => {
                if (doc.data().title.includes(searchInput.value.trim())) {
                    count = true;
                    let name;
                    let img;
                    doc.data().user.get().then(r => {
                        name = r.data().name;
                        img = r.data().photo;

                    }).then(() => {
                        questionsContainer.innerHTML += `
                        <div class="col-lg-12">
                        <div class="card text-center mb-3" data-aos="fade-in" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out">
                            <div class="card-header bgColor1">
                                <div class="d-flex bd-highlight">
                                    <div class="mr-auto bd-highlight iconColor">
                                        <p class="mb-0" >${doc.data().views} <i class="far fa-eye"></i></p>
                                    </div>
                                    <div class="bd-highlight mr-3 iconColor">
                                        <p class="mb-0" > 5 <i class="fas fa-marker"></i></p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="media">
                                    <img src="${img}" class="align-self-start ml-3 circleImage" alt="...">
                                    <div class="media-body text-right">
                                        <h5 class="mt-0"> ${name} @</h5>
                                        <p> <i class="far fa-clock ml-2"></i>${moment(doc.data().createdAt.toDate()).locale("ar").fromNow()}</p>
                                        <h3 class="mt-3">${doc.data().title}</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer backtrans">
                            <div class="d-flex bd-highlight">
                                <div class="bd-highlight col-sm-3">
                                    <span class="mr-auto">
                                                    <i data-id=${doc.id} onclick="increaseEval(event)" class="fas fa-arrow-up ev evup ml-3"></i>
                                                <span class="ml-auto mr-auto ev">${doc.data().evaluation}</span>
                                    <i data-id=${doc.id} onclick="decreaseEval(event)" class="fas fa-arrow-down ev evdown mr-3"></i>
                                    </span>
                                </div>
                                <div  class="mr-auto bd-highlight">
                                    <button onclick="location.assign('./answer.html?id=${doc.id}')"  data-id=${doc.id} type="button" class="btn btn-outline-info">الاطلاع على الإجابات <i class="fas fa-binoculars"></i></button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
            `
                    })
                }


            })
            if (!count) {
                questionsContainer.innerHTML += `
                <div class="col-lg-12">
                <h2 class=" text-center p-4 text-muted ">لم يظهر بحثك أية نتائج </h2>
            </div>
                `;
            }
        })

    }
})

// search if enter is pressed
searchInput.addEventListener("keyup", (event) => {
    if ((event.key === "Enter")) {
        searchBtn.click()
    }
})




//when asking question >>> update data base
let askBtn = document.getElementById("askBtn");
let questionContent = document.getElementById("questionContent");

askBtn.addEventListener("click", () => {
    let questionContentValue = questionContent.value
    let qustTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
    let id;
    const userCollection = db.collection("users");
    userCollection.where('user_email', '==', firebase.auth().currentUser.email).get().then(resp => {
        id = resp.docs[0].id
    }).then(() => {
        questionCollection.add({
            evaluation: 0,
            title: questionContentValue,
            views: 0,
            createdAt: qustTimestamp,
            user: db.doc(`users/${id}`),
            answersCount: 0
        }).then(() => {
            location.reload()
        })
    })
})

// to prevent unsigned user from asking questions
auth.onAuthStateChanged(function(user) {
    if (!user) {
        document.getElementById("canAskBtn").style.display = "none"
    } else {
        document.getElementById("signInFirstBtn").style.display = "none"
    }
})