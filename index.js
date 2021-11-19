function ultastr(str){
    const splited=str.split("")
    const reverse=splited.reverse()
    const joined=reverse.join("")
    return joined
}
function issame(str){
    const ulta=ultastr(str)
    return (ulta===str)
}

var date={
    day:1,
    month:11,
    year:2021
}
var bdaydate=document.querySelector("#birday")
var clickbtn=document.querySelector("#click-btn")
var output=document.querySelector("#output")
clickbtn.addEventListener("click",clickHandler)
function clickHandler(){
    var bdayStr=bdaydate.value
    if(bdayStr!==""){
        var listOfDate=bdayStr.split("-")
        var date={
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year:  Number(listOfDate[0])
        }
        var isPalindrome=checkithere(date)
        if(isPalindrome){
            output.innerText="great u have a palindrome birthday"
        }else{
            var [ctr1,nextdate]=getNextPalindromeDate(date)
            var [ctr2,previousdate]=getPreviousPalindromeDate(date)
            if(ctr1>ctr2){
                output.innerText="the nearest palindrome date is "+ previousdate.day+"-"+previousdate.month+"-"+previousdate.year+"u missed it by "+ctr2+"days!"
            }else{
                output.innerText="the nearest palindrome date is "+ nextdate.day+"-"+nextdate.month+"-"+nextdate.year+" u missed it by "+ctr1+"days!"
            }
           
        }
      
    }
}

function aboutdate(date){
const dateStr={
    day:"",
    month:"",
    year:""
}
if(date.day<10){
    dateStr.day="0"+date.day
}else{
    dateStr.day=date.day.toString()
}
if(date.month<10){
    dateStr.month="0"+date.month
}else{
    dateStr.month=date.month.toString()
}
dateStr.year=date.year.toString();
return dateStr
}

function dateFormats(date){
    const df=aboutdate(date)
    var ddmmyyyy=df.day+df.month+df.year
    var mmddyyyy=df.month+df.day+df.year
    var yyyyddmm=df.year+df.day+df.month
    var ddmmyy=df.day+df.month+df.year.slice(-2)
    var mmddyy=df.month+df.day+df.year.slice(-2)
    var yyddmm=df.year.slice(-2)+df.day+df.month
    return [ddmmyyyy,mmddyyyy,yyyyddmm,ddmmyy,mmddyy,yyddmm]
}
function checkithere(date){
const listOfFormats=dateFormats(date)
var flag=false
for(var i=0;i<listOfFormats.length;i++){
    if(issame(listOfFormats[i])){
        flag=true
        break
    }
    
}
return flag
}
function isLeap(year){
    if(year%4==0){
        return true
    }
}


function getnextDate(date){
    var day=date.day+1;
    var month=date.month;
    var year=date.year;
    var noOfDays=[31,28,31,30,31,30,31,31,30,31,30,31]
if(month===2){
    if(isLeap(year)){
        if(day>29){
            day=1;
            month++;
        }}else{
            if(day>28){
                day=1;
                month++;
            }
        

    }
}else{
    if(day>noOfDays[month-1]){
        day=1;
        month++;

    }
}
if(month>12){
    month=1;
    year++;
}
return {day:day,month:month,year:year}
}
  
function getNextPalindromeDate(date){
    var ctr1=0;
    var nextdate=getnextDate(date)
    while(1){
        ctr1++
        var palin=checkithere(nextdate)
        if(palin){
            break
        }
        nextdate=getnextDate(nextdate)
    }
    return [ctr1,nextdate]
}

function getPreviousDate(date){
    var day=date.day-1;
    var month=date.month;
    var year=date.year;
    var daysOfMonth=[31,28,31,30,31,30,31,31,30,31,30,31]
    if(day===0){
        month--;
        if(month===0){
            day=31;
            month=12;
            year--;
        }else if(month===2){
            if(isLeap(year)){
                day=29
            }else{
                day=28
            }
        }
else{
    day=daysOfMonth[month-1]
}
    }
    return {day:day,month:month,year:year}
}
function getPreviousPalindromeDate(date){
    var ctr2=0;
    var previousdate=getPreviousDate(date)
    while(1){
        ctr2++
        var isPalin=checkithere(previousdate)
        if(isPalin){
            break
        }
        previousdate=getPreviousDate(previousdate)
    }
    return [ctr2,previousdate]
}
