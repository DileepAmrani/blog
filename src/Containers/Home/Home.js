import React from "react";
import { Navbar, Footer } from "../../Components";
import "./Home.css";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { firebaseApp } from "../../Config/Firebase/firebase";
import { MdTextFields } from "react-icons/md";
import { FaUserTag, FaCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loader: false,
      loginValue: false,
      isData: false,
    };
  }

  signout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("uid");
        this.props.history.push("/");
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          text: "Something went wrong!",
        });

        this.setState({
          loginValue: false,
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  


 
  componentDidMount() {
    let { posts } = this.state;
    firebaseApp
      .firestore()
      .collection("posts")
      .orderBy("timestamp", 'desc')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          // console.log(change.doc.data())
          let getposts = change.doc.data()
          getposts.id = change.doc.id;
          // console.log(getposts)


          if (change.type === "added") {
            // console.log("New: ", getposts);
            posts.push(getposts);
            this.setState({
              posts: posts,
              loader: true,
            });
          }
          if (change.type === "modified") {
            posts.push(getposts);
            this.setState({
              posts: posts,
              loader: true,
            });
          }
          if (change.type === "removed") {
            posts.push(getposts);
            this.setState({
              posts: posts,
              loader: true,
            });
          }

        })
      });
    
    setTimeout(() => {
      this.setState({
        loader: true,
      });
    }, 4000);

    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // console.log("user =>>>>", user.uid);
        this.setState({
          authoruid: user.uid,
          loginValue: true,
        });
      } else {
        // User is signed out.
        // ...
      }
    });
  }


  render() {
    // console.log(this.state);
    return (
      <div>
        <Navbar
          login="Login"
          path={() => this.props.history.push("/login")}
          path1={() => this.props.history.push("/profile")}
          home={() => this.props.history.push("/")}
          loginValue={this.state.loginValue}
          signOut={() => this.signout()}
          />


        <div >

        <div >
          <h2 style={{ textAlign: "center" }}>News Feed</h2>
        </div>
        <div>
          {this.state.loader ? (
            <div>
              {this.state.posts === undefined ||
              this.state.posts.length === 0 ? (
                <div
                
                  style={{
                    textAlign: "center",
                    padding: "30px 0",
                    fontSize: "300%",
                    
                    
                  }}
                  >
                  Data is Loading or May Be Not Available
                </div>
              ) : (
                <div>
                  {this.state.posts.map((v, i) => {
                    return (
                      <Container>
                        <Grid container>
                          <Grid item lg={12} sm={12}>
                            <Paper elevation={0} className="paper" key={i}>
                              <Grid container>
                        

                                <Grid item lg={12} sm={12} md={12}>
                                  <MdTextFields size={35} />
                                   <span className="title">{v.title}</span> 
                            
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                  &nbsp; &nbsp;<FaUserTag size={15} />
                                  <span className="author">{v.author}</span>
                                </Grid>
                                <hr />
                                <Grid item lg={12} sm={12} xs={12}>
                                  <div style={{ textAlign: "center" }}>
                                    <img
                                      src={v.postImageURL}
                                      className="post-image"
                                      alt='Image is Missing'
                                      />
                                  </div>
                                </Grid>
                                <Grid item xs={12}>
                                  <p className='description'> &nbsp;&nbsp;&nbsp;{v.description}</p>
                                </Grid>
                                <Grid item lg={12} sm={12} xs={12}>
                                  <hr />

                                  <FaCalendarAlt size={20} />
                                  <label className="date">{v.createdOn}</label>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Container>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div style={{ margin: "auto", textAlign: "center" }}>
              <p>Loading..</p>
              <span className="spinner spinner-large"></span>
            </div>
          )}
        </div>


       
          </div>
        <Footer className="footer" />
      </div>
    );
  }
}

export default Home;
