'use strict';
const names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
const extension = ['jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'gif', 'jpg', 'jpg',]

const leftImage = document.getElementById('left-image');
const middleImage = document.getElementById('middle-image');
const rightImage = document.getElementById('right-image');
const imagesSection = document.getElementById('img-section');
const buttonContainer = document.getElementById('result-button');
const listContainer = document.getElementById('list');
let round = 0;
let previousLeftIndex;
let previousMiddleIndex;
let previousRightIndex;

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
console.table(Item.all)

function render() {
  let leftIndex=randomNumber(0, Item.all.length - 1);
  while (leftIndex === previousLeftIndex || leftIndex === previousMiddleIndex || leftIndex === previousRightIndex) {
    leftIndex = randomNumber(0, Item.all.length - 1);    
  }
  leftImage.src = Item.all[leftIndex].path;
  leftImage.title = Item.all[leftIndex].name;
  leftImage.alt = Item.all[leftIndex].name;
  Item.all[leftIndex].views++;

  let middleIndex=randomNumber(0, Item.all.length - 1);
  while (middleIndex === leftIndex || middleIndex === previousLeftIndex || middleIndex === previousMiddleIndex || middleIndex === previousRightIndex) {
    middleIndex = randomNumber(0, Item.all.length - 1); }
    middleImage.src = Item.all[middleIndex].path;
  middleImage.title = Item.all[middleIndex].name;
  middleImage.alt = Item.all[middleIndex].name;
  Item.all[middleIndex].views++;
   
  
  let rightIndex=randomNumber(0, Item.all.length - 1);
  while (rightIndex === leftIndex || rightIndex === middleIndex || rightIndex === previousLeftIndex || rightIndex === previousMiddleIndex || rightIndex === previousRightIndex){rightIndex = randomNumber(0, Item.all.length - 1)}

    rightImage.src = Item.all[rightIndex].path;
    rightImage.title = Item.all[rightIndex].name;
    rightImage.alt = Item.all[rightIndex].name;
    Item.all[rightIndex].views++;
  
  previousRightIndex=rightIndex;
  previousMiddleIndex=middleIndex;
  previousLeftIndex=leftIndex;
 
  // let leftIndex = 0;
  // let middleIndex = 0;
  // let rightIndex = 0;
  // while (leftIndex === middleIndex || middleIndex === rightIndex || leftIndex === rightIndex ) {
  //   leftIndex = randomNumber(0, Item.all.length - 1);
  //   middleIndex = randomNumber(0, Item.all.length - 1);
  //   rightIndex = randomNumber(0, Item.all.length - 1);
  //   imagesShown=[leftIndex,middleIndex,rightIndex];
  //   console.log(imagesShown);
  // }

  // leftImage.src = Item.all[leftIndex].path;
  // leftImage.title = Item.all[leftIndex].name;
  // leftImage.alt = Item.all[leftIndex].name;
  // Item.all[leftIndex].views++;

  // middleImage.src = Item.all[middleIndex].path;
  // middleImage.title = Item.all[middleIndex].name;
  // middleImage.alt = Item.all[middleIndex].name;
  // Item.all[middleIndex].views++;

  // rightImage.src = Item.all[rightIndex].path;
  // rightImage.title = Item.all[rightIndex].name;
  // rightImage.alt = Item.all[rightIndex].name;
  // Item.all[rightIndex].views++;
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
    round++;
    if (round===25){
      imagesSection.removeEventListener('click', handleClick); 
      const buttonEl=document.createElement('button');
      buttonContainer.appendChild(buttonEl);
      buttonEl.textContent = 'Show Results';
    }
  }
}
buttonContainer.addEventListener('click',clickButton);
function clickButton(event){
  buttonContainer.removeEventListener('click', clickButton);
  for (let i = 0; i < Item.all.length; i++) {
    const listItemEl = document.createElement('li');
    listContainer.appendChild(listItemEl);
    listItemEl.textContent= Item.all[i].name + ': ' + Item.all[i].views + ' views and ' + Item.all[i].votes + ' votes.';    
  }
  createChart();   
}

function createChart() {
  const ctx = document.getElementById('chart').getContext('2d');

  const itemNames = [];
  const itemVotes = [];
  const itemViews = [];
  for (let i = 0; i < Item.all.length; i++) {
    itemNames.push(Item.all[i].name);
    itemVotes.push(Item.all[i].votes);
    itemViews.push(Item.all[i].views);
  }
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [
        {
          barPercentage: 0.9,
          borderWidth: 1,
          label: 'number of votes:',
          backgroundColor: 'rgb(24, 24, 29)',
          borderColor: 'rgb(0, 0, 0)',
          data: itemVotes,
        },
        {
          barPercentage: 0.9,
          borderWidth: 1,
          label: 'number of views:',
          backgroundColor: 'rgb(126, 124, 124)',
          borderColor: 'rgb(0, 0, 0)',
          data: itemViews,

        }
      ],
    },
    options: {},
  });
}




//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
render();