import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { firebaseApp } from "../../Config/Firebase/firebase";
import Container from "@material-ui/core/Container";
import { Navbar } from "../../Components";
import Swal from "sweetalert2";
import "./Login.css"
import {useAlert, transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        My Simple Blog
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE
};
export default class SignIn extends React.Component{
  constructor(){
    super()
    this.state ={
      email: "",
      password: ""
    } 
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.props.history.push("/profile");

      } else {
        // User is signed out.
        // ...
        this.props.history.push("/login");

      }
    });
  }

  login = () =>{
    const { email, password } = this.state;
    firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res)=> {
      // console.log("Document successfully written!", res);
      console.log(res.user.uid)
      localStorage.setItem("uid",res.user.uid)
      Swal.fire("Login Succesfull", "You may Processed", "success");
      this.props.history.push("/profile")
      
    })
    .catch((error)=> {
      // const alert = useAlert()
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      //   Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: { errorMessage }
        //   });
        // alert.show("Oh look, an alert!");
        // ...
      });
    }
    render(){
      console.log(this.state)
      const Swal = require("sweetalert2");
      return (
        <div template={AlertTemplate} {...options}>
          <Navbar 
            path={() => this.props.history.push("/login")}
            path1={() => this.props.history.push("/profile")}
            home={() => this.props.history.push("/")}
            loginValue={this.state.loginValue}/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            textAlign: "center",
            marginTop: "10%"
          }}
          >
          <Avatar className="avatar" style={{ backgroundColor: "red" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => this.setState({ email: e.target.value })}
              />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => this.setState({ password: e.target.value })}
            />

            <br />
            <br />
            <Button
              type="button"
              fullWidth
              variant="contained"
                  style={{ color: "#fff", backgroundColor: "#4db6ac" }}
              onClick={() => this.login()}
            >
              Sign In
            </Button>
            <Grid container style={{ margin: "10px 0" }}>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/signup" to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
    }
}
