import React from 'react';

import './ServerStatus.css';

const api = 'http://localhost:8000';
const lib = {};

lib.ping = function () {

  return fetch(`${api}/status`)
    .then((res) => {

      if (res.status !== 200) {
        return res.json().then(e => Promise.reject(e))
      }

      return true;
    })
};

lib.crash = function () {

  return fetch(`${api}/crash`, {
    method: 'POST',
  })
};

class ServerStatus extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      status   : '-',
      watching : false,
      error    : null,
    };

    this.startWatching = this.startWatching.bind(this);
    this.stopWatching  = this.stopWatching.bind(this);
    this.ping          = this.ping.bind(this);
    this.crash         = this.crash.bind(this);
  }

  startWatching() {

    if (this.state.watching) {
      return;
    }

    this.setState({
      watching: true,
    })

    this.ping();
  }

  stopWatching() {

    this.setState({
      status: '-',
      watching: false,
    });
  }

  ping() {

    return lib
      .ping()
      .then(() => {
        if (this.state.watching) {
          this.setState({ status: 'up' });
        }
      })
      .catch(() => {
        if (this.state.watching) {
          this.setState({ status: 'down' });
        }
      })
      .finally(() => {
        if (this.state.watching) {
          setTimeout(this.ping, 0.5 * 1000)
        }
      });
  }

  crash() {

    lib.crash().then(console.log).catch(console.log);
  }

  render() {

    return (
      <div className="ServerStatus">

        <h2>Server Status</h2>
        <p>GET /status</p>

        <div className="error">{ this.state.error }</div>

        <div className="status">{ this.state.status }</div>

        { !this.state.watching && <button className="toggle" type="button" onClick={this.startWatching}>Start Watching</button> }
        { this.state.watching && <button className="toggle" type="button" onClick={this.stopWatching}>Stop Watching</button> }

        <button className="crash" type="button" onClick={this.crash} >Crash</button>
      </div>
    );
  }
}

export default ServerStatus;
