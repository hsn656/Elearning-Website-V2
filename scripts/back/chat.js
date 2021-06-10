(function (t, a, l, k, j, s) {
  s = a.createElement("script");
  s.async = 1;
  s.src = "https://cdn.talkjs.com/talk.js";
  a.head.appendChild(s);
  k = t.Promise;
  t.Talk = {
    v: 3,
    ready: {
      then: function (f) {
        if (k)
          return new k(function (r, e) {
            l.push([f, r, e]);
          });
        l.push([f]);
      },
      catch: function () {
        return k && new k();
      },
      c: l,
    },
  };
})(window, document, []);


  var me;
  
function generate_chat(userId){

  Talk.ready.then(function () {
    auth.onAuthStateChanged(function (user) {
      userCollection
        .where("user_email", "==", user.email)
        .get()
        .then((res) => {
          me = new Talk.User({
            id: res.docs[0].id,
            name: res.docs[0].data().name,
            email: res.docs[0].data().user_email,
            photoUrl: res.docs[0].data().photo,
            welcomeMessage: "Hey there! How are you? :-)",
            locale: "ar",
          });
        })
    })

    window.talkSession = new Talk.Session({
      appId: "tAVmni4W",
      me: me,
    });
  
    var other;
    userCollection
    .doc(userId)
    .get()
    .then((res) => {
      other = new Talk.User({
        id: res.id,
        name: res.data().name,
        email: res.data().user_email,
        photoUrl: res.data().photo,
        welcomeMessage: "Hey, how can I help?",
      });
    })
  
  
    var conversation = talkSession.getOrCreateConversation(
      Talk.oneOnOneId(me, other)
    );
    conversation.setParticipant(me);
    // conversation.setParticipant(other);
  
    var inbox = talkSession.createInbox({ selected: conversation });
    inbox.mount(document.getElementById("talkjs-container"));

});

  // var other;
  // db.collection("users").doc(userId)
  // .get()
  // .then((res) => {
  // debugger

  //   console.log(res.data())

  // }).catch(err=>console.log(err))

}