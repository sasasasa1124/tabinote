import React from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';

export default function Header() { 
  const [user,setUser] = useState({id: 0, name:'Anonymous'});

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <header>
      <MDBNavbar expand='lg' light bgColor='white'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <div className='collapse navbar-collapse' id='navbarExample01'>
            <MDBNavbarNav right className='mb-2 mb-lg-0'>
              <MDBNavbarItem active>
                <MDBNavbarLink aria-current='page' href='/'>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    fontFamily='"Segoe UI"'
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                  >
                    TabiNote<i className="fas fa-leaf"></i>
                  </Typography>
                </MDBNavbarLink>
              </MDBNavbarItem>
              {user.id > 0
                ?
                (<div>
                  <MDBNavbarItem><MDBNavbarLink href='/home'>Home <i className='fas fa-home'></i></MDBNavbarLink></MDBNavbarItem>
                  <MDBNavbarItem><MDBNavbarLink href='/post/users'>Private <i className='fas fa-user-shield'></i></MDBNavbarLink></MDBNavbarItem>
                  <MDBNavbarItem><MDBNavbarLink href='/posts/create'>Create <i className='fas fa-plus'></i></MDBNavbarLink></MDBNavbarItem>
                  <MDBNavbarItem><MDBNavbarLink href='/about'>About <i className='fas fa-info'></i></MDBNavbarLink></MDBNavbarItem>
                </div>)
                :
                (<div>                  
                  <MDBNavbarItem><MDBNavbarLink href='/home'>Home <i className='fas fa-home'></i></MDBNavbarLink></MDBNavbarItem>
                  <MDBNavbarItem><MDBNavbarLink href='/about'>About <i className='fas fa-info'></i></MDBNavbarLink></MDBNavbarItem>
                </div>)
              }
            </MDBNavbarNav>
          </div>
        </MDBContainer>
        <Box sx={{ flexGrow: 0 }}>  
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <i className="fas fa-user"></i>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {(user.id > 0)
              ?
                (
                  <div>
                    <MenuItem key='logout'>
                      <Typography textAlign="center">
                        <form id="logout-form" action="/logout" method="POST" style={{display:'none'}}>
                          <input type="hidden" name="_token" value={ document.head.querySelector('meta[name="csrf-token"]').content } />
                        </form>
                        <button type="submit">Log Out</button>
                      </Typography>
                    </MenuItem>
                  </div>
                ) 
              : 
                (
                  <div>
                    <MenuItem key='login' onClick={handleCloseUserMenu}>
                        <Typography textAlign="center"><a href='/login'>Login</a></Typography>
                    </MenuItem>
                    <MenuItem key='register' onClick={handleCloseUserMenu}>
                        <Typography textAlign="center"><a href='/register'>Register</a></Typography>
                    </MenuItem>
                  </div>
                )
              }
            </Menu>
          </Box>
      </MDBNavbar>
    </header>
  );
  function fetchUser() {
    axios.get('/users/fetch')
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            console.log(err);
    });
  }
}




//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             fontFamily='"Segoe UI"'
//             sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
//           >
//             TabiNote<i className="fas fa-leaf"></i>
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {(user.id > 0) 
//               ? ButtonGenerator(authenticatedPages)
//               : ButtonGenerator(guestPages)}
//             </Menu>
//           </Box>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {(user.id > 0) 
//             ? ButtonGenerator(authenticatedPages)
//             : ButtonGenerator(guestPages)}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );


// };
// export default Header;
