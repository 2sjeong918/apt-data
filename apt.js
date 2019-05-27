
var header = document.querySelector('header');
var section = document.querySelector('section');
var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
var requestURL2 = './aptdata.json';
var alldata = './db/alldata.json';

// 성남분당판교
var db01 = './db/성남분당판교.json';
var db02 = './db/수원광교.json';
var db03 = './db/김포.json';
var db04 = './db/일산.json';

var request = new XMLHttpRequest();

request.open('GET', alldata);
request.responseType = 'json';
request.send();
request.onload = function() {
  // var superHeroes = request.response;
  var aptdata = request.response;
  console.log("아파트데이터",aptdata)
  console.log(aptdata[0].아파트명)
  // populateHeader(superHeroes);
  // showHeroes(superHeroes);
  aptName(aptdata)
  // niceRate(aptdata)
  // document.getElementById("demo").innerHTML = aptdata[1];
}
var NameList = [];
var NiceRateList = [];
var newJsonObjList = [];
function aptName(jsonObj) {

  for (var i = 0; i < jsonObj.length; i++) {
    var newJsonObj = {}
    if (jsonObj[i].세대수>100) {
      NameList.push(jsonObj[i].아파트명)
      newJsonObj["x"] =jsonObj[i]["사용승인일"];
      // delete jsonObj[i]["사용승인일"];
      
      var niceArea = jsonObj[i].대지면적 - jsonObj[i].건축면적;
      var houseArea = niceArea / jsonObj[i].세대수;
      var houseAreaRate = houseArea/niceArea*100;
      var NiceRate = 1-houseAreaRate;

      // newJsonObj["y"] = NiceRate;
      // NiceRateList.push(NiceRate); 
      // newJsonObjList.push(newJsonObj);
      newJsonObj["y"] = (houseArea/jsonObj.length*100);
      NiceRateList.push(houseArea); 
      newJsonObjList.push(newJsonObj);
      console.log(houseArea)
    }
  }
  
}
function niceRate(jsonObj) {
  console.log(NiceRateList.length);
}
function calc() {
  var landarea = $('#landarea').val();
  var buildarea = $('#buildarea').val();
  var housenum = $('#housenum').val();

  var niceArea = landarea - buildarea;
  var houseArea = niceArea / housenum;
  var houseAreaRate = houseArea/landarea*100;
  var NiceRate = 1-houseAreaRate;
  

  console.log(NiceRate);
}

var ctx = document.getElementById('myChart');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: NameList,
//         datasets: [{
//             label: '닭장지수',
//             data: NiceRateList,
//             backgroundColor: 
//               '#B71C1C',
//             borderWidth: 0
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });
var scatterChart = new Chart(ctx, {
  type: 'scatter',
  data: {
      labels: [NameList],
      datasets: [{
          label: '닭장지수',
          pointStyle: 'rect',
          data: newJsonObjList,
          backgroundColor: 
              'rgba(255, 209, 46, 0.3)',
          pointHoverBackgroundColor: 
              'rgba(255, 209, 46, 1)',
          borderWidth: 0,
          borderColor: 'rgba(0, 0, 0, 0)',
          pointRadius: 6,
          pointHoverRadius: 15,
          hoverRadius: 1
      }]
  },
  options: {
    tooltips: {
      callbacks: {
         label: function(tooltipItem, data) {
            var label = data.labels[0][tooltipItem.index];
            return label + ': ( 건축년도 : ' + tooltipItem.xLabel + ', ' + "닭장지수 : " + tooltipItem.yLabel + ')';
         }
      }
   },
    scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom',
            
        }]
    },
      
  }
});

