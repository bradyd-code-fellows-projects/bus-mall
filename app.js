'use strict';

// ********************* GLOBAL VARIABLES *********************

let numberOfVotingRounds = 25;
let productArray = [];


// ********************* DOM REFERENCES ***********************

let productImagesContainer = document.getElementById('product-images-container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

let resultsList = document.getElementById('display-results');
let resultsBtn = document.getElementById('show-results-btn');

// ********************* CONSTRUCTOR **************************


function Product(name, fileExtension) {
  this.productName = name;
  this.img = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;

  productArray.push(this);
}

new Product('sweep', 'png');
new Product('bag', 'jpg');
new Product('banana','jpg');
new Product('bathroom', 'jpg');
new Product('boots', 'jpg');
new Product('breakfast', 'jpg');
new Product('bubblegum', 'jpg');
new Product('chair', 'jpg');
new Product('cthulhu', 'jpg');
new Product('dog-duck', 'jpg');
new Product('dragon', 'jpg');
new Product('pen', 'jpg');
new Product('pet-sweep', 'jpg');
new Product('scissors', 'jpg');
new Product('shark', 'jpg');
new Product('sweep', 'jpg');
new Product('tauntaun', 'jpg');
new Product('unicorn', 'jpg');
new Product('water-can', 'jpg');
new Product('wine-glass', 'jpg');


// ********** EXECUTBALE CODE - HELPER FUNCTIONS **************

function getRandomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderProductImg() {

  // get random index for each img

  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  // make sure each img is different

  // while (productOneIndex === productTwoIndex || productOneIndex === productThreeIndex ) {
  //   productOneIndex = getRandomIndex();
  // }
  // while (productTwoIndex === productOneIndex || productTwoIndex === productThreeIndex) {
  //   productTwoIndex = getRandomIndex();
  // }
  // while (productThreeIndex === productOneIndex || productThreeIndex === productTwoIndex) {
  //   productThreeIndex = getRandomIndex();
  // }

  imgOne.src = productArray[productOneIndex].img;
  imgOne.alt = productArray[productOneIndex].productName;
  productArray[productOneIndex].views++;

  imgTwo.src = productArray[productTwoIndex].img;
  imgTwo.alt = productArray[productTwoIndex].productName;
  productArray[productTwoIndex].views++;

  imgThree.src = productArray[productThreeIndex].img;
  imgThree.alt = productArray[productThreeIndex].productName;
  productArray[productThreeIndex].views++;

}

renderProductImg();

console.log(productArray[0]);

// ******************* EVENT HANDLERS *************************

function clickHandler(e) {
  let imgClicked = e.target.alt;

  console.log(`${imgClicked} was clicked on`, productArray[0].img);

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].productName) {
      productArray[i].clicks++;
    }
  }

  numberOfVotingRounds--;

  if (numberOfVotingRounds === 0) {
    productImagesContainer.removeEventListener('click', clickHandler);
  }

  // three new products now display

  renderProductImg();

}

function showResultsHandler() {
  if (numberOfVotingRounds === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let li = document.createElement('li');
      resultsList.appendChild(li);
      li.textContent = `${productArray[i].productName}: ${productArray[i].views} views, ${productArray[i].clicks} votes.`;
    }
  }
}

showResultsHandler();
// ****************** EVENT LISTENERS *************************

productImagesContainer.addEventListener('click', clickHandler);
resultsBtn.addEventListener('click', showResultsHandler);
