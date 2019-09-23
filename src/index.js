import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const CardList = props => (
  <div>
    {props.profiles.map(profile => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);
class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      // Style is not CSS-inline-style. It's JavaScript.
      //Can use conditional styles
      //Can use mix of JS styles and global styles
      // Challenges in JS styles -> Ex: media queries usage
      <div style={{ margin: "1rem", fontFamily: "Arial" }}>
        <img src={profile.avatar_url} alt="avatar" style={{ width: 75 }} />
        <div style={{ display: "inline-block", marginLeft: 10 }}>
          <div style={{ fontSize: "125%" }}>{profile.name}</div>
          <div>{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: "" };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.onSubmit(response.data);
    this.setState({ userName: "" });
  };

  handleChange = e => this.setState({ userName: e.target.value });

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={this.handleChange}
          placeholder="GitHub Username"
          className="gh-username"
          required
          style={{ textAlign: "center", margin: "5% 0 0 30%" }}
        />
        <button>Add Card</button>
      </form>
    );
  }
}
class App extends React.Component {
  state = { profiles: [] };

  addProfile = profileData => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };
  render() {
    return (
      <div>
        <div style={{ textAlign: "center", fontFamily: "Arial" }}>
          {this.props.title}
        </div>
        <Form onSubmit={this.addProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

const root = document.getElementById("root");
ReactDOM.render(<App title="The GitHub Cards App" />, root);

//NOTES: The first ecision you need to make in React is component structure//
