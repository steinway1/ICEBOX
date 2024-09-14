function applyRedeemCode() {
  const value = $('#redeem_input').val();
  if (value != '') {
    $.ajax({
      url: '/json/redeem-promo-code',
      type: 'POST',
      data: { code: value },
      success: function (data) {
        var r = $.parseJSON(data);
        if (!r.error) {
          $('.checkout-redeem').show();
        } else {
          showMessage('error', 'Error', r.msg);
        }
      }
    });
  }
}

module.exports = {
  applyRedeemCode
}