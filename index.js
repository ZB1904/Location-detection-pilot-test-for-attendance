//class imports
import { Locator } from "./Locate.js";
import { Format_time } from "./Time_format.js";
import { Navigate } from "./Navigator.js";
import { Utility } from "./Utility.js";
import { Sender } from "./Sender.js";



//Variables
const school_latitude=18.252096;
const school_longitude=122.001236;
const minimum_distance_in_meters=100;



const user_name=document.getElementById("Name")
const Id=document.getElementById("ID Number");
const submit_button=document.getElementById("submit_btn");
const display=document.getElementById("Text");
const first_name=document.getElementById("Name");
const middle_initial=document.getElementById("MiddleName");
const last_name=document.getElementById("LastName");
const live_display=document.getElementById("debugger");
const program=document.getElementById("")
const year_level=document.getElementById("");

//class initialization
const locate = new Locator(school_latitude,school_longitude,minimum_distance_in_meters,display);
const date = new Format_time();
const utility = new Utility();
const student=new FormData();
const url = '"https://script.google.com/macros/s/AKfycbzjkycZ6Eq7E7l6sunol9CshTKjGvUf7fiw0CABIE3MbtItyO92NfWbcYEV12rr_NGq/exec"';


    
//Arrays or lists





//Commands

date.Meridiem()

console.log(date.time());
console.log(date.date());
locate.test_compatibility();
Utility.greet(display);

submit_button.onclick=()=>
    {
        const student =
        {
            first_name:first_name.value,
            middle_initial:middle_initial.value,
            last_name:last_name.valu
        } 
         //locate.submit(user_name,Id);
        console.log(`${student.first_name}:${student.middle_initial}:${student.last_name}`);
        console.log(student)
        send(student);
    }

    function send(student)
    {
        fetch(url, 
            {
                method: 'POST',
                mode: 'no-cors', // suppresses CORS errors
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(student)
            })
            .then(() => {
                        console.log("Submitted successfully");
                        })
            .catch(err => {
                            console.error("Submission failed", err);
                        });
            
    }
    




