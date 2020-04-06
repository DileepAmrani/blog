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
import Container from "@material-ui/core/Container";
import { Navbar } from "../../Components";
import { firebaseApp } from "../../Config/Firebase/firebase";
import "./SignUp.css";
import Swal from "sweetalert2";

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

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }


  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.props.history.push("/profile");

      } else {
        // User is signed out.
        // ...
        this.props.history.push("/signup");

      }
    });
  }

  signup = () => {
    const { firstName, lastName, email, password } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        // Add a new document in collection "cities"
        console.log(res.user.uid)
        firebaseApp
          .firestore()
          .collection("users")
          .add({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            uid: res.user.uid
          })
          .then( () =>{
            // console.log("Document successfully written!", res);
            localStorage.setItem("uid", res.user.uid)
            Swal.fire("Sign Up Succesfull", "You may Processed", "success");
            this.props.history.push("/login")

          })
          .catch( (error) =>{
            // console.error("Error writing document: ", error);
          });
        })
        .catch((error)=> {
          var errorMessage = error.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: { errorMessage }
          });
      });
  };

  render() {
    const Swal = require("sweetalert2");
    console.log(this.state);
    return (
      <React.Fragment>
        <Navbar path={() => this.props.history.push("/login")}
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
              Sign up
            </Typography>
            <form className="form" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={e =>
                      this.setState({
                        firstName: e.target.value
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={e =>
                      this.setState({
                        lastName: e.target.value
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={e =>
                      this.setState({
                        email: e.target.value
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e =>
                      this.setState({
                        password: e.target.value
                      })
                    }
                  />
                </Grid>
              </Grid>
              <br />
              <Button
                type="button"
                fullWidth
                variant="contained"
                style={{ color: "#fff", backgroundColor: "#4db6ac"}}
                onClick={() => this.signup()}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end" style={{ margin: "10px 0" }}>
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
