import { Component, Fragment, useState } from "react";
import "../css/YourSchedule.css"
import bedsvg from "../assets/Icon-Bed.svg"
import alarmsvg from "../assets/Icon-Alaarm.svg"
import more from "../assets/Icon-More.svg"

interface Props {
    month: number
    year: number
    onSelectItem: (item: number) => void
}

export const sleepSchedules = [
    {
        date: "2024-04-04",
        date_bedtime: "2024-04-04 21:00:00",
        alert_on_bedtime: true,
        date_wake: "2024-04-05 05:30:00",
        alert_on_wake: true,
    },
    {
        date: "2024-04-05",
        date_bedtime: "2024-04-05 21:00:00",
        alert_on_bedtime: true,
        date_wake: "2024-04-06 05:30:00",
        alert_on_wake: true,
    },
    {
        date: "2024-04-08",
        date_bedtime: "2024-04-08 22:00:00",
        alert_on_bedtime: true,
        date_wake: "2024-04-09 08:30:00",
        alert_on_wake: true,
    },
    {
        date: "2024-04-15",
        date_bedtime: "2024-04-16 22:00:00",
        alert_on_bedtime: true,
        date_wake: "2024-04-16 06:30:00",
        alert_on_wake: true,
    },
    {
        date: "2024-04-23",
        date_bedtime: "2024-04-23 23:00:00",
        alert_on_bedtime: true,
        date_wake: "2024-04-24 07:30:00",
        alert_on_wake: true,
    },
];

let checkSchedule = -1

function YourSchedule({ month, year, onSelectItem}: Props) {
        const date = new Date()
        const days = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()
        const [selectedIndex, setSelectedIndex] = useState(date.getDate())

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const getDayName = (n: number) => {
            const getdate = new Date(year+"-"+(month+1)+"-"+n) 
            const day = getdate.getDay()
            return dayNames[day]
        }

        const getDetails = (date: string) => {
            const padstartmonth = (month+1).toString().padStart(2,'0')
            const getdate = year+"-"+padstartmonth+"-"+date
            checkSchedule = sleepSchedules.map(e => e.date).indexOf(getdate);
        }
        
        const getTime = (text: string) => {
            const date = new Date(text)
            let hour = date.getHours()
            let minutes = date.getMinutes() 
            const ampm = hour >= 12 ? 'pm' : 'am'
            hour = hour % 12
            hour = hour ? hour : 12
            const time = hour.toString().padStart(2,'0')+":"+minutes.toString().padStart(2,'0')+ampm
            return time
        }

        const getTimeDiff = (text: string) => {
            const firstDate = new Date(text)
            const secondDate = new Date()
            let diff = (secondDate.getTime() - firstDate.getTime()) / 1000 / 60
            const hours = Math.abs(Math.trunc(diff/60))
            const minutes = Math.abs(Math.trunc(diff%60))

            return firstDate < secondDate ? "Schedule Ended" : (<>in <b>{hours}</b>hours <b>{minutes}</b>minutes</>)
        }

        const getId = (id: number) => {
            const slides = document.getElementsByClassName('select-date-container');
        
            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i] as HTMLElement;
                slide.classList.remove('select-date-container')
            }

            document.getElementById(id.toString())?.classList.add('select-date-container')
        };

        return (
            <div className="your-schedule-div">
                <h2 style={{marginTop: "20px", width: "100%", paddingLeft: "40px"}}>Your Schedule</h2>
                <div className="show-days">
                    {[...Array(days)].map((e, i) => (
                        <div 
                            id={(i+1).toString()}
                            className={(date.getDate() == i+1) ? "select-date-container date-container" : "date-container"}
                            key={i+1}
                            onClick={() => {
                                setSelectedIndex(i)
                                onSelectItem(i+1)
                                getDetails((i+1).toString().padStart(2,'0'))
                                getId(i+1)
                                
                            }}
                        >
                            <p>{getDayName(i+1)}</p>
                            <h3>{i+1}</h3>
                        </div>
                    ))}
                </div>
                
                {checkSchedule === -1 
                    ? <p>No Schedules</p> 
                    : sleepSchedules.map((item) => (
                        item.date === sleepSchedules[checkSchedule].date ? (
                            <div className="schedule-div" key={item.date}>
                                <div className="bedtime-div d-flex flex-row">
                                    <img src={bedsvg} alt="" />
                                    <div className="info-div">
                                        <p><b style={{color: "black"}}>Bedtime,</b> {getTime(item.date_bedtime)}</p>
                                        <p>{getTimeDiff(item.date_bedtime)}</p>
                                    </div>
                                    <div className="button-div">
                                        <img src={more} alt="" />
                                        <div className="form-check form-switch">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                defaultChecked={item.alert_on_bedtime}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="bedtime-div d-flex flex-row">
                                    <img src={alarmsvg} alt="" />
                                    <div className="info-div">
                                        <p><b style={{color: "black"}}>Alarm,</b> {getTime(item.date_wake)}</p>
                                        <p>{getTimeDiff(item.date_wake)}</p>
                                    </div>
                                    <div className="button-div">
                                        <img src={more} alt="" />
                                        <div className="form-check form-switch">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                defaultChecked={item.alert_on_wake}>
                                            </input>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        ) : (
                            ""
                        )
                    ))}               
            </div>
        )
}

export default YourSchedule;