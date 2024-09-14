const footer = new Object({
  init: function () {
    function attach() {
      if (window.innerWidth < 992) {
        let footerHeader = Array.from($(".footer-col__header"));

        $.each(footerHeader, function (i) {
          let col = $(footerHeader[i]).closest(".footer-col"),
            body = col.find(".footer-col__body");

          if (body.length && col.length) {
            footerHeader[i].onclick = () => {
              if (body.height() == 0) {
                let scrH = body.find(".footer-col__body-scroll")[0]
                  .scrollHeight;
                body.css({
                  height: `${scrH}px`,
                });
              } else {
                let h = body.css("height");
                body.css("height", h);
                setTimeout(() => {
                  body.css({
                    height: "0px",
                  });
                }, 1);
              }
            };
          }
        });
      }
    }

    $(window).on("load resize", function () {
      attach();
    });
  },
})

module.exports = footer