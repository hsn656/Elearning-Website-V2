// fire store collections
const questionCollection = db.collection("question");
const answerCollection = db.collection("answer");


// My DOM variables
let questionContent = document.getElementById("questionContent");
let bestAnswerContainer = document.getElementById("bestAnswerContainer")
let otherAnswersContainer = document.getElementById("otherAnswersContainer")
let otherAnswersTitle = document.getElementById("otherAnswersTitle")
let commonQuestions = document.getElementById("commonQuestions")



//render our question
questionCollection.doc(location.search.split("=")[1]).get().then(doc => {

    let name;
    let img;
    doc.data().user.get().then(r => {
        name = r.data().name;
        img = r.data().photo;
    }).then(() => {
        questionContent.setAttribute("data-views", doc.data().views)
        questionContent.setAttribute("data-ansCount", doc.data().answersCount)

        questionContent.innerHTML = ` <div data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out">
    <div class="media">
    <img src="${img}" class="ml-3" alt="...">
    <div class="media-body text-right">
        <h5 class="mt-0"> ${name} @</h5>
        <p> <i class="far fa-clock ml-2"></i>${moment(doc.data().createdAt.toDate()).locale("ar").fromNow()}</p>
    </div>
</div>
<div class="card text-right mt-2">
<div class="card-body">
    <h5 class="card-title">${doc.data().title} </h5>
    <!-- <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> -->
</div>
<div class="card-footer text-left  ask">
<div class="d-flex">
    <div class="ml-auto bd-highlight">
    <span class="mr-auto">
    <i data-id=${location.search.split('=')[1]} onclick="increaseQuestEval(event)" class="fas fa-arrow-up ev evup"></i>
<span  class="ml-auto mr-auto ev">${doc.data().evaluation}</span>
    <i  data-id=${location.search.split('=')[1]} onclick="decreaseQuestEval(event)" class="fas  fa-arrow-down ev evdown"></i>
    </span>
    </div>
    <div>
        <i class="fas fa-link"></i>
        <i class="fab fa-google-plus-g"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-facebook-f"></i>
    </div>
</div>
</div>
</div>
</div>   
`

    }).then(() => {
        questionCollection.doc(location.search.split('=')[1]).update({
            views: parseInt(questionContent.dataset.views) + 1
        })
    })
})

// render best answer and other answers
answerCollection.where("qID", "==", location.search.split('=')[1]).orderBy("evaluation", "desc").get().then(rep => {
    if (rep.docs[0]) {
        let name;
        let img;
        rep.docs[0].data().user.get().then(r => {
            name = r.data().name;
            img = r.data().photo;
        }).then(() => {
            bestAnswerContainer.innerHTML = `<div data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out">
        <div class="card-header text-right card1-style">
        أفضل الإجابات
    </div>

    <div class="card-body text-right">
        <div class="media">
            <img src="${img}" class="align-self-start ml-3" alt="...">
            <div class="media-body">
                <h5 class="mt-0">${name} @</h5>
                <p> <i class="far fa-clock ml-2"></i>${moment(rep.docs[0].data().createdAt.toDate()).locale("ar").fromNow()}</p>
                <p class="h5" >${rep.docs[0].data().content}</p>
            </div>
        </div>
    </div>
    <div class="card-footer fotcard1">
    <div class="d-flex bd-highlight">
        <div class="ml-auto bd-highlight">
            <span class="mr-auto">
            <i onclick="increaseAnsEval(event)"  data-id="${rep.docs[0].id}" class="fas fa-arrow-up ev evup"></i>
        <span class="ml-auto mr-auto ev">${rep.docs[0].data().evaluation}</span>
            <i onclick="decreaseAnsEval(event)" data-id="${rep.docs[0].id}" class="fas fa-arrow-down ev evdown"></i>
            </span>
        </div>
        <div class="bd-highlight ml-1 comm">
            <a>أضف ردا<i class="far fa-comment-dots"></i></a>
        </div>
        <div class="bd-highlight rep">
            <a>ابلغ عن الإجابة<i class="fas fa-exclamation-triangle"></i></a>
        </div>
    </div>
</div>
</div>
        `

            if (rep.docs.length > 1) {
                otherAnswersTitle.innerHTML += `
                                    <div class="card-header text-right card1-style" data-aos="fade-in" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out">
                                                    الإجابات الأخرى
                                                </div>
                                        `

                for (let i = 1; i < rep.docs.length; i++) {
                    let name;
                    let img;
                    rep.docs[i].data().user.get().then(r => {
                        name = r.data().name;
                        img = r.data().photo;
                    }).then(() => {
                        otherAnswersContainer.innerHTML = `
                        <div data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out">
                                            <div class="card text-center mt-2" data-aos="fade-in" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out">
                                            <div class="card-body text-right">
                                                <div class="media">
                                                    <img src="${img}" class="align-self-start ml-3" alt="...">
                                                    <div class="media-body">
                                                        <h5 class="mt-0">${name} @</h5>
                                                        <p> <i class="far fa-clock ml-2"></i>${moment(rep.docs[i].data().createdAt.toDate()).locale("ar").fromNow()}</p>
                                                        <p class='h5' >${rep.docs[i].data().content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer fotcard1">
                                            <div class="d-flex bd-highlight">
                                                <div class="ml-auto bd-highlight">
                                                    <span class="mr-auto">
                                                    <i onclick="increaseAnsEval(event)" data-id="${rep.docs[i].id}" class="fas fa-arrow-up ev evup"></i>
                                                <span class="ml-auto mr-auto ev">${rep.docs[i].data().evaluation}</span>
                                                     <i onclick="decreaseAnsEval(event)" data-id="${rep.docs[i].id}" class="fas fa-arrow-down ev evdown"></i>
                                                     </span>
                                                 </div>
                                                 <div class="bd-highlight ml-1 comm">
                                                     <a>اضف تعليق<i class="far fa-comment-dots"></i></a>
                                                 </div>
                                                 <div class="bd-highlight rep">
                                                     <a>ابلغ عن التعليق<i class="fas fa-exclamation-triangle"></i></a>
                                                 </div>
                                             </div>
                                        </div>
                                     </div>
                                     </div>
                                            `
                    })
                }
            }

        })
    } else {
        bestAnswerContainer.innerHTML = `
        <div class=" card-header text-right card2-style">
        لا توجد إجابات بعد
    </div>`
    }
})

