import React from 'react'

export default function OtherSide(props) {

    const getMonthName=(monthNumber)=> {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        // Using the browser's default locale.
        return date.toLocaleString([], { month: 'long' });
      }
    const ChangeDateTime=(s)=>{
        var t = new Date(s);
        var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2) +" "+ t.getDate()+" " +getMonthName(t.getMonth())+" "+t.getFullYear();
        return formatted
    }
    return (
        <div>
            <div className="d-flex justify-content-between">
                <p className="small mb-1">{props.message.sender}</p>
                <p className="small mb-1 text-muted">{ChangeDateTime(props.message.id)}</p>
            </div>
            <div className="d-flex flex-row justify-content-start">

                <div>
                    <p
                        className="small p-2 ms-3 mb-3 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}>
                        {props.message.message}
                    </p>
                </div>
            </div>
        </div>
    )
}
