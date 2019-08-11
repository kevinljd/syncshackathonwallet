import React from  'react';
import Appbar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
  return (
    <div>
      <Appbar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            React & Material-UI Sample Application
          </Typography>
        </Toolbar>
      </Appbar>
    </div>
  );
}
export default Navbar;
