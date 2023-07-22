import React from 'react'

export default function OurSide(props) {
    const getMonthName=(monthNumber)=> {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        // Using the browser's default locale.
        return date.toLocaleString([], { month: 'long' });
      }
    const ChangeDateTime=(s)=>{
        var t = new Date(s * 1000);
        var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2) +" "+ t.getDate()+" " +getMonthName(t.getMonth())+" "+t.getFullYear();
        return formatted
    }
    return (
        <div>
            <div className="d-flex justify-content-between">
                <p className="small mb-1 text-muted">{ChangeDateTime(props.message.id)}</p>
                <p className="small mb-1">{props.message.sender}</p>
            </div>
            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                <div>
                    <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                        {props.message.message}
                    </p>
                </div>

            </div>
        </div>
    )
}
