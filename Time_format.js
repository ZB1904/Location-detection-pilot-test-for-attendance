const date = new Date();
let meridiem="?"
let hour=date.getHours().toString().padStart(2);
let minutes=date.getMinutes().toString().padStart(2);


export class Format_time
{
    constructor()
    {
       
    }

Meridiem()
{
    if (hour >= 12)
        {
            meridiem= "PM";
        }
    else{meridiem="AM";}
    
    hour = hour % 12||12;
}
time()
{
    return `${hour}:${minutes}:${meridiem}`;
}
date()
{
    return`${date.getDate()}:${date.getMonth()+1}:${date.getFullYear()}`;
}
date_names()
{

}

}