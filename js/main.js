// features section (Slider)
let nextBtn = document.querySelector(".right");
let preBtn = document.querySelector(".left");
let featContainer = document.querySelector(".features .container");
let width = document.querySelector(".features .card").clientWidth;

nextBtn.addEventListener("click",()=>{
    console.log(featContainer.scrollLeft);
    console.log("cardleft");
    featContainer.scrollLeft += width + 35;
});

preBtn.addEventListener("click",()=>{
    console.log(featContainer.scrollLeft);
    console.log("cardleft");
    featContainer.scrollLeft -= width + 35;
});


// skills section (Progress-Bar)
let mySkillsSec = document.querySelector(".skills")
let progBar = document.querySelectorAll(".skills .bar");
let progVal = document.querySelectorAll(".skills .prog");
let progNums = document.querySelectorAll(".skills .num")

let counters = Array(progVal.length)
console.log(counters)
const interv = Array(counters.length);
console.log(interv)
counters.fill(0)

let i = 0;


// global function to run window.onscroll to muiltable functions
window.onscroll = function(){
    skillsSection(),
    statsSection() // line:196
};

function skillsSection(){
    if(window.scrollY >= (mySkillsSec.offsetTop - 250)){
        // console.log("reached")
        progVal.forEach((ele,index)=>{
            interv[index] = setInterval(()=>{
                if(counters[index] === parseInt(ele.dataset.prog)){
                    clearInterval(counters[index])
                }
                else{
                    counters[index] += 1;
                    progNums[index].innerHTML = counters[index] + "%";
                    progVal[index].style.width = `${counters[index]}%`
                }
            },50)
        })
    }
}

// events section (countdown)

let secDays = document.querySelector(".days");
let secHours = document.querySelector(".hours");
let secMinutes = document.querySelector(".minutes");
let secSeconds = document.querySelector(".seconds");

let endDate = new Date(2023,5,16).getTime();
// console.log(new Date(2023,5,16))
// console.log(endDate)

let counter = setInterval(()=>{

    let dateNow = new Date().getTime();

    // countdown difference
    let count = endDate - dateNow;

    // units calc
    let seconds = Math.floor((count % (1000 * 60)) / 1000 );
    let minutes = Math.floor((count % (1000 * 60 * 60)) / 1000 / 60 );
    let hours = Math.floor((count % (1000 * 60 * 60 * 24)) / 1000 / 60 / 60 );
    let days = Math.floor(count / 1000 / 60 / 60 / 24);


    secDays.innerHTML = days;
    secHours.innerHTML = hours;
    secMinutes.innerHTML = minutes;
    secSeconds.innerHTML = seconds;
})


// top videos section (fetch api)

let myVidSrc = document.getElementById("vidSrc");
let myUl = document.querySelector(".videos .list ul");
let myparag = document.querySelector(".videos p");
let shuffle = document.getElementById("shuffle");
const apiKey = "AIzaSyDlikkkKpF22GaGxiwLWP4PWsh59iTjm8M";
// fetch API from youtube

fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=VHDTIG8TcTY%2CCKc8CdAv3nA%2CoOi3oJmfz4o%2CjfNOdsvMke4%2CJkj36B1YuDU%2CYSULYUxI8f0&key=${apiKey}`).then((data)=>{
    let jsonData = data.json();
    console.log(jsonData);
    return jsonData;
}).then((jsonData)=>{
    let items = jsonData.items;
    console.log(items)
    return items;
}).then((myItems)=>{

    let myIds = []
    myItems.forEach((item)=>{
            // console.log(item);
            myIds.push(item.id);
            let myLi = document.createElement("li");
            document.createElement("span");
            myLi.id = item.id;
            let title = item.snippet.title;
            
            myLi.append(title);

            // edit duration 
            let durData = item.contentDetails.duration;
            let fullDur = durData.split(/[PTS]/);
            let myduration = fullDur[2].replace("M",":");
            console.log(myduration)
            let myspan = document.createElement("span");
            myspan.append(myduration)
            myLi.append(myspan);
            
            myUl.append(myLi)

            /////change paragraph content && video src 
            myLi.addEventListener("click",()=>{
                myparag.innerHTML = myLi.innerText;
                myVidSrc.src = `https://www.youtube.com/embed/${myLi.id}`
            })
        });
        return myIds;
}).then((ids)=>{
    console.log(ids)
    shuffle.addEventListener("click",()=>{
        // get random id
        myVidSrc.src = `https://www.youtube.com/embed/${ids[Math.floor(Math.random() * ids.length)]}`;
    });

}).catch((reason)=>{
    console.log(reason)
})



// async function getYoutubeData(){
//     try{
//         let myApiData = await fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=VHDTIG8TcTY%2CCKc8CdAv3nA%2CoOi3oJmfz4o%2CjfNOdsvMke4%2CJkj36B1YuDU%2CYSULYUxI8f0&key=AIzaSyDlikkkKpF22GaGxiwLWP4PWsh59iTjm8M");
//         let myData = await myApiData.json();
//         // console.log(myData.items);
//         let myItems = myData.items;
//         // console.log(myItems);

//         myItems.forEach((item)=>{
//             console.log(item)
//             let myLi = document.createElement("li");
//             document.createElement("span");
//             myLi.id = item.id;
//             let title = item.snippet.title;
            
//             myLi.append(title);

//             // edit duration 
//             let durData = item.contentDetails.duration;
//             let fullDur = durData.split(/[PTS]/);
//             let myduration = fullDur[2].replace("M",":");
//             console.log(myduration)
//             let myspan = document.createElement("span");
//             myspan.append(myduration)
//             myLi.append(myspan);
            
//             myUl.append(myLi)

//             /////change paragraph content && video src 
//             myLi.addEventListener("click",()=>{
//                 myparag.innerHTML = myLi.innerText;
//                 myVidSrc.src = `https://www.youtube.com/embed/${myLi.id}`
//             }); 
//         });
//     }catch(e){
//         console.log(e)
//     }
// };
// getYoutubeData();



// stats section (counter)
let statsSec = document.getElementById("stats");
let statProg = document.querySelectorAll(".stats .box p");

let statsCoun = Array(statProg.length);
let statsInter = Array(statsCoun.length);

statsCoun.fill(0)

function statsSection(){
    if(window.scrollY >= (statsSec.offsetTop - 300)){
        console.log("reach")
        statProg.forEach((ele,index)=>{
            console.log(statsCoun[index])
            statsInter[index] = setInterval(()=>{
                if(statsCoun[index] == ele.dataset.stat){
                    clearInterval(statsInter[index]);
                }
                else{
                    statsCoun[index] += 1;
                    ele.innerHTML = statsCoun[index];
                }
            },50)
        })
    }
}

