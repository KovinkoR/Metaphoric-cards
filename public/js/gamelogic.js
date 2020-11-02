/* eslint-disable func-names */
const dragAndDrop = () => {
  const carusel = document.querySelector('#demo');
  let newCard;

  carusel.addEventListener('dragstart', (event) => {
    if (event.target.tagName === 'IMG') {
      event.target.classList.add('hide');
      const card = event.target;
      newCard = card;
    }
  });
  carusel.addEventListener('dragend', (event) => {
    if (event.target.tagName === 'IMG') {
      event.target.classList.remove('hide');
    }
  });
  const cardHolders = document.querySelectorAll('.card-holder');
  cardHolders.forEach((holder) => {
    holder.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    holder.addEventListener('dragenter', function (event) {
      event.target.classList.remove('bg-success');
      this.classList.add('hovered');
    });
    holder.addEventListener('dragleave', function (event) {
      event.target.classList.remove('hovered');
      this.classList.add('bg-success');
    });
    holder.addEventListener('drop', function (event) {
      if (!holder.children[0]) {
        event.target.classList.remove('hovered');
        this.classList.add('bg-success');
        this.append(newCard);
        newCard.classList.remove('hide');
        // добавить этот класс при возвращении в карусель
        newCard.classList.remove('imgScroll1');
        newCard.setAttribute('style', 'width:100%; height: 17em;');
        newCard = '';
      }
    });
  });
};
dragAndDrop();

const dragAndDropOut = () => {
  const playGround = document.querySelector('#playground-2');
  let newCard;

  playGround.addEventListener('dragstart', (event) => {
    if (event.target.tagName === 'IMG') {
      event.target.classList.add('hide');
      const card = event.target;
      newCard = card;
    }
  });
  playGround.addEventListener('dragend', (event) => {
    if (event.target.tagName === 'IMG') {
      event.target.classList.remove('hide');
    }
  });
  const trashCan = document.querySelector('#trashCan');
  trashCan.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  trashCan.addEventListener('dragenter', function () {
    this.classList.add('hovered');
  });
  trashCan.addEventListener('dragleave', (event) => {
    console.log(event.target);
    event.target.classList.remove('hovered');
  });
  trashCan.addEventListener('drop', function (event) {
    this.classList.remove('hovered');
    newCard.classList.remove('hide');
    newCard.remove();
    newCard = '';
  });

  const imgHolders = document.querySelectorAll('.img-holder');
  imgHolders.forEach((holder) => {
    holder.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    holder.addEventListener('dragenter', function (event) {
      event.target.classList.remove('bg-light');
      this.classList.add('hovered');
    });
    holder.addEventListener('dragleave', function (event) {
      event.target.classList.remove('hovered');
      this.classList.add('bg-light');
    });
    holder.addEventListener('drop', function (event) {
      if (!holder.children[0]) {
        event.target.classList.remove('hovered');
        this.classList.add('bg-light');
        this.append(newCard);
        newCard.classList.remove('hide');
        newCard.classList.add('imgScroll1');
        newCard.setAttribute('style', 'width:100%; height: 100%;');
        newCard = '';
      }
    });
  });
};
dragAndDropOut();

export default dragAndDropOut;
