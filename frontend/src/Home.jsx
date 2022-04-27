import React from "react"
import AppBar from "@mui/material/AppBar";
import ReactAudioPlayer from 'react-audio-player';
import { Paper, Card } from "@mui/material";
import { Container, Toolbar, Typography,Grid,Item } from "@mui/material";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { SongInput } from "./SongInput";
const Input = styled('input')({
    display: 'none',
  });




export class Home extends React.Component{

    state = {
        songTitle:"examplesong5.mp3",
        list: ["Song1.mp3","Song2.mp3", "Song3.mp3"],
        uploadFile:""
    }

    handleFile(e){
        this.setState({uploadFile:e.target.value})

    }

    render(){
        return <>
        <AppBar position="static">
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        OpenAux
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
        <Container>
            <Grid container spacing={2}>
                <Grid 
                    item 
                    container
                    direction="column"
                    justifyContent="center"
                    sx={{ borderBottom: "0px solid grey", height: '50rem' }}
                    style={{minHeight:'80%',
                            maxHeight:'90%' 
                            }}
                    xs={10}> 
                        <ReactAudioPlayer
                            src={`${process.env.REACT_APP_ICECAST}`}
                            autoPlay
                            controls
                            style={{width:"50rem"}}
                            />
                        <div>{this.state.songTitle}</div>
                    
                </Grid>
                <Grid 
                     
                    container
                    direction="column"
                    justifyContent="center"
                    sx={{ borderBottom: "0px solid grey", height: '50rem' }}
                    style={{minHeight:'80%',
                            maxHeight:'90%'}}
                     xs={2} >
                        <Card style={{padding:"1rem"}}>
                            <div>Song Queue</div>
                            
                            {this.state.list.map((info,index)=><Paper elevation="2" style={{margin:".5rem", padding:"1rem"}} >{index+1}.{info}</Paper>)}
                            
                            <SongInput/>
                                
                        </Card>

                </Grid>
            </Grid>
        </Container>
        </> 

        
    }
}