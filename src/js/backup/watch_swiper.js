if (document.querySelector('.main_watch_swiper') !== null) {
  lockScroll()

  /* #region  WATCH SWIPER */
  Number.prototype.between = function (a, b) {
    var min = Math.min(a, b),
      max = Math.max(a, b)

    return this > min && this < max
  };

  var drag, deg, opacityx = 0
  var max = 320
  var min = 30
  var $card

  const IS_BACK = 'is_back'
  const MOVING_ACCEPT = 'is_moving_accept'
  const MOVING_REJECT = 'is_moving_reject'
  const IS_COFIRMED = 'is_confirmed'
  const IS_DECLINED = 'is_declined'

  const side = $('.watch-swiper__bg-side')
  const sideAccept = side.filter('.is-accept')
  const sideReject = side.filter('.is-reject')

  const sides = {
    accept: function () {
      sideReject.css({ opacity: 0 })
      sideAccept.css({ opacity: 1 })
    },
    reject: function () {
      sideReject.css({ opacity: 1 })
      sideAccept.css({ opacity: 0 })
    },
    reset: function () {
      setTimeout(() => {
        sideReject.css({ opacity: 0 })
        sideAccept.css({ opacity: 0 })
      }, 1);
    }
  }
  const card = {
    accept: function () {
      $card.addClass(MOVING_ACCEPT)
    },
    reject: function () {
      $card.addClass(MOVING_REJECT)
    },
    reset: function () {
      setTimeout(() => {
        $card.removeClass(MOVING_ACCEPT).removeClass(MOVING_REJECT)
      }, 1);
    }
  }

  function backCard() {
    $(document).off("mousemove touchmove mouseup touchend")
    $card.removeClass(IS_ACTIVE)
    $card.addClass(IS_BACK)
    drag = 0
    sides.reset()
    card.reset()
  }

  function moveCard() {
    deg = drag / 25
    opacityx = Math.abs(drag / 50)
    $card.addClass(IS_ACTIVE)
    $card.removeClass(IS_BACK)

    if (-max < drag && drag < max) {
      $card.css({ transform: `translateX(${drag}px) rotate(${deg}deg)` })
    }
    else if (drag > max || drag < -max) {
      backCard()
    }

    if (drag.between(-min, min)) {
      sides.reset()
      card.reset()
    } else {
      if (drag > min) {
        sides.accept()
        card.accept()
      }
      if (drag < min) {
        sides.reject()
        card.reject()
      }
    }
  }

  function releaseCard() {
    $(document).off("mousemove touchmove mouseup touchend")
    sides.reset()
    card.reset()
    $card.removeClass(IS_ACTIVE)

    if (drag >= min && drag < max) {
      $card.addClass(IS_COFIRMED)
      setTimeout(() => {
        $card.remove()
      }, getTransitionTime($card));
    } else if (drag <= -min && drag > -max) {
      $card.addClass(IS_DECLINED)
      setTimeout(() => {
        $card.remove()
      }, getTransitionTime($card));
    }
  }

  $(document).on('click mousedown touchstart', '.watch-swipe', function (e) {
    if (e.type == 'click') {
      e.preventDefault
    } else {
      var startX = e.pageX || e.originalEvent.touches[0].pageX
      $card = $(this)

      $(document).on('mousemove touchmove', function (e) {
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        drag = (x - startX);
        if (!drag) return;
        moveCard()
      })

      $(document).on('mouseup touchend', function () {
        if (drag < min && drag > -min) {
          backCard();
        }
        else {
          releaseCard();
        }
      })
    }
  })
  /* #endregion WATCH SWIPER */

}