export class Locator
{
    constructor(school_latitude,school_longitude,minimum_distance_in_meters,display)
    {
        this.school_latitude =school_latitude;
        this.school_longitude =school_longitude;
        this.minimum_distance_in_meters = minimum_distance_in_meters;
        this.display=display;
    }

test_compatibility()
{
    if(!navigator.geolocation)
        {
            this.display.textContent="Your browser does not support Geolocation.\nUse a different browser: Crome is recommended"; 
        }
    return;
}

Get_Unsuccessful()
{
    this.display.textContent="unable to get your location,\nplease enable the location permission and check your internet connection.";
    return;
}


convert_degrees_to_radians(degrees)
{
    return degrees*(Math.PI /180);
}


Get_distance(student_latitude,student_longitude,school_latitude,school_longitude)
{
    const Earth_radius = 6371000;

    const compare_latitude_distance=this.convert_degrees_to_radians(school_latitude-student_latitude);
    const compare_longitude_distance=this.convert_degrees_to_radians(school_longitude-student_longitude);

    const formulate = Math.sin(compare_latitude_distance/2) ** 2 + Math.cos(this.convert_degrees_to_radians(student_latitude))* Math.cos(this.convert_degrees_to_radians(school_latitude)) * Math.sin(compare_longitude_distance/2) ** 2;
    const meters = 2 * Math.asin(Math.sqrt(formulate));
    return Earth_radius * meters;
}

submit(user_name,Id)
{
    navigator.geolocation.getCurrentPosition(position => 
        { 
            const student_latitude=position.coords.latitude;
            const student_longitude=position.coords.longitude;
            const distance = this.Get_distance(student_latitude,student_longitude,this.school_latitude,this.school_longitude);
        if (!user_name.value || !Id.value) 
            {
                display.textContent = "Please enter a name and ID.";
                return;
            }
        if(distance <= this.minimum_distance_in_meters)
            {
                this.display.textContent=`welcome back ${this.user_name.value} you are within ${this.distance.toFixed(2)} meters of the school, have a pleasant day `
            }
        else
        {
            this.display.textContent=`sorry but you are ${Number(distance-this.minimum_distance_in_meters).toFixed(2)} meters outside of the school grounds try again when you arrive`
        }
        },this.Get_Unsuccessful.bind(this),{
          enableHighAccuracy:true, timeout: 10000, maximumAge:0
        });
}
}