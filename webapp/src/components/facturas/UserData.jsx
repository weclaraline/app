import { Typography, Grid, Paper } from '@material-ui/core';
import React , { useState }from 'react';

const UserData = () => {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserData =   () => {
    // const res = await api.createRequest().get('userInfo');
    // setUserInfo(res);
    setUserInfo({
          name: "Luis Alfredo Tejeda",
          rfc:"tesl881223nf1",
          email:"luis.tejeda@wizeline.com",
          address : "camino real a colima 51500"
      })
  };

  React.useEffect( () => {
      fetchUserData();
  }, []);

  return (
    <Paper>
      <Typography variant="h4" align="left" gutterBottom>
        Mis Datos
      </Typography>
      <Grid container alignItems="flex-start" spacing={1}>
        <Grid item md={3}>
          <Typography align="left" variant="h5" gutterBottom>
            Nombre:  {userInfo.name}
          </Typography>
        </Grid>

        <Grid item md={2}>
          <Typography align="left" variant="h5" gutterBottom>
            RFC: {userInfo.rfc}
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Typography align="left" variant="h5" gutterBottom>
            Email: {userInfo.rfc}
          </Typography>
        </Grid>

        <Grid item md={4}>
          <Typography align="left" variant="h5" gutterBottom>
            Direccion: {userInfo.address}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserData;
