document.addEventListener("turbolinks:load", function() {
  var public_key = document.querySelector("meta[name='stripe-public-key']").content;
  var stripe = Stripe(public_key);
  var elements = stripe.elements();

  // Custom styling can be passed to options when creating an Element.
  var style = {
    base: {
      // Add your base input styles here. For example:
      fontSize: '16px',
      lineHeight: '24px'
    }
  };

  // Create an instance of the card Element
  var card = elements.create('card', {style: style});

  // Add an instance of the card Element into the `card-element` <div>
  card.mount('#card-element');

  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  // Create a token or display an error when the form is submitted.
  var form = document.getElementById('payment-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server
        stripeTokenHandler(result.token);
      }
    });
  });

  // allow payment to switch from paying with existing card, to paying with
  // a new card
  $(".show-new-payment-form").on("click", function(e) {
    e.preventDefault();
    $("#existing-card").hide();
    $("#payment-form").removeAttr("style");
  });

  // allow payment to switch from paying with a new card, to paying with
  // an existing card
  $(".show-existing-card").on("click", function(e) {
    e.preventDefault();
    $("#payment-form").hide();
    $("#existing-card").show();
  });


  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    console.log(token);

    ["brand", "exp_month", "exp_year", "last4", "address_zip"].forEach(function(field) {
      addFieldToForm(form, token, field);
    });
    // Submit the form
    form.submit();
  }

  function addFieldToForm(form, token, field) {
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', "user[card_" + field + "]");
    hiddenInput.setAttribute('value', token.card[field]);
    form.appendChild(hiddenInput);
  }



});
