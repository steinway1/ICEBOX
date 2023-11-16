function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function saveCartEmail() {
  var email = $('#cart_email').val();
  if (email != '' && isEmail(email)) {
    $.ajax({
      type: "POST",
      url: '/json/cart-email',
      data: { email_address: email },
      success: function(data) {
        klaviyo.identify({ '$email': email });
        mailModal.close();
        showMessage('success', 'Thank you', 'Item was added to your cart.');
        $('.cart_trigger').click();
      }
    });
  } else {
    showMessage('error', 'Error', 'Please enter a valid email address !');
  }
}