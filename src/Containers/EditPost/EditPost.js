import React from "react";
import { firebaseApp } from "../../Config/Firebase/firebase";
import { Navbar, Footer } from "../../Components";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class EditPost extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    let data = this.props.location.state;
    this.setState({
      title: data.title,
      description: data.description,
      postId: data.id,
      author: data.author,
      timestamp: data.timestamp,
      authoruid: data.authoruid,
      createdOn: data.createdOn
    });
  }
  updatePost = () => {
    const { title, description, authoruid, postId, author, timestamp, createdOn } = this.state;
    // if(postData){

    const updateRef = firebaseApp
      .firestore()
      .collection("posts")
      .doc(postId);
    updateRef
      .set({
        title,
        description,
        authoruid,
        timestamp,
        author,
        createdOn
      })
      .then(docRef => {
        this.setState({
          postId: "",
          title: "",
          description: "",
          author: "",
          createdOn: "",
          authoruid
        });
          this.props.history.push("/profile")
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
    // }
  };
  render() {
    console.log(this.state.postData);
    return (
      <React.Fragment >
        <Navbar />
        <h1>Edit Post ...</h1>

        <div
          style={{
            padding: "10px 0",
            backgroundColor: "#ccfdf9",
            color: ""
          }}
        >
          <Container>
            <span className="creat-post-heading">Create a New Post ....</span>
            <br />
            <TextField
              id="standard-multiline-flexible"
              label="Enter Title Here"
              multiline
              fullWidth
              value={this.state.title}
              style={{ color: "#fff !important" }}
              onChange={e =>
                this.setState({
                  title: e.target.value
                })
              }
            />
            <br />
            <textarea
            value={this.state.description}
              onChange={e =>
                this.setState({
                  description: e.target.value
                })
              }
              className="textArea"
              placeholder=" Enter Description Here ....."
            ></textarea>
            <br />
            <Button
              variant="contained"
              onClick={() => this.updatePost()}
              style={{ backgroundColor: "#20B2AA", color: "#fff" }}
            >
              UPDATE
            </Button>
          </Container>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default EditPost;
