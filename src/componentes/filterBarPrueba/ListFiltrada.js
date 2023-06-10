import React from 'react';
import RecetaCardLog from '../homeLog/RecetaCardLog';
import { Container, Grid, GridListTile } from '@material-ui/core';


//item= lo que obtenga del backend
const List = ({ list }) => (
  <Container>
    <Grid container spacing={3}>
      {list.map((list) => (
          <Grid item key={list._id} xs={12} md={6} lg={4}>
           <RecetaCardLog id={list._id}/>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default List;