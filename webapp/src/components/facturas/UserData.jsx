import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { UserDataService } from "../../api/";

const userDataService = new UserDataService();

const UserData = () => {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserData = async () => {

    const res = await userDataService.make();    
    if (res.data.length > 0) {
      setUserInfo(res.data[0]);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Card>
      <CardContent>
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
                Email: {userInfo.email}
              </Typography>
            </Grid>

            <Grid item md={4}>
              <Typography align="left" variant="h5" gutterBottom>
                Direccion: {userInfo.address}
              </Typography>
            </Grid>
          </Grid>
      </CardContent>
    </Card>
  );
};

export default UserData;
