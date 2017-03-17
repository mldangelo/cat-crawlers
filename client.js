var tag = window.location.pathname.split('/').filter(function(x) {
    return x.length > 0;
}).reverse()[0];

function img_find() {
    var imgs = document.getElementsByTagName("img");
    var imgSrcs = [];

    for (var i = 0; i < imgs.length; i++) {
        imgSrcs.push(imgs[i].src);
    }

    return imgSrcs;
}


// Load more 
var links = document.getElementsByTagName('a');
var more = Array.prototype.filter.call( links, function(n) { 
  return n.innerHTML.toLowerCase() === 'load more';
})[0];
more.click();

(function scrollLoop (i) {          
   setTimeout(function () {   
     console.log(i, 'more scrolls down');
     window.scrollTo(0, document.body.scrollHeight);
      if (--i > 0) scrollLoop(i);//  decrement i and call myLoop again if i > 0

   }, 500)
})(100); //  pass the number of iterations as an argument


/*
else {
  var images = img_find();

  (function downloadLoop (i) {          
     setTimeout(function () {   
       
       console.log(i-1);
       var a = document.createElement('a');
       a.href = images[i-1];
       a.download = tag + '-' + (i-1) + '.jpg';
       console.log(a.download);
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
        if (--i > 0) downloadLoop(i);//  decrement i and call myLoop again if i > 0
     }, 50)
  })(images.length); //  pass the number of iterations as an argument
}
*/

/*
img_find().forEach(function(i, index) {
    console.log(index);
    var a = document.createElement('a');
    a.href = i;
    a.download = tag + '-' + index + '.jpg';
    console.log(a.download);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}); */
