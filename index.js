//class imports
import { Locator } from "./Locate.js";
import { Format_time } from "./Time_format.js";
import { Navigate } from "./Navigator.js"; // will be for css manipulation, currently useless
import { Utility } from "./Utility.js";
import { Sender } from "./EventHandler/Sender.js";
import FingerprintJS from 'https://esm.run/@fingerprintjs/fingerprintjs@3';


//Variables
const LA=18.252096;
const LO=122.001236;
const minimum_distance_in_meters=100;
const url = 'https://script.google.com/macros/s/AKfycbzRMQ5ZyV_gDDZvlGtd_-gZtUG6ki3tzMYLl3lVsOvB2JysrcYwuF2e__sZiWUWllF1/exec';


//const Id=document.getElementById("ID Number");
const submit_button=document.getElementById("submit_btn");
const display=document.getElementById("Text");
const first_name=document.getElementById("Name");
const middle_initial=document.getElementById("MiddleName");
const last_name=document.getElementById("LastName");
const EventTool= await Utility.getData(url,display);
const out =await EventTool.timeOut;
let once;


//class initialization



//Initializing functions
async function getFingerprint() 
{
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; 
}

const UserId = await getFingerprint();

const returnedName = await requestName(UserId)


const timeFormat= new Format_time()
//Arrays or lists

//to do
//middle initial no . at the end
//remove id when the log off is not empty d
//see if there are similar names, turn to lowercase
// if timeOut is not empty remove the id d
//if time is after the timeOut let them insert log out d
//if time is after end, display == welcome back {name} please enter the required parameters for Time out d
//


console.log(`${out}:${timeFormat.raw()}`)
//Commands

console.log(EventTool)
console.log(Utility.flagEvent())


if (EventTool.eventName=="")
  {
    display.textContent="Currently no ongoing event"
  }
else{display.textContent=`the event for today is ${EventTool.eventName}`}

if(EventTool.userId.includes(UserId)&& Number(out) < Number(timeFormat.raw()))
  {
    display.textContent=`welcome back ${returnedName.name}! fill out the required fields to log off`
  }
else if(EventTool.userId.includes(UserId) &&  Number(out) > Number(timeFormat.raw()))
  {
    display.textContent=`You are registered, Log off will be at ${await Format(out)}`
  }

  const lat=EventTool.lat;
  const long=EventTool.long;

submit_button.onclick= async ()=>
    {
      display.textContent="Processing... please wait"
      const EventTool= await Utility.getData(url,display);
     
      if(once==2 || EventTool.userId.includes(UserId) &&  Number(out) > Number(timeFormat.raw()))
      {
        console.log(EventTool.timeOut)
        display.textContent=`You are already registered log off will be at ${await Format(out)}`
      }
      else if(once ==1 ){display.textContent="Stop Mashing the button!"}
      else
        {
         navigator.geolocation.getCurrentPosition(position => 
        { 
            const student_latitude=position.coords.latitude;
            const student_longitude=position.coords.longitude;
            const distance =Get_distance(student_latitude,student_longitude,lat,long);
        if(distance <= minimum_distance_in_meters)
            {
              if (once!=2){once=1;}
              if(EventTool.userId.includes(UserId) && Number(out) < Number(timeFormat.raw()))
                {
                  console.log("ff");
                  //place log off
                  initialize(timeFormat.time());
                }
              else{initialize("null")}
            }
        else{display.textContent='You need to be near the event'}
        },Get_Unsuccessful,{
          enableHighAccuracy:true, timeout: 10000, maximumAge:0
        });
        }
        
      }

function initialize(logOff)
{
          const program=document.querySelector(`input[name="program"]:checked`);
          const year_level=document.querySelector(`input[name="level"]:checked`);
          const date = new Format_time();
          console.log(date.time());
          console.log(date.date());


            const student =
            {
                first_name:first_name.value.toUpperCase(),
                middle_initial:middle_initial.value.toUpperCase(),
                last_name:last_name.value.toUpperCase(),
                date:date.date(),
                time:date.time(),
                year_level:Utility.checkYear(year_level),
                program:Utility.checkProgram(program),
                flagCeremony:Utility.flagEvent(),
                userId:UserId,
                logOff:logOff,
            } 
            
            console.log(`${student.first_name}:${student.middle_initial}:${student.last_name}`);
            console.log(student.date)
            console.log(Utility.checkProgram(program))
            console.log(student)
            send(student); 
}
function send (student) 
  {
    const formData = new FormData();
    formData.append("date",student.date);
    formData.append("time",student.time);
    formData.append("first_name", student.first_name);
    formData.append("middle_initial", student.middle_initial);
    formData.append("last_name", student.last_name);
    formData.append("year_level",student.year_level);
    formData.append("program",student.program);
    formData.append("userId",student.userId);
    formData.append("logOff",student.logOff);
    //formData.append("flagCeremony",student.flagCeremony);

    fetch(url,
    {
      method: 'POST',
      body: formData,
    })
    .then(() => 
    {
      console.log("Submitted successfully");
      display.textContent=`Complete!`;
      once==2;
    })
    .catch(err => {
      console.error("Submission failed", err);
      display.textContent=`Submission Failed Check Your Internet Connection`;
    });
  }
async function Format(data) {
    let dataO = String(data).padStart(4, "0");

    let hour = parseInt(dataO.slice(0, 2), 10); 
    let minute = dataO.slice(2, 4); 
    let meridiem = "AM";

    if (hour === 0) {
        hour = 12; 
    } else if (hour === 12) {
        meridiem = "PM"; 
    } else if (hour > 12) {
        hour -= 12;
        meridiem = "PM";
    }

    return `${hour}:${minute} ${meridiem}`;
}

async function requestName(ID)
{
  try{
  const formData = new FormData();
  formData.append("userId",ID)
  formData.append("first_name","REQUESTNAME")

  const data = await
  fetch(url,{method:"POST",body:formData})
    const respo = await data.json();
    return respo;
  } catch(err)
  {
    display.textContent="Fetch failed:", err;
    return null;
  }
}
function Get_Unsuccessful()
{
    display.textContent="Requesting Location Permission...";
    return;
}
function convert_degrees_to_radians(degrees)
{
    return degrees*(Math.PI /180);
}


function Get_distance(student_latitude,student_longitude,school_latitude,school_longitude)
{
    const Earth_radius = 6371000;

    const compare_latitude_distance=convert_degrees_to_radians(school_latitude-student_latitude);
    const compare_longitude_distance=convert_degrees_to_radians(school_longitude-student_longitude);

    const formulate = Math.sin(compare_latitude_distance/2) ** 2 + Math.cos(convert_degrees_to_radians(student_latitude))* Math.cos(convert_degrees_to_radians(school_latitude)) * Math.sin(compare_longitude_distance/2) ** 2;
    const meters = 2 * Math.asin(Math.sqrt(formulate));
    return Earth_radius * meters;
}


    




