//Variables

/*
latitudes and longitudes are in degrees they need to be converted 
to radiants then use the haversine formula to the convert them to meters 
if i spelled that correctly
*/
const school_latitude=122.011648;
const school_longitude=18.3042048;
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
function submit(x,y)
{
    submit_button.onclick=function()
    {
        !user_name.value || !Id.value ? display.textContent="please enter a name and Id" : display.textContent=`Hello! ${user_name.value}\nYour Id is:${Id.value}\nyour longitude is:${x}\n and your latitude is:${y}\nyou are:${'n'}`;
    };
    
}
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
    const y=position.coords.latitude;
    const x=position.coords.longitude;
    submit(x,y)


    return;
}
function Get_Unsuccesful()
{
    display.textContent="unable to get your location,\nplease enable the location permission and check your internet connection.";
    return;
}

// Lo = longitude La = latitude
function convert_degrees_to_radians(School_lo,Schoo_la,user_lo,user_la)
{

}
