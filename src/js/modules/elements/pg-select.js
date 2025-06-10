const pgSelect = {
  initalized: undefined,
  init: function () {
    this.renderDOM();
    this.initalized = true;
  },
  getAttrDOM: function (att) {
    return $(`[data-pg-set="${att}"]`);
  },
  renderDOM: function () {
    // Shape
    this.shapeImg = this.getAttrDOM('shapeImg');
    this.shapeTitle = this.getAttrDOM('shapeTitle');
    this.shapeDescription = this.getAttrDOM('shapeDescription');

    // Color
    this.colorImg = this.getAttrDOM('colorImg');
    this.colorTitle = this.getAttrDOM('colorTitle');
    this.colorDescription = this.getAttrDOM('colorDescription');

    // Clarity
    this.clarityImg = this.getAttrDOM('clarityImg');
    this.clartyTitle = this.getAttrDOM('clarityTitle');
    this.clarityDescription = this.getAttrDOM('clarityDescription');

    // Ring Size
    this.currentSize = this.getAttrDOM('currentSize');
    this.circSize = this.getAttrDOM('circSize');
    this.dSize = this.getAttrDOM('dSize');
    this.euSize = this.getAttrDOM('euSize');
    this.ukSize = this.getAttrDOM('ukSize');
  },
  attachControls: function (sArr, sBtn) {
    if (!this.initalized) {
      pgSelect.init();
    }
    let selectArr = sArr,
      selectBtn = sBtn;
    for (let i = 0; i < selectArr.length; i++) {
      let thisAttr = selectArr[i].getAttribute('data-pg-select'),
        btnArr = Array.from($(selectArr[i]).find(selectBtn));

      function setPgSelectEvent() {
        let dataSet;
        switch (thisAttr) {
          case 'shape':
            dataSet = pgSelect.shape;
            break;
          case 'color':
            dataSet = pgSelect.color;
            break;
          case 'clarity':
            dataSet = pgSelect.clarity;
            break;
          case 'ring-size':
            dataSet = pgSelect.ringSize;
            break;
        }
        return { dataSet };
      }

      $.each(btnArr, function (i) {
        btnArr[i].onclick = () => {
          setPgSelectEvent().dataSet.changeDetails(i);
          $.each(btnArr, function (i) {
            btnArr[i].classList.remove('is-active');
          });
          $(this).addClass('is-active');
        };
      });
    }
  },
  shape: {
    changeDetails: function (index) {
      pgSelect.shapeImg.attr('src', pgSelect.data.shape[index].url);
      pgSelect.shapeTitle.html(pgSelect.data.shape[index].title);
      pgSelect.shapeDescription.html(pgSelect.data.shape[index].description);
    },
  },
  color: {
    changeDetails: function (index) {
      pgSelect.colorImg.attr('src', pgSelect.data.color[index].url);
      pgSelect.colorTitle.html(pgSelect.data.color[index].title);
      pgSelect.colorDescription.html(pgSelect.data.color[index].description);
    },
  },
  clarity: {
    changeDetails: function (index) {
      pgSelect.clarityImg.attr('src', pgSelect.data.clarity[index].url);
      pgSelect.clartyTitle.html(pgSelect.data.clarity[index].title);
      pgSelect.clarityDescription.html(pgSelect.data.clarity[index].description);
    },
  },
  ringSize: {
    changeDetails: function (index) {
      pgSelect.currentSize.html(pgSelect.data.ringSize[index].us);
      pgSelect.circSize.html(pgSelect.data.ringSize[index].circ);
      pgSelect.dSize.html(pgSelect.data.ringSize[index].diameter);
      pgSelect.euSize.html(pgSelect.data.ringSize[index].europe);
      pgSelect.ukSize.html(pgSelect.data.ringSize[index].uk);
    },
  },
  data: {
    shape: [
      {
        url: 'https://i.ibb.co/ZBmcG0f/dmg-shape-round.png',
        title: 'Round',
        description:
          'A classic and timeless shape, the round diamond is known for its brilliant sparkle and perfect symmetry.',
      },
      {
        url: 'https://i.ibb.co/rdNkYyp/dmg-shape-priness.png',
        title: 'Princess',
        description:
          'A square-shaped diamond with sharp corners and exceptional brilliance, known for its modern and clean lines.',
      },
      {
        url: 'https://i.ibb.co/271bsCZ/dmg-shape-oval.png',
        title: 'Oval',
        description:
          'A modified brilliant cut diamond with an elongated shape, known for its brilliance and ability to create the illusion of longer, slender fingers.',
      },
      {
        url: 'https://i.ibb.co/qyQnV1f/dmg-shape-pear.png',
        title: 'Pear',
        description:
          'An elegant combination of a round and marquise shape, sometimes called a teardrop, offering a unique and graceful appearance.',
      },
      {
        url: 'https://i.ibb.co/NVdgJtv/dmg-shape-emerald.png',
        title: 'Emerald',
        description:
          'A rectangular shape with stepped facets, highlighting the diamonds clarity and showcasing a timeless and sophisticated look.',
      },
    ],
    color: [
      {
        url: 'https://i.ibb.co/MDnYmGh/dmg-color-near.png',
        title: 'K - Last Grade',
        description:
          'The color may be visible to the unaided eye. Diamonds with a K-color grade can be a smart choice, offering excellent value for money.',
      },
      {
        url: 'https://i.ibb.co/MDnYmGh/dmg-color-near.png',
        title: 'J - Last Grade',
        description:
          'Color in diamonds graded as "near-colorless" may be slightly visible to the naked eye, especially in fancy shapes or diamonds larger than 1 carat.',
      },
      {
        url: 'https://i.ibb.co/JkK4B3C/dmg-color-slight.png',
        title: 'I - Slightly Detectable',
        description:
          'Upon close examination, the color may be barely noticeable, but it still provides exceptional value.',
      },
      {
        url: 'https://i.ibb.co/J2JhPM4/dmg-color-clear.png',
        title: 'H - Near Colorless',
        description:
          'The "near-colorless" grade of CA exhibits noticeable color only when compared to much higher color grades, offering excellent value.',
      },
      {
        url: 'https://i.ibb.co/J2JhPM4/dmg-color-clear.png',
        title: 'G - Almost Colorless',
        description:
          'This grade is the highest level of "near-colorless" and may show some color in comparison to the even higher "colorless" grades, but it offers excellent value.',
      },
      {
        url: 'https://i.ibb.co/J2JhPM4/dmg-color-clear.png',
        title: 'F - Colorless',
        description:
          'The "colorless" grade is most valued when placed in platinum or white gold, with a faint color that can be identified by a skilled gemologist.',
      },
      {
        url: 'https://i.ibb.co/J2JhPM4/dmg-color-clear.png',
        title: 'E - Colorless',
        description:
          'This grade, best showcased in platinum or white gold, is so "colorless" that even trained eyes would struggle to detect traces of color.',
      },
    ],
    clarity: [
      {
        url: 'https://i.ibb.co/Gp8pKwK/clarity-i3.png',
        title: 'I1, I2, I3 - Included',
        description:
          'Diamonds in this clarity range have inclusions that are easily visible under 10x magnification and may also be visible to the naked eye. These diamonds may have reduced brilliance and sparkle due to their inclusions.',
      },
      {
        url: 'https://i.ibb.co/ZHBvJz9/clarity-si1-si2.png',
        title: 'SI1 & SI2 - Slightly Included',
        description:
          'These grades have noticeable inclusions under 10x magnification, some of which might be visible to the naked eye. SI diamonds generally offer good value as they have inclusions that might not significantly affect the appearance of the diamond.',
      },
      {
        url: 'https://i.ibb.co/27xG7GC/clarity-vs1-vs2.png',
        title: 'VS1 & VS2 - Very Slightly Included',
        description:
          'These grades have minor inclusions that are visible under 10x magnification but are considered relatively small and not easily noticeable to the naked eye.',
      },
      {
        url: 'https://i.ibb.co/d61wnL9/clarity-vvs1-vvs2.png',
        title: 'VVS1 & VVS2 - Very, Very Slightly Included',
        description:
          'These grades indicate that inclusions are extremely difficult to see even under 10x magnification. VVS diamonds may have minor inclusions that are barely visible to a skilled grader.',
      },
      {
        url: 'https://i.ibb.co/WKsqs99/clarity-fl-if.png',
        title: 'FL & IF - Flawless',
        description:
          'These are the highest clarity grades. Flawless diamonds have no visible inclusions or blemishes under 10x magnification, even by a skilled grader. Internally Flawless diamonds have no internal inclusions but may have minor surface blemishes.',
      },
    ],
    ringSize: [
      { us: 4, europe: '47', uk: 'H 1/2', diameter: '14.9', circ: '46.8' },
      { us: 4.5, europe: '48', uk: 'I 1/2', diameter: '15.3', circ: '48' },
      { us: 5, europe: '49', uk: 'J 1/2', diameter: '15.7', circ: '49.3' },
      { us: 5.5, europe: '51', uk: 'K 1/2', diameter: '16.1', circ: '50.6' },
      { us: 6, europe: '52', uk: 'L 1/2', diameter: '16.5', circ: '51.9' },
      { us: 6.5, europe: '53', uk: 'M 1/2', diameter: '16.9', circ: '53.1' },
      { us: 7, europe: '54', uk: 'N 1/2', diameter: '17.3', circ: '54.4' },
      { us: 7.5, europe: '55', uk: 'O 1/2', diameter: '17.7', circ: '55.7' },
      { us: 8, europe: '57', uk: 'P 1/2', diameter: '18.1', circ: '57.0' },
      { us: 8.5, europe: '58', uk: 'Q 1/2', diameter: '18.5', circ: '58.3' },
      { us: 9, europe: '59', uk: 'R 1/2', diameter: '19.0', circ: '59.5' },
      { us: 9.5, europe: '61', uk: 'S 1/2', diameter: '19.4', circ: '60.8' },
      { us: 10, europe: '62', uk: 'T 1/2', diameter: '19.8', circ: '62.1' },
      { us: 10.5, europe: '63', uk: 'U 1/2', diameter: '20.2', circ: '63.4' },
      { us: 11, europe: '64', uk: 'V 1/2', diameter: '20.6', circ: '64.6' },
      { us: 11.5, europe: '66', uk: 'W 1/2', diameter: '21.0', circ: '65.9' },
      { us: 12, europe: '67', uk: 'X 1/2', diameter: '21.4', circ: '67.2' },
      { us: 12.5, europe: '68', uk: 'Z 1/2', diameter: '21.8', circ: '68.5' },
    ],
  },
};

module.exports = pgSelect;
