import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import CircleStatus from './CircleStatus'

import mockdata from './vqa_album.json'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];




export default function Album() {
  const classes = useStyles();
  const [fade,setfade]=useState(true);
  const [showres,setshowres]=useState(false);

  function selector(props){
    var imglist=[]
    return (
        <div {...props}>
        <Container maxWidth="lg">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Now,let us select one question!
        </Typography>
        <Grid container spacing={2} justify="center">
            <Grid item>
                <Button variant="outlined" color="primary" size="large"
                    onClick={()=>{
                        setfade(false)
                        setTimeout(function(){setshowres(true)},5000)
                    }}
                >
                    Primary
                </Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" color="secondary" size="large">
                    Secondary
                </Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" color="primary" size="large">
                    Primary
                </Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" color="primary" size="large">
                    Primary
                </Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" color="primary" size="large">
                    Primary
                </Button>
            </Grid>
          </Grid>
        
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>

            
            {mockdata.map((item) => {
                var img_id=item['img_id']
                if(imglist.indexOf(img_id)==-1){
                    imglist.push(img_id)
                    return(
                    <Grid item key={item['img_id']} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={require('../vqa_album/'+item['img_id']+'.jpg')}
                            title="Image title"
                        />
                        </Card>
                    </Grid>
                    )
                }
            })}
          </Grid>
        </Container> 
      </div>
    );
    }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        
        <div className={classes.heroContent}>
            {showres?
            <Grow in={showres}>
               {selector()}
            </Grow>
            :
            <>
            <Grid container spacing={2} justify="center" style={{position:'absolute'}}>
                {fade  ?<div> </div>
                : <CircleStatus size={100} />
                }
            </Grid>

            <Fade in={fade}>
                {selector()}
            </Fade>
            </>
            }
            
            
        </div>
        
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );



  
}

