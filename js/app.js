'use_strict'
var userRoundInput=prompt('Enter how many time you whant to loop?')
var imgArr=["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "tauntaun.jpg", "unicorn.jpg", "water-can.jpg", "wine-glass.jpg", "usb.gif", "sweep.png"];
var imgSection = document.getElementById('imgSection');
var first=document.getElementById('first');
var second=document.getElementById('second');
var third=document.getElementById('third');

Product.all=[];
var randoumNumberArr=[];
var numberOfClicks = [];
var numberOfViews = [];
var imgName = [];
var totalClicks=0;

function Product(name) {
    this.Name=name;
    this.Path=`img/${name}`;
    this.views=0;
    this.clicks=0;

    Product.all.push(this);
    imgName.push(this.Name.slice(0,name.length-4));
  
    
}

for (let index = 0; index < imgArr.length; index++) {
    new Product(imgArr[index]);
    
}

function randomNuberGenerator(min, max) {
  
  return Math.floor(Math.random() * (max - min + 1)) + min; 


}


var img1,img2,img3;


render();

function render(){
 img1=randomNuberGenerator(0,imgArr.length-1);
 img2=randomNuberGenerator(0,imgArr.length-1);
 img3=randomNuberGenerator(0,imgArr.length-1);
    

    while(randoumNumberArr.includes(img1)){
        img1=randomNuberGenerator(0,imgArr.length-1);
    }
    while(img1===img2||randoumNumberArr.includes(img2)){
        img2=randomNuberGenerator(0,imgArr.length-1);
    }
  
    while(img3===img1||img3===img2||randoumNumberArr.includes(img3)){
        img3=randomNuberGenerator(0,imgArr.length-1);
    }

    randoumNumberArr=[];
    randoumNumberArr.push(img1);
    randoumNumberArr.push(img2);
    randoumNumberArr.push(img3);



     first=document.getElementById('first');
     first.src=Product.all[img1].Path;
     Product.all[img1].views++
     second=document.getElementById('second');
     second.src=Product.all[img2].Path;
     Product.all[img2].views++;
     third=document.getElementById('third');
     third.src=Product.all[img3].Path;
     Product.all[img3].views++;
    
}

imgSection.addEventListener('click', clickHandler)
function clickHandler(){
   
    if (totalClicks < userRoundInput) {
        var clickedElementId = event.target.id;
        if (clickedElementId === 'first' || clickedElementId === 'second' || clickedElementId === 'third') {
            totalClicks++;
           if(clickedElementId==='first'){
               Product.all[img1].clicks++;
           }
           if (clickedElementId==='second') {
               Product.all[img2].clicks++;
           }
           if (clickedElementId==='third') {
               Product.all[img3].clicks++;
           }
           render();

            
}
    }else{
        userMessage();
        storeImgs();
        populateNumberOfClicksAndViewsArr();
        generateChart();
        imgSection.removeEventListener('click',clickHandler);
    }
}

function userMessage(){
    var textSection=document.getElementById('textSection');
    var result=document.createElement('h3');
    result.setAttribute('id','result');
    result.textContent='Results :';
    textSection.appendChild(result);
    var ulList=document.createElement('ul')
    ulList.setAttribute('id','ulList')
    for (let index = 0; index < imgArr.length; index++) {
     var liList=document.createElement('li')
     liList.setAttribute('class','liList')   
     liList.textContent=`${Product.all[index].Name} had ${Product.all[index].clicks} votes and was shown ${Product.all[index].views}`
     ulList.appendChild(liList)
     textSection.appendChild(ulList);

    }

}

function populateNumberOfClicksAndViewsArr() {
    for (let index = 0; index < Product.all.length; index++) {
        numberOfClicks.push(Product.all[index].views);
        numberOfViews.push(Product.all[index].clicks);
    }
}


function generateChart() {
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imgName,
            datasets: [{
                label: 'Number of clicks',
                data: numberOfClicks,
                backgroundColor: 
                    '#f73859',

                
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Number of Views',
                data: numberOfViews,
                backgroundColor: '#384259',
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    myChart.canvas.parentNode.style.height = '400px';
myChart.canvas.parentNode.style.width = '900px';
}


function storeImgs(){
    // in order to save our array of objects into the localstorage we will need to formate our json object in json string
    var jsonStringImg = JSON.stringify(Product.all);
    // creare a new property in our localstorage 
    localStorage.setItem('imgs',jsonStringImg);
    console.log(localStorage.getItem('imgs')); 
    parseLocalStorage();

 }


  function parseLocalStorage(){
    var previousImgArr =JSON.parse(localStorage.getItem('imgs'))
    
    // this funtcion will update the newly created objects with the old literation values
    update(previousImgArr);

  
  }
  function update(previousImgArr){
    for (let index = 0; index < Product.all.length; index++) {
      Product.all[index].clicks = previousImgArr[index].clicks;
      Product.all[index].views = previousImgArr[index].views;
      
    }
  }
