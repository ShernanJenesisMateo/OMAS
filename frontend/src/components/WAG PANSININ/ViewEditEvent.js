import React,{useEffect,useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import Select from 'react-select';

const ViewEditEvent = (props) => {
    // props variable htmlFor modal show
    const { isOpenView, eventData } = props;

    // Participants variable
    const [participants, setParticipants] = useState([])

    // get event data clicked
    const [eventId, setEventId] = useState('');

    // List all participants on a event
    useEffect(() => {
      if (eventData && eventData.id) {
        setEventId(eventData.id);

        axios.get('/events/' + eventData.id + '/users')
          .then(response => {
            const people = response.data;
            const participantList = people.slice(1).map((person) => (
              <li key={person.id} style={{ listStyleType: 'none', marginBottom: '10px' }}>
                • {person.fname} {person.lname}
              </li>
            ));
            setParticipants(participantList);
            setAppointmentCreator(people[0]?.fname + ' ' + people[0]?.lname);
          })
          .catch(error => {
            console.log(error);
          });

        axios.get('/events/' + eventData.id + '/users')
          .then(response => {
            const users = response.data.map(user => ({
              value: user.id,
              label: user.fname + ' ' + user.lname
            }));
            setSelectedPeople(users);
          })
          .catch(error => console.error(error));
      }
    }, [eventData]);

    // Creator id variable
    const [appointmentCreator, setAppointmentCreator] = useState('');

    // Delete event function
    const handleDeleteEvent = () => {
      Swal.fire({
          title: 'Delete Event?',
          text: " ",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#537557',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
      }).then((result) => {
          if (result.isConfirmed) {
            axios.delete('/delete/'+eventId)
            .then(response => {
              window.location.reload();
            })
          }
      })
    };

    // Show edit event modal and populate its input
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const handleEditShow = () => {
      setIsOpenEdit(!isOpenEdit);
      setSelectedColor(eventData.color);
      setTitle(eventData.title);
      setDescription(eventData.description);
      const initialValue = eventData.location
      const initialOption = locOptions.find(option => option.label === initialValue);
      setSelectedLocation(initialOption);
      setOnDetails(eventData.links)
      setStart(eventData.start);
      setEnd(eventData.end)
      axios.get('/events/' + eventId + '/users')
      .then(response => {
        const users = response.data.map(user => ({
          value: user.id,
          label: user.fname + ' ' + user.lname
        }));
        setSelectedPeople(users); // Update selectedPeople state with users data
      })
      .catch(error => console.error(error));
    };

    // Populate participant selector
    const [options, setOptions] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [locOptions, setLocOptions] = useState([]);
    const [selectedLoc, setSelectedLocation] = useState('');
    const [selectedLocVal, setSelectedLocationValue] = useState('');

    useEffect(() => {
      axios.get('/users')
        .then(response => {
          const users = response.data.users.map(user => ({
            value: user.id,
            label: user.fname +" "+ user.lname,
          }));
          setOptions(users);
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

    // Preselect creator
    const handleSelectChange = (selected) => {
      if (!selected.some(option => option.value === selectedPeople[0].value)) {
        setSelectedPeople(selectedPeople);
      } else {
        setSelectedPeople(selected);
      }
    };

    // Edit event input variables
    const [title, setTitle] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [description, setDescription] = useState('');
    const [links, setOnDetails] = useState('');
    const [start, setStart] = useState('');
    const fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
    const [end, setEnd] = useState('');
    const fEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');

    // Edit event input handlers
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
      setOnDetails(event.target.value);
    };
    const handleStartChange = (event) => {
      setStart(event.target.value);
    };
    const handleEndChange = (event) => {
      setEnd(event.target.value);
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


    // Handle submission of updated event data
    const handleSubmit = (event) => {
      event.preventDefault();
      // Updating event validations
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
      }else{

        // Ajax request to call springboot controller that edit events
        axios.defaults.withCredentials = true;
        axios.put('/edit/'+eventId,
        {title: title, color: selectedColor, description: description, links: links, location: selectedLocVal, start: fStart, end: fEnd},
        {withCredentials: true},
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {

          // Ajax request to call springboot controller tdelete participants
          axios.delete('/delete/'+eventId+'/edit')
          .then(response => {
            const selectedPeopleIds = selectedPeople.map(p => p.value);
            const payload = {eventId: response.data, participantIds: selectedPeopleIds};

            // Ajax request to call springboot controller that save the new participants
            axios.defaults.withCredentials = true;
            axios.post('/saveEventParticipants', payload, {withCredentials: true},
            { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
              Swal.fire({
                  title: 'Event Updated',
                  text: " ",
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#537557'
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
        })
        .catch(error => {
          console.log(error);
        });
      };
    };
      // function htmlFor clear button
      const handleClear = () => {
        setTitle('');
        setSelectedColor('#5f9e55');
        setDescription('');
        setSelectedLocation('');
        setOnDetails('');
        setStart('');
        setEnd('');
        const preselectedUser = options.find(user => user.value === selectedPeople[0].value);
        const updatedSelectedPeople = preselectedUser ? [preselectedUser] : [];

        setSelectedPeople(updatedSelectedPeople);
      };

      // Copy link button
      const textToCopy = eventData.links;
      const [copyMsg, setshowCopyMsg] = useState(null);
      const handleCopyText = () => {
        navigator.clipboard.writeText(textToCopy).then(
          () => {
            console.log("Text copied to clipboard.");
            setshowCopyMsg('Copied to clipboard');
            setTimeout(() => {
              setshowCopyMsg(null);
            }, 3000);
          },
          (err) => {
            console.error("Error copying text to clipboard: ", err);
          }
        );
      };

      // Error variables
      const [timeerr, setTimeError] = useState(null);

    return (
      <>
      {/* Show Event Details */}
      <div className="modal" tabIndex="-1" style={{ display: isOpenView ? "block" : "none" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header"  style={{backgroundColor: eventData.color}}>
            <h5 className="modal-title"> <i className="fa-solid fa-circle-info me-2"></i>Event Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={props.toggleModal} aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <input type="hidden" id="eventId"></input>
            <p className="fw-bold"><i className="fa-solid fa-handshake me-2"></i>Title: </p><p id="eventTitle" style={{wordBreak: 'break-all'}}>{eventData.title}</p>
            <p className="fw-bold"><i className="fa-solid fa-circle-info me-2"></i>Description: </p><p id="eventDescription" style={{wordBreak: 'break-all'}}>{eventData.description}</p>
            <p className="fw-bold"><i className="fa-solid fa-location-dot me-2"></i>Location: </p><p id="eventLocation">{eventData.location}</p>
            <p><i className="fa-solid fa-user-tie me-2"></i><b>Appointment Creator:</b></p> <p> {appointmentCreator}</p>
            <p className="fw-bold"><i className="fa-solid fa-users me-1"></i>Participant:</p>
            <ul className="list-group" id="participant">
              {participants}
            </ul>
            <div className="row align-items-center">
            <p className="fw-bold"><i className="fa-solid fa-cloud me-2"></i>Online Details: </p>
              <div className="col-10">
              <a href={textToCopy} style={{wordBreak: 'break-all'}}>{textToCopy}</a>
              </div>
              <div className="col-sm-2 align-items-right">
              <button onClick={handleCopyText} type="button" class="btn btn-outline-dark btn-sm"><i class="fa-regular fa-copy fa-xs"></i></button>
              </div>
              {copyMsg && <div style={{height: '10px'}} className="invalid-feedback">{copyMsg}</div>}
            </div>
            <div className="row align-items-center">
              <div className="col">
                <p className="fw-bold"><i className="fa-solid fa-hourglass-start me-2"></i> Start TIme:</p>
                <p style={{display: 'inline'}}>Date: </p><p id="eventStartDate" style={{display: 'inline'}}>{moment(eventData.start).format('YYYY-MM-DD')}</p>
                <br/>
                <p style={{display: 'inline'}}>Time: </p><p id="eventStartTime" style={{display: 'inline'}}>{moment(eventData.start).format('HH:mm a')}</p>
              </div>
              <div className="col">
                <p className="fw-bold"><i className="fa-solid fa-hourglass-start fa-rotate-180 me-2"></i> End Time:</p>
                <p style={{display: 'inline'}}>Date: </p><p id="eventEndDate" style={{display: 'inline'}}>{moment(eventData.end).format('YYYY-MM-DD')}</p>
                <br/>
                <p style={{display: 'inline'}}>Time: </p><p id="eventEndTime" style={{display: 'inline'}}>{moment(eventData.end).format('HH:mm a')}</p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={props.toggleModal} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger" id="removeEventBtn" onClick={handleDeleteEvent}><i className="fa-solid fa-trash me-2" ></i>Delete</button>
            <button style={{ display: moment(eventData.end).isAfter(moment()) ? "block" : "none" }} type="button" className="btn btn-success" id="editEventBtn" data-bs-target="#editEventModal" onClick={handleEditShow}><i className="fa-solid fa-pen-to-square me-2"></i>Edit</button>
          </div>
        </div>
      </div>
    </div>

  {/* Show Edit Event */}
  <div className="modal" tabIndex="-1" style={{ display: isOpenEdit ? "block" : "none" }}>
        <form onSubmit={handleSubmit}>
        <div className="modal-dialog modal-dialog-centered modal-lg" style={{marginTop: '8%'}}>
          <div style= {{backgroundColor: 'white'}}className="modal-content">

            <div className="modal-header" style={{backgroundColor: selectedColor}}>
              <h5 className="modal-title"><i className="fa-regular fa-calendar-plus me-2"></i>Edit Appointment</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleEditShow} aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{fontWeight: 'bold'}}>
              <div className="mb-3 row">
                <div className="col-md-9">
                  <label htmlFor="addTitle" className="form-label"><i className="fa-solid fa-handshake me-1"></i>Title</label>
                  <input type="text" className="form-control" id="addTitle" name="title" maxLength="100" value={title} onChange={handleTitleChange} required/>
                </div>
                <div className="col-sm-3">
                <label htmlFor="addColor" className="form-label"><i className="fa-solid fa-palette me-2"></i>Event Color</label>
                <select className="form-select" id="addColor" name="color" onChange={handleHeaderColor} value={selectedColor} style={{ backgroundColor: selectedColor}}>
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

              <div className="mb-3">
                <label htmlFor="addDesc" className="form-label"><i className="fa-solid fa-circle-info me-2"></i>Description</label>
                <textarea type="textarea" className="form-control" id="addDesc" name="description" maxLength="100" rows="3" value={description} onChange={handleDescriptionChange} required></textarea>
              </div>

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

              <div className="mb-3">
                <label htmlFor="addPart" className="form-label"><i className="fa-solid fa-users me-1"></i>Participant/s:</label>
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

              <div className="mb-3">
                <label htmlFor="addODetails" className="form-label"><i className="fa-solid fa-cloud me-1"></i>Online Details</label>
                <textarea type="textarea" className="form-control" id="addODetails" name="onlinedetails" rows="3" value={links} onChange={handleOnDetailsChange}></textarea>
              </div>

              <div className="row g-3">
                <div className="col">
                  <label className="control-label col-sm-5" htmlFor="addStart"><i className="fa-solid fa-hourglass-start me-2"></i> Start Time</label>
                  <div className="col-sm-15">
                    <input className={`form-control ${timeerr ? 'is-invalid' : ''}`} type="datetime-local" id="addStart" name="start" placeholder="Start" value={start} onChange={handleStartChange} required/>
                    {timeerr && <div style={{height: '10px'}} className="invalid-feedback">{timeerr}</div>}
                  </div>
                </div>
                <div className="col">
                  <label className="control-label col-sm-5" htmlFor="addEnd"><i className="fa-solid fa-hourglass-start fa-rotate-180 me-2"></i> End Time</label>
                  <div className="col-sm-15">
                    <input className={`form-control ${timeerr ? 'is-invalid' : ''}`} type="datetime-local" id="addEnd" name="end" placeholder="End" value={end} onChange={handleEndChange} required/>
                    {timeerr && <div style={{height: '10px'}} className="invalid-feedback">{timeerr}</div>}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <span id="errMsg" style={{color:'red' }}></span>
            </div>

            {/* Buttons */}
            <div className="modal-footer">
              <button type="button" onClick={handleEditShow} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="reset" className="btn btn-outline-secondary" onClick={handleClear}><i className="fa-solid fa-eraser me-2"></i>Clear</button>
              <button type="submit" className="btn btn-success" id="addEventBtn"><i className="fa-solid fa-floppy-disk me-2"></i>Save Changes</button>
            </div>
          </div>
        </div>
        </form>
      </div>

    </>
    )
}

export default ViewEditEvent