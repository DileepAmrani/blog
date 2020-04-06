import React from "react";
import { MainRoute } from "./Config/Router";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  // componentDidMount() {
  //   var showAdminRoute = true;
  //   this.setState({
  //     showAdminRoute
  //   });
  // }
  render() {
    return <MainRoute />;
  }
}
export default App;
