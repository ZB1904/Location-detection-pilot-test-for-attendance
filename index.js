//Variables

/*
latitudes and longitudes are in degrees they need to be converted 
to radiants then use the haversine formula to the convert them to meters 
if i spelled that correctly
*/
const school_latitude=18.252096;
const school_longitude=122.001236;
const minimum_distance_in_meters=100;

const user_name=document.getElementById("Name");
const Id=document.getElementById("ID Number");
const submit_button=document.getElementById("submit_btn");
const display=document.getElementById("Text");

const first_name=document.getElementById("");
const middle_initial=document.getElementById("");
const last_name=document.getElementById("");

const live_display=document.getElementById("debugger");
const date = new Date();


let Current_date = date.getDate()
let day = date.getDay()
let year = date.getFullYear()
let month = date.getMonth()
let hour = date.getHours()
let minutes= date.getMinutes()
const meridiem = hour >= 12 ? "PM":"AM";
let toggle_d = false;

//Arrays or lists





//Commands

               


test_compatibility();
display.textContent=`Welcome!\nPlease Enter Your Name and ID`;
display.style.whiteSpace = 'pre-line';
submit();


//debug codes
/*
navigator.geolocation.watchPosition(updateDistanceLive, Get_Unsuccesful,  {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 10000
})*/

//tests
//console.log(`${month}:${day}:${Current_date}:${year}::${hour}::${minutes} ${meridiem}`);





//Functions

function test_compatibility()
{
    if(!navigator.geolocation)
        {
            display.textContent="Your browser does not support Geolocation.\nUse a different browser: Crome is recommended"; 
        }
    return;
}

function Get_Unsuccesful()
{
    display.textContent="unable to get your location,\nplease enable the location permission and check your internet connection.";
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

function submit()
{
    

    submit_button.onclick=function()
    {
        navigator.geolocation.getCurrentPosition(position => 
        {
          
            const student_latitude=position.coords.latitude;
            const student_longitude=position.coords.longitude;
            const distance = Get_distance(student_latitude,student_longitude,school_latitude,school_longitude);
        
        if (!user_name.value || !Id.value) 
            {
                display.textContent = "Please enter a name and ID.";
                return;
            }
        if(distance <= minimum_distance_in_meters)
            {
                display.textContent=`welcome back ${user_name.value} you are within ${distance.toFixed(2)} meters of the school, have a pleasant day `
            }
        else
        {
            display.textContent=`sorry but you are ${Number(distance-minimum_distance_in_meters).toFixed(2)} meters outside of the school grounds try again when you arrive`
        }
        },Get_Unsuccesful,{
          enableHighAccuracy:true, timeout: 10000, maximumAge:0
        });
    };
    
}

//debugging

/*
function updateDistanceLive(position) {
    const student_latitude = position.coords.latitude;
    const student_longitude = position.coords.longitude;

    const distance = Get_distance(
        student_latitude,
        student_longitude,
        school_latitude,
        school_longitude
    );

    console.log( 
        `Live Location Debug Mode:\n` +
        `Latitude: ${student_latitude}\n` +
        `Longitude: ${student_longitude}\n` +
        `Distance to school: ${distance.toFixed(2)} meters\n` +
        `Accuracy: ±${position.coords.accuracy.toFixed(2)} meters\n` +
        `Time: ${new Date(position.timestamp).toLocaleTimeString()}`)
}*/
