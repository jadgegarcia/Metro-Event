import * as React from 'react';
// import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
// import GrainIcon from '@mui/icons-material/Grain';
import EventFormDialog from '../home/EventFormDialog';
import RequestOrganizerDialog from '../home/RequestOrganizerDialog';
import { NavLink, Outlet, useNavigation, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEventOption } from '../../../state/eventAction';


export default function AdminBreadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth.isLoggedIn);
  const type = useSelector(state => state.auth.userType);

  function handleClick(option) {
    // event.preventDefault();
    console.info('You clicked a breadcrumb.');
    dispatch(setEventOption(option));
  }

  return (
    <>
    <div className="breadcrumbs-container" role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink to="requestList"><span onClick={() => {handleClick(5)}} >Request List</span></NavLink>
        <NavLink to="userList"><span onClick={() => {handleClick(6)}} > User List</span></NavLink>
      </Breadcrumbs>
    </div>
    <Outlet/>
    </>
  );
}