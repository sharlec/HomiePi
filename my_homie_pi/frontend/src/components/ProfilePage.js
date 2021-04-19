import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";

export default class ProfilePage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(

        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a New Account
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Register a new user here</div>
            </FormHelperText>
              <RadioGroup row defaultValue='M'>
                  <FormControlLabel
                      value="M"
                      control={<Radio color="primary" />}
                      label = "Male"
                      labelPlacement="bottom"
                  />

                    <FormControlLabel
                      value="F"
                      control={<Radio color="secondary" />}
                      label = "Female"
                      labelPlacement="bottom"
                  />
              </RadioGroup>
             </FormControl>
         </Grid>

        <Grid item xs={12} align="center">
            <FormControl>
                <TextField
                    required={true}
                    type="text"
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                />
                <FormHelperText>
                    <div align = "center">Name</div>
                </FormHelperText>
            </FormControl>
        </Grid>


        <Grid item xs={12} align="center">
            <FormControl>
                <TextField
                    required={true}
                    type="number"
                    defaultValue={0}
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                />
                <FormHelperText>
                    <div align = "center">Age</div>
                </FormHelperText>
            </FormControl>
        </Grid>

       <Grid item xs={12} align="center">
            <Button color = "primary" variant="contained">
                Submit
            </Button>
       </Grid>

        <Grid item xs={12} align="center">
           <Button color = "secondary" variant="contained" to="/" component={Link}>
                Back
            </Button>
        </Grid>



        </Grid>
        )
    }
}