'use strict';

// ********************* GLOBAL VARIABLES *********************

let numberOfVotingRounds = 4;
let productArray = [];


// ********************* DOM REFERENCES ***********************

let productImagesContainer = document.getElementById('product-images-container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

// let resultsList = document.getElementById('display-results');
let resultsBtn = document.getElementById('show-results-btn');

// ******************* CANVAS REFERENCE ***********************

let ctx = document.getElementById('resultsChart');


// ********************* CONSTRUCTOR **************************


function Product(name, fileExtension = 'jpg') {
  this.productName = name;
  this.img = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;

  productArray.push(this);
}

new Product('sweep', 'png');
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


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

// ******************* RENDER CHART ***************************


function renderResultsChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    const currentProduct = productArray[i];
    productNames.push(currentProduct.productName);
    productVotes.push(currentProduct.clicks);
    productViews.push(currentProduct.views);
  }

  let resultsChartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes', // # votes and # views
        data: productVotes,
        backgroundColor: [
          'rgba(116, 90, 156, 0.5)'
        ],
        borderColor: [
          'rgba(186, 133, 40, 0.8)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views', // # votes and # views
        data: productViews, // the actual view or votes
        backgroundColor: [
          'rgba(186, 133, 40, 0.8)'
        ],
        borderColor: [
          'brgba(116, 90, 156, 0.5)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };


  new Chart(ctx, resultsChartObj);
}


// ******************* EVENT HANDLERS *************************

function clickHandler(e) {
  let imgClicked = e.target.alt;

  console.log(`${imgClicked} was clicked on`);

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].productName) {
      productArray[i].clicks++;
    }
  }

  numberOfVotingRounds--;

  if (numberOfVotingRounds === 0) {
    productImagesContainer.removeEventListener('click', clickHandler);
    productImagesContainer.remove();
  }

  // three new products now display

  renderProductImg();
}

function showResultsHandler() {
  if (numberOfVotingRounds === 0) {
    // for (let i = 0; i < productArray.length; i++) {
    //   let li = document.createElement('li');
    //   resultsList.appendChild(li);
    //   li.textContent = `${productArray[i].productName}: ${productArray[i].views} views, ${productArray[i].clicks} votes.`;
    // }
    renderResultsChart();
  }
}
showResultsHandler();

function removeResultsBtn() {
  resultsBtn.remove();
}
// ****************** EVENT LISTENERS *************************

productImagesContainer.addEventListener('click', clickHandler);
resultsBtn.addEventListener('click', showResultsHandler);
resultsBtn.addEventListener('click', removeResultsBtn);
