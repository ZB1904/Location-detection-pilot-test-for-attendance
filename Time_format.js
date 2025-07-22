const date = new Date();
let meridiem="?"
let hour=date.getHours();
let minutes=date.getMinutes();
let month=date.getMonth();
let day = date.getDate();
let year = date.getFullYear().toString();


export class Format_time
{
    constructor()
    {
       
    }

Meridiem()
{
    if (hour >= 12)
        {
            meridiem= "AM";
        }
    else{meridiem="PM";}
    
    hour = hour % 12||12;
}
time()
{
    this.Meridiem();
    return `${hour.toString().padStart(2 ,"0")}:${minutes.toString().padStart(2 ,"0")}:${meridiem}`;
}
date()
{
    const namedMonth=this.date_names()
    return`${namedMonth}:${day.toString().padStart(2 ,"0")}:${year}`;
}
date_names()
{
    switch(month)
    {
        case 0:
            return "JANUARY";
            break;
        case 1:
            return "FEBUARY";
            break;
        case 2:
            return "MARCH";
            break;
        case 3:
            return "APRIL";
            break;
        case 4:
            return "MAY";
            break;
        case 5:
            return "JUN";
            break;
        case 6:
            return "JULY";
            break;
        case 7:
            return "AUGUST";
            break;
        case 8:
            return "SEPTEMBER";
            break;
        case 9:
            return "OCTOBER";
            break;
        case 10:
            return "NOVEMBER";
            break;
        case 11:
            return "DECEMBER";
            break;
        default:
            return `Did you just break something?`;
            break;

    }
}

}