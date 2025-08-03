//class imports
import { Locator } from "./Locate.js";
import { Format_time } from "./Time_format.js";
import { Navigate } from "./Navigator.js";
import { Utility } from "./Utility.js";
import { Sender } from "./EventHandler/Sender.js";



//Variables
const school_latitude=18.252096;
const school_longitude=122.001236;
const minimum_distance_in_meters=100;
const url = 'https://script.google.com/macros/s/AKfycbzRMQ5ZyV_gDDZvlGtd_-gZtUG6ki3tzMYLl3lVsOvB2JysrcYwuF2e__sZiWUWllF1/exec';


const user_name=document.getElementById("Name")
const Id=document.getElementById("ID Number");
const submit_button=document.getElementById("submit_btn");
const display=document.getElementById("Text");
const first_name=document.getElementById("Name");
const middle_initial=document.getElementById("MiddleName");
const last_name=document.getElementById("LastName");
const live_display=document.getElementById("debugger");
const EventTool= await Utility.getData(url,display);

//class initialization
const locate = new Locator(school_latitude,school_longitude,minimum_distance_in_meters,display);
const student=new FormData();



    
//Arrays or lists




//Commands

console.log(EventTool)
console.log(Utility.flagEvent())
locate.test_compatibility();
//Utility.greet(display);

if (EventTool.eventName=="")
  {
    display.textContent="no event today"
  }
else{display.textContent=`the event for today is ${EventTool.eventName}`}

Utility.CheckIncognito();

submit_button.onclick=()=>
    {
      const program=document.querySelector(`input[name="program"]:checked`);
      const year_level=document.querySelector(`input[name="level"]:checked`)
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
        } 
        locate.submit(user_name,Id);
        console.log(`${student.first_name}:${student.middle_initial}:${student.last_name}`);
        console.log(student.date)
        display.textContent="Processing..."
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
    })
    .catch(err => {
      console.error("Submission failed", err);
      display.textContent=`Submission Failed Check Your Internet Connection`;
    });
  }

    




