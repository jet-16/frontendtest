import { ChangeEvent, useState, Fragment } from 'react'
import './App.css'
import ActivityProgress from './components/ActivityProgress'
import YourSchedule from './components/YourSchedule'
import { sleepSchedules } from './components/YourSchedule'
import { Modal, Button, Toast } from 'react-bootstrap';

//SVG
import doubledot from './assets/Group 9975.svg'
import home from './assets/Home.svg'
import activity from './assets/Activity.svg'
import camera from './assets/Camera.svg'
import profile from './assets/Profile.svg'
import arrowleft from './assets/Arrow - Left 3.svg'
import arrowright from './assets/Arrow - Right 2.svg'
import bed2 from './assets/Icon-Bed2.svg'
import time from './assets/Icon-Time.svg'
import vibrate from './assets/Icon-Vibrate.svg'

function App() {
  const [show, setShow] = useState(false)
  const [showBed, setShowBed] = useState(false)
  const [showDuration, setShowDuration] = useState(false)
  const [showError, setError] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleCloseBed = () => setShowBed(false)
  const handleShowBed = () => setShowBed(true)
  const handleCloseDuration = () => setShowDuration(false)
  const handleShowDuration = () => setShowDuration(true)
  const handleError = () => setError(!showError)

  const [getItem, setItem] = useState(0)
  const [getTime, setTime] = useState("23:59")
  const [getHours, setHours] = useState("0")
  const [getMinutes, setMinutes] = useState("0")
  const [getBedAlert, setBedAlert] = useState(true)
  const [getWakeAlert, setWakeAlert] = useState(true)
  const [state, setState] = useState(true)
  
  const today = new Date()
  const month = today.getMonth()
  const year = today.getFullYear()

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    // Number(date.toTimeString().slice(0,2)) < Number(getTime.slice(0,2)) ? setStateAdd(true) : setStateAdd(false)
  };

  const handleChangeHours = (e: ChangeEvent<HTMLInputElement>) => {
    setHours(e.target.value);
  };

  const handleChangeMinutes = (e: ChangeEvent<HTMLInputElement>) => {
    setMinutes(e.target.value);
  };

  const handleChangeBedAlert = (e: ChangeEvent<HTMLInputElement>) => {
    setBedAlert(e.target.checked);
  };

  const handleChangeWakeAlert = (e: ChangeEvent<HTMLInputElement>) => {
    setWakeAlert(e.target.checked);
  };

  const timeStamp = (num: string) => {
      let[hour, minutes] = num.split(":");
      let hours: number = +hour
      const ampm = hours >= 12 ? ' PM' : ' AM'
      hours = hours % 12
      hours = hours ? hours : 12
      const time = hours.toString().padStart(2,'0') + ":" + minutes + ampm
      return time
  }

  const handleSelectItem = (item: number) => {
      setItem(item)
      const selectedDate = year+"-"+(month+1).toString().padStart(2,'0')+"-"+item.toString().padStart(2,'0')
      const found = sleepSchedules.some(i => i.date === selectedDate)
      const selected = new Date(selectedDate)


      if (found) {
        setState(true)
      } else if (selected.getDate() < today.getDate()) {
        setState(true)
      } else {
        setState(false)
      }

      return found
  }

  const addTimeToDate = (date: string, minutes: string, hours: string) => {
        const d = new Date(date)
        d.setTime(d.getTime() + (Number(minutes) * 60_000) + (Number(hours) * 3_600_000))
        return d;
  }


  const handleAddSchedule = () => {
      const date = (
                      year + "-" + 
                      (month+1).toString().padStart(2,'0') + "-" + 
                      getItem.toString().padStart(2,'0')).toString() + " " + 
                      getTime + ":00"
      const bedtimeString = (date + " " + getTime + ":00").toString()

      const calculateWakeTime = addTimeToDate(bedtimeString,getMinutes, getHours)
      const resultWakeTime = calculateWakeTime.getFullYear() + "-" + 
                            (calculateWakeTime.getMonth()+1).toString().padStart(2,'0') + "-" +
                            calculateWakeTime.getDate().toString().padStart(2,'0') + " " +
                            calculateWakeTime.toTimeString().slice(0,8)
      
      let validate1 = false
      let validate2 = false

      const selected = new Date(date)

      Number(getMinutes) > 59 ? validate1 = false : validate1 = true;
      selected.getDate() === today.getDate() && selected.getTime() < today.getTime() ? validate2 = false : validate2 = true

      if (validate1 && validate2) {
          const data = {
            date: date,
            date_bedtime: bedtimeString,
            alert_on_bedtime: getBedAlert,
            date_wake: resultWakeTime,
            alert_on_wake: getWakeAlert
          }

        sleepSchedules.push(data)
        setTime("12:00")
        setHours("0")
        setMinutes("0")
        setBedAlert(true)
        setWakeAlert(true)
        handleClose()
      } else { 
        handleError()
      }
      
  }

  return (
    <>
      <Toast show={showError} onClose={handleError} autohide={true}>
        <Toast.Body>
            Invalid Input
        </Toast.Body>
      </Toast>
      <div className="title">
        <div className="title-home">
          <h1 >Sleep Schedule</h1>
          <div className="more-option">
            <img src={doubledot} alt="" />
          </div>
        </div>
          
      </div>

      <ActivityProgress/>
      <YourSchedule month={month} year={year} onSelectItem={handleSelectItem}/>

      <Modal 
        show={show} 
        fullscreen={true} 
        onHide={handleClose}>
          <Modal.Header>
              <div className="title" style={{width: "100%"}}>
                <div>
                  <div className="more-option">
                    <img src={arrowleft} alt="" onClick={handleClose}/>
                  </div>
                  <h1 >Add Schedule</h1>
                  <div className="more-option">
                    <img src={doubledot} alt="" />
                  </div>
                </div>
              </div>
          </Modal.Header>
              
          <Modal.Body>
              <div className="input" onClick={handleShowBed}>
                  <div className="input-left">
                    <img src={bed2} alt="" />
                    <p className="left-text">Bedtime</p>
                  </div>
                  <div className="input-right">
                    <p className="right-text">{timeStamp(getTime)}</p>
                    <img src={arrowright} alt="" />
                  </div>
                 
              </div>
              <div className="input" onClick={handleShowDuration}>
                  <div className="input-left">
                    <img src={time} alt="" />
                    <p className="left-text">Hourse of sleep</p>
                  </div>
                  <div className="input-right">
                    <p className="right-text">{getHours}hours {getMinutes}mintutes</p>
                    <img src={arrowright} alt="" />
                  </div>
              </div>
              <div className="input">
                  <div className="input-left">
                    <img src={vibrate} alt="" />
                    <p className="left-text">Notify me on bedtime</p>
                  </div>
                  <div className="form-check form-switch">
                      <input 
                          className="form-check-input" 
                          type="checkbox" 
                          defaultChecked={true}
                          onChange={handleChangeBedAlert}>
                      </input>
                  </div>
              </div>
              <div className="input">
                  <div className="input-left">
                    <img src={vibrate} alt="" />
                    <p className="left-text">Wake me up {"("}Alarm{")"} </p>
                  </div>
                  <div className="form-check form-switch">
                      <input 
                          className="form-check-input" 
                          type="checkbox" 
                          defaultChecked={true}
                          onChange={handleChangeWakeAlert}>
                      </input>
                  </div>
              </div>

          </Modal.Body>

          <Modal.Footer>
              <Button onClick={handleAddSchedule}>
                  Add
              </Button>
          </Modal.Footer>
      </Modal> 

      <Modal 
        show={showBed} 
        onHide={handleCloseBed}
        centered>
        <Modal.Body>
          <input type="time" onChange={handleChangeTime} value={getTime}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseBed} className="close-btn">
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal 
        show={showDuration} 
        onHide={handleCloseDuration}
        centered>
        <Modal.Body className="duration-modal">
          <div className="input-group mb-3">
            <input type="number" onChange={handleChangeHours} className="form-control" min="0" placeholder="Hour" aria-label="Hour"/>
            <span className="input-group-text">:</span>
            <input type="number" onChange={handleChangeMinutes} className="form-control" min="1" max="59" placeholder="Minutes" aria-label="Minutes"/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseDuration} className="close-btn">
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <footer className="footer fixed-bottom">
        <div className="container">
          <img src={home} alt="" />
          <img src={activity} alt="" />
          <button type="button" className="btn" onClick={handleShow} disabled={state}>+</button>
          <img src={camera} alt="" />
          <img src={profile} alt="" />
        </div>
      </footer>
    </>
  )
  
}

export default App
