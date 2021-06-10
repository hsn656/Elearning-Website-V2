(function () {
 

    var stripe = Stripe('pk_test_51IntafGcjcfOhHWOBj91amdTyWHK9XZCv7vzWJIbSK6dkDXWJkdT1sfQLwSSH1qgF7QAbyiNU0C825xMTyTHjmz90023BCyxg7');
   
    var checkoutButton = document.getElementById('checkout-button-price_1IntfiGcjcfOhHWOq9J3i3Fw');
    checkoutButton.addEventListener('click', function () {
      /*
       * When the customer clicks on the button, redirect
       * them to Checkout.
       */
      stripe.redirectToCheckout({
        lineItems: [{ price: 'price_1IntfiGcjcfOhHWOq9J3i3Fw', quantity: 1 }],
        mode: 'subscription',
   
        /*
         * Do not rely on the redirect to the successUrl for fulfilling
         * purchases, customers may not always reach the success_url after
         * a successful payment.
         * Instead use one of the strategies described in
         * https://stripe.com/docs/payments/checkout/fulfill-orders
         */
        successUrl: 'https://ahmedmustafa2201.github.io/E-learning/',
        cancelUrl: 'https://ahmedmustafa2201.github.io/E-learning/payment.html',
      })
        .then(function (result) {
          console.log(result)
          if (result.error) {
            /*
             * If `redirectToCheckout` fails due to a browser or network
             * error, display the localized error message to your customer.
             */
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
            
                // userCollection.where("user_email", "==", auth.currentUser.email).get()
                // .then(res=>{
                //   debugger
                //     console.log(res.docs[0].id)
                //     userCollection.doc(res.docs[0].id).update({
                //       "subscriped": true
                //     }).then(res)

                // }).catch(err=>console.log(err))
            
          
        });
    });
   })();

paypal.Button.render({
    // Configure environment
    env: 'sandbox',
    client: {
      sandbox: 'AUrswVUUkkp5RUE8kyF0iUnqTCO3iTixCz1qgQGcrxlCg_y2blHt4oPa0-FzmeFxz1Y4REMMs-0HdMm0',
      production: 'demo_production_client_id'
    },
    // Customize button (optional)
    locale: 'ar_EG',
    style: {
      size: 'small',
      color: 'gold',
      shape: 'pill',
    },

    // Enable Pay Now checkout flow (optional)
    commit: true,

    // Set up a payment
    payment: function (data, actions) {
      return actions.payment.create({
        transactions: [{
          amount: {
            total: '15',
            currency: 'USD'
          }
        }]
      });
    },
    // Execute the payment
    onAuthorize: function (data, actions) {
      // userCollection.where("user_email", "==", auth.currentUser.email).get()
      // .then(res=>{
      //     // console.log(res.docs[0].id)
      //     userCollection.doc(res.docs[0].id).update({
      //       "subscriped": true
      //     })
      //     location.assign("./index.html")
      // }).catch(err=>console.log(err))
  
      return actions.payment.execute().then(function () {
        // Show a confirmation message to the buyer
        


        alert('Thank you for your purchase!');
      });
    }
  }, '#paypal-button');

  document.getElementById("paypal-button").onclick = function(){
    auth.onAuthStateChanged(function (user) {
    userCollection.where("user_email", "==", user.email).get()
      .then(res=>{
          console.log(res.docs[0].id)
          userCollection.doc(res.docs[0].id).update({
            "subscriped": true
          })
      }).catch(err=>console.log(err))
    })
  }

  document.getElementById("checkout-button-price_1IntfiGcjcfOhHWOq9J3i3Fw").onclick = function(){
    auth.onAuthStateChanged(function (user) {
      userCollection.where("user_email", "==", user.email).get()
        .then(res=>{
            console.log(res.docs[0].id)
            userCollection.doc(res.docs[0].id).update({
              "subscriped": true
            })
        }).catch(err=>console.log(err))
      })
  }
    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("subButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 