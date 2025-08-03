export class Utility
{
    constructor()
    {
        
    }

    static greet =(display)=>{display.textContent=`Welcome!\nPlease Enter Your Name and ID`;
                display.style.whiteSpace = 'pre-line';}
    
    static checkYear=(object)=>
        {
            if (!object)
                {
                    alert("please check your year level")
                }
            let value;
             const actions =
            {
                "1": () => value ="1",
                "2": () => value="2",
                "3": () => value="3",
                "4": () => value="4",
            }
            const assign =actions[object.value];

            if (assign) 
                {
                    assign();
                }
            else{alert("you broke something didn't you?");}
            
            return value;
        }
    static checkProgram=(object)=>
        {
          
            if (!object)
                {
                    alert("please check your program")
                }
            let value;

            const actions =
            {
                "1": () => value ="BEED",
                "2": () => value="BSE-ENG",
                "3": () => value="BSE-FIL"
            }
            const assign =actions[object.value];

            if (assign) 
                {
                    assign();
                }
            else{alert("you broke something didn't you?");}
            
            return value;
        }
        static flagEvent()
        {
            const date = new Date;
            const hour=date.getHours();
            const minute=date.getMinutes();
            const currentTime = hour*60+minute;
            const start = 6*60;
            const end = 7*60+30;
            const isMonday = date.getDay()===1;

            const isOnTime=currentTime >=start&&currentTime<=end;

            
            if (isMonday && isOnTime)
                {
                    return "yes";
                }
            else {return "no";}
        }

        static async getData(url,display)
        {
            try
            {
                const formData = new FormData();
                formData.append("first_name", "RETURN");
                
                const data=
                await fetch(url,
                        {
                    method: 'POST',
                    body:formData,
                    })
                const respo = await data.json();
                return respo;
            }
            catch(err)
            {
                display.textContent="Fetch failed:", err;
                return null;
            }
        }
        static CheckStatus()
        {
            return new Promise(function(resolve)
            {
                const request = window.RequestFileSystem || window.webkitRequstFileSystem;
                if (!request)
                    {
                        resolve({isPrivate:false});
                    }
                else{request(window.TEMPORARY,100,()=>resolve({isPrivate:false},()=>resolve({isPrivate:true})));}
            })
        }

        static CheckIncognito()
        {
            this.CheckStatus().then((result)=>
                {
                    if (result.isPrivate){window.prompt("fucker u just used incognito, u watching porn?")}
                    else{window.prompt("all correct")}
                })
                   
        }
    
}