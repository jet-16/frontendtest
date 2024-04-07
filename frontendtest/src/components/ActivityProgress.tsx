import { Component, Fragment } from "react";
import "../css/ActivityProgress.css";
import arrowdown from '../assets/Arrow - Down 2.svg'

export const hoursSlept = {
    sunday: 720,
    monday: 510,
    tuesday: 420,
    wednesday: 480,
    thursday: 540,
    friday: 600,
    saturday: 660
};

let data = Object.values(hoursSlept)
let max = Math.max(...data)

function ActivityProgress() {
    const getValue = (row: any) => {
        const height = (data[row]/max)*100
        return height+"%"
    }
    
        return (
                <div className="activity-progress-div">
                    <div className="activity-progress-head">
                        <h2>Activity Progress</h2>
                        <div className="dropdown">
                            <button className="btn btn-secondary" type="button" >
                                Weekly
                                <img src={arrowdown} alt="" />
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            </div>
                        </div>
                    </div>
                    
                    <div className="graph">
                    {
                        Object.keys(hoursSlept).map((e,i) => (
                            <div 
                                className="bar-group" 
                                key={i}>
                                <div className="bar-back">
                                    <div 
                                        className={(i+1)%2 === 0 ? "bar pink" : "bar blue"}
                                        style={{height: getValue(i)}}

                                    >
                                    </div>
                                </div>
                                <p style={{textTransform: "capitalize"}}>{e.slice(0,3)}</p>
                            </div>
                        ))
                    }
                    </div>

                </div>
                
        );
    }

export default ActivityProgress;

