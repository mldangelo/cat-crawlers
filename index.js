import fs from 'fs';
import vo from 'vo';
import Nightmare from 'nightmare';
const nightmare = Nightmare({
  show: true,
  waitTimeout: 100000 // in ms
});

// https://www.instagram.com/explore/tags/europeanshorthaircat/

const tags = [
  'abyssinian',
  'abyssiniancat',
  'aegeancat',
  'americanbobtail',
  'americanbobtailcat',
  'americancurl',
  'americancurlcat',
  'americanshorthair',
  'americanwirehair',
  'americanwirehaircat',
  'arabianmau',
  'arabianmaucat',
  'asiansemilonghair',
  'asiancat',
  'australianmist',
  'balinesecat',
  'bambinocat',
  'bengalcat',
  'birmancat',
  'bombaycat',
  'brazilianshorthair',
  'britishlonghair',
  'britishsemilonghair',
  'britishshorthair',
  'burmesecat',
  'burmillacat',
  'californiaspangled',
  'chantillytiffany',
  'chartreuxcat',
  'chausie',
  'cheetohcat',
  'colorpointshorthair',
  'cornishrex',
  'cymric',
  'cypruscat',
  'devonrexcat',
  'donskoysphynx',
  'dwarfcat',
  'egyptianmau',
  'europeanshorthaircat',
  'exoticshorthaircats',
];

const run = function*() {
  yield nightmare
    .goto('https://instagram.com/')
    .wait(60000);

  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];

    yield nightmare
      .goto(`https://www.instagram.com/explore/tags/${tag}/`)
      .wait(2000);

    yield nightmare.evaluate(function() {
      var links = document.getElementsByTagName('a');
      var more = Array.prototype.filter.call(links, function(n) {
        return n.innerHTML.toLowerCase() === 'load more';
      })[0];
      more.click();
    });
    let previousHeight = 0;
    let currentHeight = -1;
    while (previousHeight !== currentHeight && currentHeight < 200000) {
      console.log('scrolling', previousHeight, currentHeight);
      previousHeight = currentHeight;
      currentHeight = yield nightmare.evaluate(() => document.body.scrollHeight);
      yield nightmare.scrollTo(currentHeight, 0)
        .wait(600);
    }
    yield nightmare.html(`./pages/${tag}`, 'HTMLComplete');
  }
  yield nightmare.end();
  yield nightmare.then(() => console.log('Finished save')).catch(error => {
    console.error('Search failed:', error);
  });
};

vo(run)(err => {
  console.dir(err);
  console.log('done');
});
