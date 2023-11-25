// NavBar.js

import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Features/userSlice';

export default function NavBar() {
  const [openBasic, setOpenBasic] = useState(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action through Redux
    dispatch(logout());
  };

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>MovieEmbassy</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/home'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>

            {!user.isLoggedIn ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current='page' href='/login'>
                    Login
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current='page' href='/registration'>
                    SignUp
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current='page' href='/logout' onClick={handleLogout}>
                    Logout
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarBrand active aria-current='page' style={{ marginRight: '30px' }}>
                    Hello {user.name.username}
                  </MDBNavbarBrand>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
