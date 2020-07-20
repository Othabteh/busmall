'use strict'

var imgArr = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "tauntaun.jpg", "unicorn.jpg", "water-can.jpg", "wine-glass.jpg", "usb.gif", "sweep.png"];

var allImg = [];
var imgName = [];
var numberOfClicks = [];
var numberOfViews = [];
var indexArr = [];

function randomNumber() {
    return (Math.floor(Math.random() * imgArr.length));
} randomNumber();

function imgGenerator(name) {
    this.Name = name;
    this.imgPath = `images/${name}`;
    this.clicks = 0;
    this.views = 0;
    allImg.push(this);
    imgName.push(this.Name.slice(0, name.length - 4))
}
for (let index = 0; index < imgArr.length; index++) {
    new imgGenerator(imgArr[index]);
}
render();
var imgSection = document.getElementById('imgSection');
var leftImg, midImg, rightImg;
var leftImgIndex, midImgIndex, rightImgIndex;
function render() {
    leftImgIndex = randomNumber();
    midImgIndex = randomNumber();
    rightImgIndex = randomNumber();
    while (leftImgIndex === midImgIndex || midImgIndex === rightImgIndex || leftImgIndex === rightImgIndex || !checker(leftImgIndex,midImgIndex,rightImgIndex)) {
        leftImgIndex = randomNumber();
        midImgIndex = randomNumber();
        rightImgIndex = randomNumber();
    }
    // while(!checker(leftImgIndex,midImgIndex,rightImgIndex)){
    //     leftImgIndex = randomNumber();
    //     midImgIndex = randomNumber();
    //     rightImgIndex = randomNumber();
    // }
    console.log( ` prev.prod${indexArr}`);
    indexArr[0]=leftImgIndex;
    indexArr[1]=midImgIndex;
    indexArr[2]=rightImgIndex;
    console.log( ` after.prod${indexArr}`);
    // checker(leftImgIndex,midImgIndex,rightImgIndex);
    var first = document.getElementById('first');
    leftImg = allImg[leftImgIndex];
    var leftImgPath = leftImg.imgPath;
    leftImg.views++;
    first.setAttribute('src', leftImgPath);
    first.setAttribute('title', leftImg.Name);

    var second = document.getElementById('second');
    midImg = allImg[midImgIndex];
    var midImgPath = midImg.imgPath;
    midImg.views++;
    second.setAttribute('src', midImgPath);
    second.setAttribute('title', midImg.Name);


    var third = document.getElementById('third');
    rightImg = allImg[rightImgIndex];
    var rightImgPath = rightImg.imgPath;
    rightImg.views++;
    third.setAttribute('src', rightImgPath);
    third.setAttribute('title', rightImg.Name);
    // indexArr.push(leftImgIndex, midImgIndex, rightImgIndex);


}
var totalClicks = 0;
imgSection.addEventListener('click', clickHandler)
function clickHandler() {
    if (totalClicks < 25) {
        var clickedElementId = event.target.id;
        if (clickedElementId === 'first' || clickedElementId === 'second' || clickedElementId === 'third') {
            totalClicks++;

            if (clickedElementId === 'first') {
                leftImg.clicks++;
            }
            if (clickedElementId === 'second') {
                midImg.clicks++;
            }
            if (clickedElementId === 'third') {
                rightImg.clicks++;
            }
            // checker(leftImgIndex, midImgIndex, rightImgIndex);
            render();

            // while(leftImgIndex===indexArr[0]||leftImgIndex===indexArr[1]||leftImgIndex===indexArr[2]||midImgIndex===indexArr[0]||midImgIndex===indexArr[1]||midImgIndex===indexArr[2]||rightImgIndex===indexArr[0]||rightImgIndex===indexArr[1]||rightImgIndex===indexArr[2]){
            //     leftImgIndex=randomNumber();
            //     rightImgIndex=randomNumber();
            //     midImgIndex=randomNumber();

            // } 

            // console.log(indexArr);


        }
    } else {

        populateNumberOfClicksAndViewsArr();
        generateChart();
        generateUserMessage();
        imgSection.removeEventListener('click', clickHandler);

    }


}
function checker(x, y, z) {
    // var flage=true;
    if (indexArr.includes(x)){
        return false;
        // leftImgIndex = randomNumber();
        // indexArr[0]=leftImgIndex
    } if(indexArr.includes(y) ){
        return false;
        // midImgIndex = randomNumber();
        // indexArr[1]=midImgIndex
    }if(indexArr.includes(z)){
        return false;
        // rightImgIndex = randomNumber();
        // indexArr[2]=rightImgIndex;

    }
    return true;
        
    }
    

    // console.log(x, y, z);

function generateUserMessage() {
    var textSection = document.getElementById('textSection');
    var ulList = document.createElement('ul')
    ulList.setAttribute('class', 'ul')
    for (let index = 0; index < allImg.length; index++) {
        // var imgList=document.createElement('img');
        // imgList.setAttribute('src',allImg[index].imgPath);
        // var imgCap=document.createElement('figcaption')
        // imgCap.textContent=`${imgName[index]} had ${allImg[index].clicks} votes and was shown ${allImg[index].views} times`;
        var li = document.createElement('li');
        li.setAttribute('class', 'li')
        li.textContent = `${imgName[index]} had ${allImg[index].clicks} votes and was shown ${allImg[index].views} times`;
        // imgList.appendChild(imgCap);
        // textSection.appendChild(imgList);
        ulList.appendChild(li);
        textSection.appendChild(ulList);
    }
}

function populateNumberOfClicksAndViewsArr() {
    for (let index = 0; index < allImg.length; index++) {
        numberOfClicks.push(allImg[index].views);
        numberOfViews.push(allImg[index].clicks);
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
                backgroundColor: [
                    '#f73859',

                ],
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
}