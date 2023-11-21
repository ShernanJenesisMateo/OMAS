//MODAAAALLLLLLLLL NG APPINTMNET

import React, { useEffect, useState } from "react";
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

function AddEvent(props) {
    // props variable htmlFor modal show
    const { isOpenAdd, selectStart, selectEnd } = props;

    // Event data variables
    const [title, setTitle] = useState('');
    const [selectedColor, setSelectedColor] = useState('#5f9e55');
    const [description, setDescription] = useState('');
    const [links, setOnDetails] = useState('');
    const [start, setStart] = useState('');
    const fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
    const [end, setEnd] = useState('');
    const fEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');

    // Set start and end datetime data when using drag
    useEffect(() => {
      if (selectStart != null && selectEnd != null) {
        setStart(selectStart);
        setEnd(selectEnd);
      }
    }, [selectStart, selectEnd]);

    // Event Data handler
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
    const handleHeaderColor = (event) => {
      setSelectedColor(event.target.value);
    };
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
    const handleOnDetailsChange = (event) => {
      const value = event.target.value;
      const updatedValue = value === "" ? "-not available-" : value;
      setOnDetails(updatedValue);
    };
    const handleStartChange = (event) => {
      setStart(event.target.value);
    };
    const handleEndChange = (event) => {
      setEnd(event.target.value);
    };

    // Participant selector variables
    const [options, setOptions] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [locOptions, setLocOptions] = useState([]);
    const [selectedLoc, setSelectedLocation] = useState('');
    const [selectedLocVal, setSelectedLocationValue] = useState('');

    // Populate participant selector
    useEffect(() => {
      axios.get('/users')
        .then(response => {
          const users = response.data.data.map(user => ({
            value: user.emp_id,
            label: user.fname +" "+ user.lname,
          }));
          setOptions(users);
          const preselectedUser = [users.find(user => user.value === response.data.data[0].emp_id)];
          setSelectedPeople([preselectedUser]);
        })
        .catch(error => console.error(error));
        axios.get('/main/locations')
        .then(response => {
          const locations = response.data.locations.map(locations => ({
            value: locations.name,
            label: locations.name,
          }));
          setLocOptions(locations);
        })
        .catch(error => console.error(error));
    }, []);


    const handleSelectLocChange = (selectedOption) => {
      setSelectedLocation(selectedOption);
      setSelectedLocationValue(selectedOption.value);
    };

    // Preselect event creator name
    const handleSelectChange = (selected) => {
      if (!selected.some(option => option.value === selectedPeople[0].value)) {
        setSelectedPeople(selectedPeople);
      } else {
        setSelectedPeople(selected);
      }
    };

    // Time format variables
    const sTime = moment(start).format('HH');
    const eTime = moment(end).format('HH');
    const sTimeStamp = Date.parse(start);
    const eTimeStamp = Date.parse(end);
    const currentDatetime = moment().format('YYYY-MM-DDTHH:mm');

    // Time diference variables
    const diffMs = Math.abs(sTimeStamp - eTimeStamp);
    const diffMins = Math.floor(diffMs / 1000 / 60);

    // Handle submission of events
    const handleSubmit = (event) => {
      event.preventDefault();
      // Event data validations
      if(sTime > 19 || sTime < 6 || eTime > 19 || eTime < 6){
        setTimeError('6am to 7pm only');
        setTimeout(() => {
          setTimeError(null);
        }, 3000);
      }else if(moment(end).isBefore(start)){
        setTimeError('Appointment start should be later than end');
        setTimeout(() => {
          setTimeError(null);
        }, 3000);
      }else if(diffMins < 30){
        setTimeError('Appointment should be atleast 30 mins');
        setTimeout(() => {
          setTimeError(null);
        }, 3000);
      }else if(moment(start).isBefore(currentDatetime)){
        setTimeError('Time has already passed');
        setTimeout(() => {
          setTimeError(null);
        }, 3000);
      }
      else{

        // Ajax request to call springboot controller that save events
        axios.defaults.withCredentials = true;
        axios.post('/main/saveEvent',
        {title: title, color: selectedColor, description: description, links: links, location: selectedLocVal, start: fStart, end: fEnd},
        {withCredentials: true},
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          const selectedPeopleIds = selectedPeople.map(p => p.value);
          const payload = {eventId: response.data, participantIds: selectedPeopleIds};

          // Ajax request to call springboot controller that save participants
          axios.defaults.withCredentials = true;
          axios.post('/main/saveEventParticipants', payload, {withCredentials: true},
          { headers: { 'Content-Type': 'application/json' } })
          .then(response => {

            // SweetAlert Success
            Swal.fire({
                title: 'Event Added',
                text: " ",
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                confirmButtonColor: '#537557',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            })
          })
          .catch(error => {
            console.log(error);
          });
        })
        .catch(error => {
          console.log(error);
        });
      }
    };

    // Clear button function
    const handleClear = () => {
      setTitle('');
      setSelectedColor('#5f9e55');
      setDescription('');
      setSelectedLocation('');
      setStart('');
      setEnd('');
      // Clear Preselected User except the creator
      const preselectedUser = options.find(user => user.value === selectedPeople[0].value);
      const updatedSelectedPeople = preselectedUser ? [preselectedUser] : [];
      setSelectedPeople(updatedSelectedPeople);
    };

    // Close and hide modal function
    const handleModalClose = () => {
      props.toggleModal();
      handleClear();
    }

    // Error variables
    const [timeerr, setTimeError] = useState(null);

    return (
      <div className="modal" tabIndex="-1" style={{ display: isOpenAdd ? "block" : "none" }}>
        <form onSubmit={handleSubmit}>
        <div className="modal-dialog modal-dialog-centered modal-lg" style={{marginTop: '8%'}}>
          <div style= {{backgroundColor: 'white'}}className="modal-content">

            <div className="modal-header" style={{backgroundColor:selectedColor}}>
              <h5 className="modal-title"><i className="fa-regular fa-calendar-plus me-2"></i>New Appointment</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleModalClose} aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{fontWeight: 'bold',}}>

              <div className="mb-3 row">

                {/* Title Input */}
                <div className="col-md-9">
                  <label htmlFor="addTitle" className="form-label"><i className="fa-solid fa-handshake me-1"></i>Title</label>
                  <input type="text" className="form-control" id="addTitle" name="title" maxLength="100" value={title} onChange={handleTitleChange} required/>
                </div>

                {/* Color Input */}
                <div className="col-sm-3">
                  <label htmlFor="addColor" className="form-label"><i className="fa-solid fa-palette me-2"></i>Event Color</label>
                  <select className="form-select" id="addColor" name="color" onChange={handleHeaderColor} value={selectedColor} style={{ backgroundColor: selectedColor }}>
                    <option value="#5f9e55" style={{backgroundColor: '#5f9e55'}}></option>
                    <option value="#5287ba" style={{backgroundColor: '#5287ba'}}></option>
                    <option value="#8364a7" style={{backgroundColor: '#8364a7'}}></option>
                    <option value="#c97ab9" style={{backgroundColor: '#c97ab9'}}></option>
                    <option value="#dd766a" style={{backgroundColor: '#dd766a'}}></option>
                    <option value="#dd996a" style={{backgroundColor: '#dd996a'}}></option>
                    <option value="#eddf7d" style={{backgroundColor: '#eddf7d'}}></option>
                  </select>
                </div>
              </div>

              {/* Description Input */}
              <div className="mb-3">
                <label htmlFor="addDesc" className="form-label"><i className="fa-solid fa-circle-info me-2"></i>Description</label>
                <textarea type="textarea" className="form-control" id="addDesc" name="description" maxLength="100" rows="3" value={description} onChange={handleDescriptionChange} required></textarea>
              </div>

              {/* Location Input */}
              <div className="mb-3">
                <label htmlFor="addLoc" className="form-label"><i className="fa-solid fa-location-dot me-2"></i>Location</label>
                <Select
                  name="locations[]"
                  options={locOptions}
                  className="locations"
                  classNamePrefix="select"
                  onChange={handleSelectLocChange}
                  value={selectedLoc}
                  required
                />
              </div>

              {/* Participant Input */}
              <div className="mb-3">
                <label htmlFor="addPart" className="form-label"><i className="fa-solid fa-users me-2"></i>Participant/s:</label>
                <Select
                  isMulti
                  name="peoples[]"
                  options={options}
                  className="participant"
                  classNamePrefix="select"
                  value={selectedPeople}
                  onChange={handleSelectChange}
                />
              </div>

              {/* Online Details Input */}
              <div className="mb-3">
                <label htmlFor="addODetails" className="form-label"><i className="fa-solid fa-cloud me-1"></i> Online Details</label>
                <textarea type="textarea" className="form-control" id="addODetails" name="onlinedetails" rows="2" value={links} onChange={handleOnDetailsChange}></textarea>
              </div>

              <div className="row g-3">

                {/* Start Time Input */}
                <div className="col">
                  <label className="control-label col-sm-10" htmlFor="addStart"><i className="fa-solid fa-hourglass-start me-2"></i>Start Time</label>
                  <div className="col-sm-15">
                    <input className={`form-control ${timeerr ? 'is-invalid' : ''}`} type="datetime-local" id="addStart" name="start" placeholder="Start" value={start} onChange={handleStartChange} required/>
                    {timeerr && <div style={{height: '10px'}} className="invalid-feedback">{timeerr}</div>}
                  </div>
                </div>

                {/* Ent Time Input */}
                <div className="col">
                  <label className="control-label col-sm-10" htmlFor="addEnd"><i className="fa-solid fa-hourglass-start fa-rotate-180 me-2"></i>End Time</label>
                  <div className="col-sm-15">
                    <input className={`form-control ${timeerr ? 'is-invalid' : ''}`} type="datetime-local" id="addEnd" name="end" placeholder="End" value={end} onChange={handleEndChange} required/>
                    {timeerr && <div style={{height: '10px'}} className="invalid-feedback">{timeerr}</div>}
                  </div>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="modal-footer">
              <button type="reset" className="btn btn-outline-secondary" onClick={handleClear}><i className="fa-solid fa-eraser me-2"></i>Clear</button>
              <button type="submit" className="btn btn-success" id="addEventBtn"><i className="fa-solid fa-floppy-disk me-2"></i>Save Changes</button>
            </div>
          </div>
        </div>
        </form>
      </div>
    );
}

export default AddEvent;