//render common questions
questionCollection.orderBy("evaluation", "desc").limit(5).get().then((resp) => {
    for (let i = 0; i < resp.docs.length; i++) {
        if (resp.docs[i].id == location.search.split("=")[1]) {
            continue
        }
        commonQuestions.innerHTML += `
        <p onclick="location.assign('./answer.html?id=${resp.docs[i].id}')" class="btn d-block text-right">${resp.docs[i].data().title}</p>
        `
    }
})


//for question evaluation
function increaseQuestEval(event) {
    //change value of evaluation and Enable and disable buttons
    event.target.nextElementSibling.innerHTML = parseInt(event.target.nextElementSibling.innerHTML) + 1;
    event.target.removeAttribute("onclick")
    event.target.classList.add("text-muted")
    event.target.nextElementSibling.nextElementSibling.classList.remove("text-muted")
    event.target.nextElementSibling.nextElementSibling.setAttribute("onclick", "decreaseQuestEval(event)")

    //update value of evaluation in datebase
    questionCollection.doc(event.target.dataset.id).update({
        evaluation: parseInt(event.target.nextElementSibling.innerHTML)
    })
}

function decreaseQuestEval(event) {
    //change value of evaluation and Enable and disable buttons
    event.target.previousElementSibling.innerHTML = parseInt(event.target.previousElementSibling.innerHTML) - 1;
    event.target.removeAttribute("onclick")
    event.target.classList.add("text-muted");
    event.target.previousElementSibling.previousElementSibling.classList.remove("text-muted")
    event.target.previousElementSibling.previousElementSibling.setAttribute("onclick", "increaseQuestEval(event)")

    //update value of evaluation in datebase
    questionCollection.doc(event.target.dataset.id).update({
        evaluation: parseInt(event.target.previousElementSibling.innerHTML)
    })
}



//for answers evaluation
function increaseAnsEval(event) {
    //change value of evaluation and Enable and disable buttons
    event.target.nextElementSibling.innerHTML = parseInt(event.target.nextElementSibling.innerHTML) + 1;
    event.target.removeAttribute("onclick")
    event.target.classList.add("text-muted")
    event.target.nextElementSibling.nextElementSibling.classList.remove("text-muted")
    event.target.nextElementSibling.nextElementSibling.setAttribute("onclick", "decreaseAnsEval(event)")

    //update value of evaluation in datebase
    answerCollection.doc(event.target.dataset.id).update({
        evaluation: parseInt(event.target.nextElementSibling.innerHTML)
    })
}

function decreaseAnsEval(event) {
    //change value of evaluation and Enable and disable buttons
    event.target.previousElementSibling.innerHTML = parseInt(event.target.previousElementSibling.innerHTML) - 1;
    event.target.removeAttribute("onclick")
    event.target.classList.add("text-muted");
    event.target.previousElementSibling.previousElementSibling.classList.remove("text-muted")
    event.target.previousElementSibling.previousElementSibling.setAttribute("onclick", "increaseAnsEval(event)")

    //update value of evaluation in datebase
    answerCollection.doc(event.target.dataset.id).update({
        evaluation: parseInt(event.target.previousElementSibling.innerHTML)
    })
}


// to prevent unsigned user from answering questions
let ansTextArea = document.getElementById("ansTextArea");
let cantAnswerWarn = document.getElementById("cantAnswerWarn");
let AnswerBtn = document.getElementById("AnswerBtn");

auth.onAuthStateChanged(function(user) {
    if (!user) {
        ansTextArea.disabled = true;
        ansTextArea.classList.add('bg-cantAnswerWarn')
        cantAnswerWarn.classList.remove("d-none");

        AnswerBtn.disabled = true;
        AnswerBtn.style.cursor = "not-allowed";
        AnswerBtn.firstElementChild.style.cursor = "not-allowed"
    }
})


// update data base when answering
let count;
AnswerBtn.addEventListener("click", () => {
    ansTextAreaContent = ansTextArea.value
    let qustTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
    let id;
    const userCollection = db.collection("users");
    userCollection.where('user_email', '==', firebase.auth().currentUser.email).get().then(resp => {
        id = resp.docs[0].id
    }).then(() => {
        answerCollection.add({
                qID: location.search.split("=")[1],
                evaluation: 0,
                content: ansTextAreaContent,
                createdAt: qustTimestamp,
                user: db.doc(`users/${id}`)
            }).then(() => {
                count = parseInt(questionContent.dataset.anscount) + 1
                questionCollection.doc(location.search.split('=')[1]).update({
                    answersCount: parseInt(questionContent.dataset.anscount) + 1
                })
            })
            .then(() => {
                location.reload()
            })
    })
})