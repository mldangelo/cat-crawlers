import vo from 'vo';
import Nightmare from 'nightmare';
import tags from './tags';

const nightmare = Nightmare({
  show: true,
  waitTimeout: 100000 // in ms
});

const run = function*() {
  
  // Login here
  yield nightmare
    .goto('https://instagram.com/')
    .wait(90000);

  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    console.log(`Starting: ${i + 1}/${tags.length} ${tag}`);
    yield nightmare
      .goto(`https://www.instagram.com/explore/tags/${tag}/`)
      .wait(2000);

    yield nightmare.evaluate(function() {
      var links = document.getElementsByTagName('a');
      var buttons = Array.prototype.filter.call(links, function(n) {
        return n.innerHTML.toLowerCase() === 'load more';
      });
      if (buttons.length === 1) {
        buttons[0].click();
      }
    });
    
    let previousHeight = 0;
    let currentHeight = -1;
    
    while (previousHeight !== currentHeight && currentHeight < 200000) {
      console.log(tag, 'scrolling', previousHeight, currentHeight);
      previousHeight = currentHeight;
      currentHeight = yield nightmare.evaluate(() => document.body.scrollHeight);
      yield nightmare.scrollTo(currentHeight, 0)
        .wait(600);
    }
    
    yield nightmare.html(`./pages/${tag}`, 'HTMLComplete');
    yield nightmare.wait(15000);
    
  }
  yield nightmare.end();
  yield nightmare.then(() => console.log('Finished save')).catch(error => {
    console.error('Search failed:', error);
  });
};

vo(run)(err => {
  if (err) console.dir(err);
  console.log(`finished downloading ${tags.length} images.`);
});
