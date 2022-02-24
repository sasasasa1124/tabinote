import React, { useEffect, useReducer, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
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
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Tabinote
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
            ><a href='/'>Home</a></Button>
            {(user.id > 0) ?
            (<Button
              key='private'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            ><a href='/posts/private'>Private</a></Button>)
            :
            (<div></div>)
            }
            <Button
              key='create'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            ><a href='/posts/create'>Create</a></Button>
            <Button
              key='about'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            ><a href='/about'>About</a></Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>  
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  <MenuItem key='home' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><a href='/'>Home</a></Typography>
                  </MenuItem>
                  <MenuItem key='create' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><a href='/posts/create'>Create</a></Typography>
                  </MenuItem>
                  <MenuItem key='about' onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><a href='/about'>About</a></Typography>
                  </MenuItem>
                </div>
              ) : 
              (
                <div>
                  <MenuItem key='' onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"><a href='/login'>Login</a></Typography>
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