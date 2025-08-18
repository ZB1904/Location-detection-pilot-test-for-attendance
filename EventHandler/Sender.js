export class Sender
{
    constructor()
    {
        
    }
    static send(location)
    {
        const formData =new FormData();
        formData.append()
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






}