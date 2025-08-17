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

Meridiem() {
    let meridiem;

    if (hour >= 12) {
        meridiem = "PM";
    } else {
        meridiem = "AM";
    }

    let formattedHour = hour % 12 || 12;

    return { hour: formattedHour, meridiem };
}
time()
{
    
    return `${this.Meridiem().hour.toString().padStart(2 ,"0")}:${minutes.toString().padStart(2 ,"0")}:${this.Meridiem().meridiem}`;
}
date()
{
    const namedMonth=this.date_names()
    return`${namedMonth}:${day.toString().padStart(2 ,"0")}:${year}`;
}
async Format(data)
{
    
    let dataO= await String(data).padStart(4,0);
    let data_h=await dataO.slice(0,1)
    if(data_h<=12){return data_h-12+"PM"}
    else if(data_h==24){return data_h+"AM"}
    else{return data_h+"AM"}
}

raw()
{
    return String(date.getHours())+date.getMinutes();
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