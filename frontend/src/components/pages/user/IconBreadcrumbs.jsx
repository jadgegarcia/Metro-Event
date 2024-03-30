      import * as React from 'react';
// import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
// import GrainIcon from '@mui/icons-material/Grain';
import EventFormDialog from '../home/EventFormDialog';
import RequestOrganizerDialog from '../home/RequestOrganizerDialog';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEventOption } from '../../../state/eventAction';


export default function IconBreadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth.isLoggedIn);
  const type = useSelector(state => state.auth.userType);

  const [activeLink, setActiveLink] = useState((type !== "admin" ? 1 : 6));

  // const {username, isAuth} = location.state;
  // const [isAuth, setAuth] = useState(location.state?.isAuth || false);

  function handleClick(option) {
    // event.preventDefault();
    setActiveLink(option);
    console.info(activeLink);
    console.info(type);
    dispatch(setEventOption(option));
  }

  // useEffect(() => {
  //   if(isAuth){
  //     navigate('my');
  //   }
  // }, [isAuth, navigate]);


// useEffect(() => {
//   console.log(username + " => " + isAuth);
// }, [username,isAuth]);


// if user then breadcrumbs All Events / Joined Events / Request Organizer 
//if user then can request to be an organizer through request organizer button or something and hide my events button

// if organizer then breadcrumbs All Events / Joined Events / My Events
//if organizer then hide request organizer button or something and show my events button
  return (
    <>
    <div className="breadcrumbs-container" role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
          {type !== "admin" && 
            <NavLink 
              to='./' 
              className="link"
              onClick={() => {
                handleClick(1); 
              }}
            >
              <span className={activeLink === 1 ? "active" : ""} >All Event</span>
            </NavLink>}
          {type !== "admin" &&
            <NavLink 
              to="joined" 
              className="link"
              onClick={() => {handleClick(2);
               }}
            >
              
              <span className={activeLink === 2 ? "active" : ""} >Events Joined</span>
            </NavLink>}
          {type === "user" && 
            <NavLink 
              to="requested" 
              className="link"
              onClick={() => {handleClick(4);
                }}
            >
              <span className={activeLink === 4 ? "active" : ""}>Requested Events</span></NavLink>}
          {type === "Organizer" &&
            <NavLink 
              to="my" 
              className="link"
              onClick={() => {handleClick(3);
                }}
            >
              <span className={activeLink === 3 ? "active" : ""}>My Events</span></NavLink>}
          {type === "admin" && 
            <NavLink 
              to="requested" 
              className="link"
              onClick={() => {handleClick(5);
                }}
            >
                <span className={activeLink === 5 ? "active" : ""}>Request List</span></NavLink>}
          {type === "admin" && 
            <NavLink 
              to="my" 
              className="link"
              onClick={() => {handleClick(6)
              }}
            >
                <span className={activeLink === 6 ? "active" : ""}>User List</span></NavLink>}
          {/* <a onClick={() => {setLink1(true)}}>All Events</a>
          <a>Joined Events</a> */}
                
          {type === "user" && 
            <NavLink 
              to="request-organizer" 
              className="link"
              onClick={() => {handleClick(6)
              }}
            >
              <span className={activeLink ===  7 ? "active" : ""}>Request to Be Organizer</span>
            </NavLink>
          }
              
      </Breadcrumbs>
    </div>
    <Outlet/> 
    </>
  );
}