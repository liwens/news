export function thinArr(arr) {
  return arr.reduce((a, b) => {
    return arr.concat(Array.isArray(b) ? thinArr(b) : b)
  });
  return arr;
}

export function myLazyload() {
  lazyloadPre() {
    let img = document.querySelectorAll('img');
    let len = img.length;
    window.addEventListener('scroll', this.lazyloadScroll(img, len))
  },
  lazyloadScroll(img, len) {
    console.log(img)
    let seeHeight = document.documentElement.clientHeight;
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    for (var i = 0; i < len; i++) {
      if (img[i].offsetTop < seeHeight + scrollTop) {
        if (img[i].getAttribute('src') == '') {
          img[i].src = img[i].getAttribute('my-lazy');
        }
      }
    }
  },
}
