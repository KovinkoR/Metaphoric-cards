import dragAndDropOut from './gamelogic.js';

const chooseDeck = document.getElementById('vertScroll');
// console.log(chooseDeck);

if (chooseDeck) {
  chooseDeck.addEventListener('click', async (event) => {
    event.preventDefault();
    if (event.target.tagName === 'IMG') {
      const response = await fetch(`/game/${event.target.id}`);
      const result = await response.json();
      const { picturePath1, picturePath2 } = result;
      console.log(result);
      // const gorizScroll = document.getElementById('demo');
      const carouselContainer = document.querySelector('.carousel-inner');
      console.log(carouselContainer);
      // const template =
      const hbs = await fetch('/views/carousel.hbs');
      const template = await hbs.text();
      const render = Handlebars.compile(template);
      const element = render({ picturePath1, picturePath2 });
      carouselContainer.innerHTML = element;
      dragAndDropOut();
      // const imgScroll1 = document.getElementsByClassName('imgScroll1');
      // for (let i = 0; i < imgScroll1.length; i += 1) {
      //   imgScroll1[i].src = result.picturePath1[i];
      // }
      // const imgScroll2 = document.getElementsByClassName('imgScroll2');
      // for (let i = 0; i < imgScroll2.length; i += 1) {
      //   imgScroll2[i].src = result.picturePath2[i];
      // }
    }
  });
}
