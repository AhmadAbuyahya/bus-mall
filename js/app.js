'use strict';
const names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
const extension = ['jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'gif', 'jpg', 'jpg',]

const leftImage = document.getElementById('left-image');
const middleImage = document.getElementById('middle-image');
const rightImage = document.getElementById('right-image');
const imagesSection = document.getElementById('img-section');


function Item(name, extension) {
  this.name = name;
  this.path = `./images/${name}.${extension}`;
  this.votes = 0;
  this.views = 0;
  Item.all.push(this);
}

Item.all = [];

for (let i = 0; i < names.length; i++) {
  new Item(names[i], extension[i]);
}


function render() {
  const leftIndex = randomNumber(0, Item.all.length - 1);
  leftImage.src = Item.all[leftIndex].path;
  leftImage.title = Item.all[leftIndex].name;
  leftImage.alt = Item.all[leftIndex].name;

  const middleIndex = randomNumber(0, Item.all.length - 1);
  middleImage.src = Item.all[middleIndex].path;
  middleImage.title = Item.all[middleIndex].name;
  middleImage.alt = Item.all[middleIndex].name;

  const rightIndex = randomNumber(0, Item.all.length - 1);
  rightImage.src = Item.all[rightIndex].path;
  rightImage.title = Item.all[rightIndex].name;
  rightImage.alt = Item.all[rightIndex].name;

}
imagesSection.addEventListener('click', handleClick);
function handleClick(event) {
  if (event.target.id !== 'img-section') {
    for (let i = 0; i < Item.all.length; i++) {
      if (Item.all[i].name === event.target.title) {
        Item.all[i].votes++;
      }
    }
    render();

  }
}



//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
render();