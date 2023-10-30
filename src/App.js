import './App.css';
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: 'Marilyn Monroe',
        bio: 'Iconic 1950s Hollywood actress, known for her beauty and memorable roles in films like "Some Like It Hot" and "The Seven Year Itch.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Marilyn2-by_Cronenweth.JPG/330px-Marilyn2-by_Cronenweth.JPG',
        profession: 'Actress, writer, model, singer, and filmmaker',
      },
      shows: false,
      timeSinceMount: 0,
    };
  }
  hide = () => {
    const shows = !this.state.shows;

    if (shows) {
      this.resetTimer();
    } else {
      this.clearTimer();
    }
    this.setState({ shows });
  };
  resetTimer = () => {
    this.setState({ timeSinceMount: 0 });
    this.clearTimer();
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timeSinceMount: prevState.timeSinceMount + 1,
      }));
    }, 1000);
  };
  clearTimer = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  };
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        timeSinceMount: this.state.timeSinceMount + 1,
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const { person, shows, timeSinceMount } = this.state;
    return (
      <div>
        <h1>{person.name}</h1>
        <button onClick={this.hide}>
          {shows ? 'On' : 'Off'}
        </button>
        {shows && (
          <div>
            <p>Time since mounted: {timeSinceMount} seconds</p>
            <img src={person.image} alt={person.name} />
            <p>{person.bio}</p>
            <p>Profession: {person.profession}</p>
          </div>
        )}
      </div>
    );
  }
}
