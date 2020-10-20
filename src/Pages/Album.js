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
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import CircleStatus from './CircleStatus'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';

import mockdata from './vqa_album.json'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://hicoderdr.github.io/">
        HicoDR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const drawerWidth = 240;

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const ques=['what color is/are the','what type/kind of','how many/what number is','how many people are','what time','what/what is/what is the','what sport is','what animal is','what is in the','what is on the','what room is','why']
const restype=[
    ['what color are the','what color is the'],
    ['what type of','what kind of'],['how many','what number is'],
    ['how many people are'],['what time'],['what','what is the','what is'],
    ['what sport is'],['what animal is'],['what is in the'],
    ['what is on the'],['what room is'],['why'],
]

export default function Album() {
  const classes = useStyles();
  const theme = useTheme();

  const [fade,setfade]=useState(true);
  const [showres,setshowres]=useState(false);
  const [slted,setslted]=useState(0)
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            RGCN-VQA
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {ques.map(function(item){
                function click(item){
                    var index = ques.indexOf(item)
                    setslted(index)
                }
                return(
                <ListItem button 
                  key={item} 
                  onClick={click.bind(this,item)}
                  selected={slted==ques.indexOf(item)}
                  >
                    <ListItemText primary={item} />
                </ListItem>
                )
            },this)
            }
        </List>
      </Drawer>

      <main>
        {/* Hero unit */}
        
        <div className={classes.heroContent}>
            {showres?
            <Grow in={showres}>
               {sections()}
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
          华东理工大学 大学生创新创业项目
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          指导老师：张静
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
  function sectionlist(slted){
    var ans=[]
    var res=[]
    var qs=restype[slted]
    for(var i in mockdata){
      var data=mockdata[i]
      if(qs.indexOf(data['question_type'])!=-1){
        var label=data['label']
        for(var j in label){
          if(ans.indexOf(j)==-1&&label[j]>=0.9){
            ans.push(j)
            res.push([])
            var index=ans.indexOf(j)
            res[index]=res[index].concat([data['img_id']])
          }else if(ans.indexOf(j)&&label[j]>=0.9){
            var index=ans.indexOf(j)
            if(res[index].indexOf(data['img_id'])==-1) res[index]=res[index].concat([data['img_id']])
          }
        }
      }
    }
    return (
      <div>
        <Container maxWidth="md">
      {ans.map((item,idx)=>{
        return(
          <div>
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
                {item}
            </Typography>
            
              <Grid container spacing={4}>
                {res[idx].map((id)=>{
                  return (
                    <Grid item key={id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={require('../vqa_album/'+id+'.jpg')}
                            title="Image title"
                        />
                        </Card>
                    </Grid>
                  )
                })}
              </Grid>
          </div>
        )
      })}</Container>
      </div>
    )
  }
  function sections(props){
    var imglist=[]
    return (
    <div {...props}>
        
        <Container maxWidth="md">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {ques[slted]}
          </Typography>
          {sectionlist(slted)}
        </Container>
      
    </div>
    );
    }
  function selector(props){
    var imglist=[]
    return (
        <div {...props}>
        <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Now,let us select one question!
        </Typography>
        <Grid container spacing={2} justify="center">
            {ques.map(function(item){
                function click(item){
                    setfade(false)
                    setTimeout(function(){setshowres(true)},5000)
                    var index = ques.indexOf(item)
                    setslted(index)
                }
                return(
                <Grid item>
                    <Button variant="outlined" color="primary" size="large"
                        onClick={click.bind(this,item)}
                    >
                        {item}
                    </Button>
                </Grid>
                )
            },this)
            }
            
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

    // function selector1(props){
    //   var imglist=[]
    //   return (
    //     <Container maxWidth="md">
    //     <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
    //         {slted}
    //     </Typography>
    //     <Grid container spacing={4}>
    //       {sectionlist(slted)}
    //     </Grid>
    //   </Container>
    //   );
    //   }
}

