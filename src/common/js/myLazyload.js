export default class lazyLoad {
  constructor(option) {
    this.imgs = option.imgs;
    this.n = option.n;
    this.replaceSrc();
    this.bindScroll()
  }
  bindScroll() {
    let _this = this;
    window.addEventListener('scroll', _this.replaceSrc);
  }
  unbindSroll() {
    window.removeEventListener('scroll', this.replaceSrc)
  }
  replaceSrc() {
    let imgs = this.imgs;
    console.log(this.imgs)
    let seeHeight = document.documentElement.clientHeight;
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    for (let i = 0, len = imgs.length; i < len; i++) {
      if (imgs[i].offsetTop < seeHeight + scrollTop) {
        console.log(imgs[i].offsetTop)
        if (imgs[i].getAttribute('src') == '') {
          //替换src
          imgs[i].src = imgs[i].getAttribute('data-src');
          imgs[i].removeAttribute('data-src')
        }
      }
    }
    return this;
  }
}


