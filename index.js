//Variables

/*
latitudes and longitudes are in degrees they need to be converted 
to radiants then use the haversine formula to the convert them to meters 
if i spelled that correctly
*/
const school_latitude=18.25190002571949;
const school_longitude=122.0009536455097;
const minimum_distance_in_meters=100;


const user_name=document.getElementById("Name");
const Id=document.getElementById("ID Number");
const submit_button=document.getElementById("submit_btn");
const display=document.getElementById("Text");






//Arrays or lists





//Commands
test_compatibility();
navigator.geolocation.getCurrentPosition(Get_coordinates,Get_Unsuccesful)
display.textContent=`Welcome!\nPlease Enter Your Name and ID`;
display.style.whiteSpace = 'pre-line';









//Functions

function test_compatibility()
{
    if(!navigator.geolocation)
        {
            display.textContent="Your browser does not support Geolocation.\nUse a different browser: Crome is recommended";
            
        }
    return;
}
function Get_coordinates(position)
{
    const student_latitude=position.coords.latitude;
    const student_longitude=position.coords.longitude;
    const distance = Get_distance(student_latitude,student_longitude,school_latitude,school_longitude);
    submit(distance)
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
    const meters = 2 * Math.atan2(Math.sqrt(formulate), Math.sqrt(1-formulate));

    return Earth_radius * meters;
}

function submit(z)
{
    submit_button.onclick=function()
    {
        if(z <= minimum_distance_in_meters)
            {
                display.textContent=`welcome back ${user_name.value} you are within ${z.toFixed(2)} meters of the school, have a pleasant day `
            }
        else
        {
            display.textContent=`sorry but you are ${z-minimum_distance_in_meters} meters outside of the school grounds try again when you arrive`
        }
        //!user_name.value || !Id.value ? display.textContent="please enter a name and Id" : display.textContent=`Hello! ${user_name.value}\nYour Id is: ${Id.value}\nyour longitude is: ${student_longitude}\n and your latitude is: ${student_latitude}\nyou are: ${'n'}`;
    };
    
}