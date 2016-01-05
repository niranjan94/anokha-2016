// set the date we're counting down to
var target_date = new Date('Feb, 18, 2016').getTime();
 
// variables for time units
var days, hours, minutes, seconds, ms_step=10;
 
// get tag element
var countdown = document.getElementById('countdown');
 
setInterval(function () {
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;
    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;
    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;
    min = parseInt(seconds_left / 60);
    sec = parseInt(seconds_left % 60);
    ms = parseInt(target_date-current_date);
     
    // format countdown string + set tag value
   countdown.innerHTML = ''+
      '<span class="days">'+days+'<b>Days</b></span>'+
      '<span class="hours">'+hours+'<b>Hours</b></span>'+
      '<span class="minutes">'+min+'<b>Minutes</b></span>'+
      '<span class="seconds">'+sec+'<b>Seconds</b></span>';  
// this is just for milliseconds only
  /* countdown.innerHTML = 
      '<span class="ms">'+ms+' ms</span>'; */
}, ms_step);