   
/******* Functions ********/    

    
// Death Rate Function - death / cases
function Arrays_sum(array1, array2) 
{
  var result = [];
  var ctr = 0;
  var x=0;

  if (array1.length === 0) 
   return "array1 is empty";
  if (array2.length === 0) 
   return "array2 is empty";   

 while (ctr < array1.length && ctr < array2.length) 
  {
    result.push(((array1[ctr] / array2[ctr]) * 100).toFixed(2));
    ctr++;
  }

 if (ctr === array1.length) 
 {
    for (x = ctr; x < array2.length; x++)   {
      result.push(array2[x]);
    }
  } 
  else
  {
  for (x = ctr; x < array1.length; x++) 
    {
      result.push(array1[x]);
    }
  }
  return result;
}
        
// Rate of change ( firstCase - secondCase / firstCase )
function RateOfChange(totalCases) {  
 var arr = totalCases;
        //var arr=[96448, 35780];         
          var diff=[];
          $.each(arr,function(i,v){
           //96448 - 35780 = 60668 / 96448 = 0,629 * 100 = 62,9%
           if(i==arr.length-1){
            diff.unshift('0');
            return;
           }
           var first=v;
           var second=arr[i+1];
             var calc =(((first - second)/first)* -100).toFixed(2);
             diff.push(calc);
          });
            return diff; 
//          alert(diff.toString());
}          
       
// Grab Last Item in Array 
 
function lastItem(array) { 
  var last = array[array.length - 1]; 
return last;     
  
}
 
// Add Thousand Seperator    
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}    

  
/******* Variables ********/
var days = ['Mar-28', 'Feb-29', 'Mar-1', 'Mar-2', 'Mar-3', 'Mar-4',  'Mar-5', 'Mar-6', 'Mar-7', 'Mar-8', 'Mar-9', 'Mar-10', 'Mar-11','Mar-12', 'Mar-13', 'Mar-14', 'Mar-15', 'Mar-16', 'Mar-17', 'Mar-18','Mar-19','Mar-20','Mar-21','Mar-22','Mar-23' ,'Mar-24' ,'Mar-25' ,'Mar-26', 'Mar-27', 'Mar-28'];     
var dataTotalCases = [8,17,29,33,57,75,95,148,179,242,338,381,462,528,672,771,896,1019,1184,1347,1499,1733,1952,2178,2373,2731,3168,3700,4284,4896 ]; 
var dataDeaths = [4,5, 8, 11, 14, 16, 20,26,27,32, 36,38, 41, 45, 48, 52, 56, 67, 76, 80, 87, 96, 102, 115, 126, 133, 142, 158, 167, 169];  
var dataDeathRate = Arrays_sum(dataDeaths, dataTotalCases); 
var dataTotalCasesRateChange = RateOfChange(dataTotalCases); 
    
    
/******* Dom Manipulations  - Stats ********/  
 
var lastTotalCase = numberWithCommas(lastItem(dataTotalCases)); 
var lastDeaths =  lastItem(dataDeaths); 
var lastDeathRate = lastItem(dataDeathRate);    

    
// Add data to the page
document.getElementById("currentDeathRate").innerHTML = 'Death Rate: ' + lastDeathRate  + '%';
document.getElementById("currentDeaths").innerHTML = 'Total Deaths: ' + lastDeaths;
document.getElementById("currentCases").innerHTML = 'Total Cases: ' + lastTotalCase;


/******* Charts ********/
    
// Chart Global Options
Chart.defaults.global.legend.position = 'top';  
Chart.defaults.global.legend.labels.fontColor = 'white';  
Chart.defaults.global.defaultFontColor = 'white';     
Chart.defaults.global.layout = {padding: {
                left: 10,
                right: 30,
                top: 10,
                bottom: 10
            } };
Chart.defaults.scale.gridLines.color = "rgba(255, 255, 255, 0.2)"; 
Chart.defaults.global.responsive = true;
Chart.defaults.scale.ticks.beginAtZero = true;    

// A plugin to draw the background color
Chart.plugins.register({
  beforeDraw: function(chartInstance) {
    var ctx = chartInstance.chart.ctx;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
  }
    
});     
        
// Total Cases Chart   
var ctx2 = document.getElementById('totalCases').getContext('2d');
var myChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: 'Total Cases',
            data: dataTotalCases,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor:  'rgba(255, 99, 132, 1)',
            borderWidth: 3
        }]
    },
   
    
});
    
// Death Rate Chart  
var ctx = document.getElementById('deathRate').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: 'Death Rate',
            data: dataDeathRate,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 3
        }]
    },
    options:  {
       
        tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  return Chart.defaults.global.tooltips.callbacks.label(tooltipItem, data) + '%';
                }
              }
        }

    }, 
    
  
});   
    
// Total Deaths  
var ctx = document.getElementById('totalDeaths').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: 'Total Deaths',
            data: dataDeaths,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
           borderColor:  'rgba(75, 192, 192, 1)',
           borderWidth: 3
        }]
    },
});      
    
// Total Cases Rate Change 
var ctx = document.getElementById('totalCasesRateChange').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: 'Total Cases Rate Change',
            data: dataTotalCasesRateChange,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
               
            borderWidth: 3
        }]
    },
    options: {
        tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  return Chart.defaults.global.tooltips.callbacks.label(tooltipItem, data) + '%';
                }
              }
        }
           
    }
});   
    