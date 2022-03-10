import React, { useEffect, useReducer, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Header = (props) => {
  const [user,setUser] = useState({id: 0, name:'Anonymous'});
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  useEffect(() => {
    fetchUser();
  },[]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontFamily='"Segoe UI"'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            TabiNote<i class="fas fa-leaf"></i>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='home'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            ><a href='/'>Home <i class="fas fa-home"></i></a></Button>
            {(user.id > 0) ?
            (<Button
              key='private'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            ><a href='/posts/users'>Yours <i class="fas fa-user-shield"></i></a></Button>)
            :
            (<div></div>)
            }
            <Button
              key='create'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            ><a href='/posts/create'>Create <i class="fas fa-plus"></i></a></Button>
            <Button
              key='about'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            ><a href='/about'>About <i class="fas fa-info-circle"></i></a></Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>  
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <i class="fas fa-user"></i>
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
          {/* conditioning rendering by authentication */}
          {(user.id > 0) ?
              (
                <div>
                  <MenuItem key='log_out' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <form id="logout-form" action="/logout" method="POST" style={{display:'none'}}>
                        <input type="hidden" name="_token" value={ document.head.querySelector('meta[name="csrf-token"]').content } />
                      </form>
                      <button type="submit">Log Out</button>
                    </Typography>
                  </MenuItem>
                </div>
              ) : 
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
        </Toolbar>
      </Container>
    </AppBar>
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
};
export default Header;