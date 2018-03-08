export default class lazyLoad {
  constructor(option) {
    this.imgs = option.imgs;
    this.n = option.n;
    this.replaceSrc(this.imgs);
    this.bindScroll()
  };

  bindScroll() {
    let _this = this;
    window.addEventListener('scroll', _this.replaceSrc.bind(_this))
  }
  unbindSroll() {
    let _this = this;
    window.removeEventListener('scroll', _this.replaceSrc.bind(_this));
  }
  replaceSrc(imgs) {
    imgs = this.imgs;
    let seeHeight = document.documentElement.clientHeight;
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    for (let i = 0, len = imgs.length; i < len; i++) {
      if (imgs[i].offsetTop < seeHeight + scrollTop) {
        if (imgs[i].getAttribute('src') == '') {
          //替换过度的动画
          imgs[i].src = require('../../../static/loading.png');
          let oImg = new Image();
          oImg.src = imgs[i].getAttribute('data-src');
          oImg.onload = function () {
            imgs[i].src = oImg.src
          }
          imgs[i].removeAttribute('data-src')
        }
      }
    }
  }
}

