import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#97E8FC",
        border: '2px solid #FFFFFF',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function AnimatedModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const taskname = ""

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
                Start a new Task
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {/*handleuse*/}
        <div className={classes.paper}>
        <Grid container spacing={1}   container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          // style={{ minHeight: '100vh' }}
        >
        <Grid item xs={12} align="center">
          <Typography component="h6" variant="h6">
            New Task
          </Typography>
        </Grid>


        <Grid item xs={12} align="center">
            <FormControl>
                <TextField
                    required={true}
                    type="text"
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                    // onChange={this.handleUserNameChange}
                />
                <FormHelperText>
                    <div align = "center">Task Name</div>
                </FormHelperText>
            </FormControl>

        </Grid>

       <Grid item xs={12} align="center">
            <FormControl>
                <TextField
                    required={true}
                    type="password"
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                    // onChange={this.handlePasswordChange}
                />
                <FormHelperText>
                    <div align = "center">Daily Repeat</div>
                </FormHelperText>
            </FormControl>
        </Grid>

       <Grid item xs={12} align="center">
            <FormControl>
                <TextField
                    required={true}
                    type="password"
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                    // onChange={this.handlePasswordChange}
                />
                <FormHelperText>
                    <div align = "center">Daily Repeat</div>
                </FormHelperText>
            </FormControl>
        </Grid>
    </Grid>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}