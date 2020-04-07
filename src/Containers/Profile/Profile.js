import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Navbar, Footer } from "../../Components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MdTextFields, MdDelete } from "react-icons/md";
import { FaUserTag, FaCalendarAlt, FaRegEdit } from "react-icons/fa";
import Paper from "@material-ui/core/Paper";
import Swal from "sweetalert2";
import { firebaseApp } from "../../Config/Firebase/firebase";
import "./Profile.css";

class Profile extends React.Component {
  constructor() {
    super();

    var today = new Date(),
      date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

    var timestamp = today.toUTCString();
    this.state = {
      title: "",
      description: "",
      timestamp: timestamp,
      author: "",
      login: false,
      posts: [],
      loader: false,
      createdOn: date,
      img: "",
      fileName: ''
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user =>>>>", user.uid);
        this.setState({
          authoruid: user.uid,
        });
        this.props.history.push("/profile");
      } else {
        this.props.history.push("/login");
      }
    });

    let { posts } = this.state;
    let uid = localStorage.getItem("uid");
    console.log(uid);

    firebaseApp
      .firestore()
      .collection("users")
      .where("uid", "==", uid)
      .get()
      .then((res) => {
        res.forEach((user) => {
          console.log(user.data());
          let userdata = user.data();
          this.setState({
            author: userdata.firstName + " " + userdata.lastName,
          });
        });
      });
    firebaseApp
      .firestore()
      .collection("posts")
      .where("authoruid", "==", uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          let getposts = doc.data();
          getposts.id = doc.id;
          let changes = snapshot.docChanges();
          console.log(changes);
          console.log(doc.data());
          if (changes.type === "added") {
            console.log(changes.doc.data());
          }
          if (changes.type === "modified") {
            console.log(changes.doc.data());
          }
          console.log(getposts);
          posts.push(getposts);
          this.setState({
            posts: posts,
            loader: true,
          });
        });
      });
    setTimeout(() => {
      this.setState({
        loader: true,
      });
    }, 4000);
  }

  signout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        this.props.history.push("/");
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          text: "Something went wrong!",
        });
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  delete = (v, i) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          let { posts } = this.state;

          let desertRef = firebaseApp.storage().ref(`images/${v.fileName}`);

          // Delete the file
          desertRef.delete().then( ()=> {
            // File deleted successfully
            console.log('Deleted')
          }).catch( (error)=> {
            // Uh-oh, an error occurred!
            console.log('Not Deleted')
          });

          firebaseApp
            .firestore()
            .collection("posts")
            .doc(v.id)
            .delete()
            .then(posts.splice(i, 1));
          this.setState({
            posts: posts,
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  imageUpload = (e) => {
    let fileName = e.target.files[0].name;
    this.setState({
      fileName: fileName,
    });
    let ref = firebaseApp.storage().ref("/").child(`images/${fileName}`);

    let imagePut = ref.put(e.target.files[0]);

        imagePut.on("state_changed", () => {
          ref
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              this.setState({
                postImage: url,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
  };





  post = () => {
    let {
      title,
      description,
      timestamp,
      author,
      authoruid,
      createdOn,
      postImage,
      fileName
    } = this.state;



    if (title) {
      if (description) {
        firebaseApp
          .firestore()
          .collection("posts")
          .add({
            title: title,
            description: description,
            timestamp: timestamp,
            author: author,
            authoruid: authoruid,
            createdOn: createdOn,
            postImageURL: postImage,
            fileName, fileName
          })
          .then((res) => {
            this.props.history.push("/profile");
            this.setState({
              title: " ",
              description: " ",
            });
            console.log("Document successfully written!", res);
            Swal.fire(
              "Post Created Successfully",
              "You may Processed",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            Swal.fire("Data not sent Succesfuly", "You may Processed", "error");
          });
      } else {
        Swal.fire(
          "Description is Missing",
          "Please Write Description",
          "error"
        );
      }
    } else {
      Swal.fire("Title is Missing", "Please Give Title to Post", "error");
    }
  };
  render() {
    console.log(this.state.fileName);

    return (
      <div className="profile">
        <Navbar
          path={() => this.props.history.push("/login")}
          path1={() => this.props.history.push("/profile")}
          home={() => this.props.history.push("/")}
          loginValue="true"
          signOut={() => this.signout()}
        />
        <div style={{ backgroundColor: "#157ec6" }}>
          <div
            style={{
              padding: "10px 0",
              backgroundColor: "#fff",
              color: "",
            }}
          >
            <Container>
              <span className="creat-post-heading">Create a New Post ....</span>
              <br />
              <label className="file">
                <input
                  type="file"
                  id="file"
                  aria-label="File browser example"
                  value={this.state.fileName}
                  onChange={(e) => this.imageUpload(e)}
                />
                <span className="file-custom"></span>
              </label>

              <TextField
                id="standard-multiline-flexible"
                label="Enter Title Here"
                multiline
                fullWidth
                style={{ color: "#fff !important" }}
                value={this.state.title}
                onChange={(e) =>
                  this.setState({
                    title: e.target.value,
                  })
                }
              />
              <br />
              <textarea
                value={this.state.description}
                onChange={(e) =>
                  this.setState({
                    description: e.target.value,
                  })
                }
                className="textArea"
                placeholder=" Enter Description Here ....."
              ></textarea>
              <br />
              <Button
                variant="contained"
                onClick={() => this.post()}
                style={{ backgroundColor: "#20B2AA", color: "#fff" }}
              >
                POST NOW
              </Button>
            </Container>
          </div>
        </div>
        <div className="heading">Your Time Line</div>
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
                  Data is Not Available
                </div>
              ) : (
                <Container>
                  {this.state.posts.map((v, i) => {
                    return (
                      <Grid container justify-content center>
                        <Grid item lg={12} sm={12}>
                          <Paper elevation={0} className="paper" key={i}>
                            <Grid container>
                              <Grid item lg={12} sm={12}>
                                <FaUserTag size={20} />
                                <span className="author">{v.author}</span>
                              </Grid>

                              <Grid item lg={12} sm={12} xs={12}>
                                <MdTextFields size={35} />
                                <span className="title">{v.title}</span>
                              </Grid>

                              <Grid item lg={12} sm={12} xs={12}>
                                <div style={{ textAlign: "center" }}>
                                      
                                  <img src={v.postImageURL} className="post-image" alt={v.title}/>
                                </div>
                              </Grid>
                              <Grid item xs={12}>
                                <p>{v.description}</p>
                              </Grid>
                              <Grid item lg={12} sm={12} xs={12}>
                                <hr />

                                <FaCalendarAlt size={20} />
                                <span className="date">{v.createdOn}</span>
                                <div style={{ float: "right" }}>
                                  <FaRegEdit size={20} />
                                  <span
                                    className="edit-btn"
                                    onClick={() =>
                                      this.props.history.push("/edit-post", v)
                                    }
                                  >
                                    Edit
                                  </span>
                                  <MdDelete color="red" size={20} />
                                  <span
                                    style={{ color: "red" }}
                                    onClick={() => this.delete(v, i)}
                                  >
                                    Delete
                                  </span>
                                </div>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Container>
              )}
            </div>
          ) : (
            <div style={{ margin: "auto", textAlign: "center" }}>
              <p>Loading..</p>
              <span className="spinner spinner-large"></span>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
