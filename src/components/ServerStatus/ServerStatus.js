import React from 'react';
import config from '../../config';


import './ServerStatus.css';

const api = config.apiRoot;
const lib = {};

lib.ping = function () {

  return fetch(`${api}/status`)
    .then((res) => {

      if (res.status !== 200) {
        return res.json().then(e => Promise.reject(e));
      }

      return true;
    });
};

lib.crash = function () {

  return fetch(`${api}/crash`, {
    method: 'POST',
  });
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
    this.poll          = this.poll.bind(this);
  }

  startWatching() {

    const { watching } = this.state;

    if (watching) {
      return;
    }

    this.setState({
      watching: true,
    });

    this.poll();
  }

  stopWatching() {

    this.setState({
      status   : '-',
      watching : false,
    });
  }

  poll() {

    const { watching } = this.state;

    return lib
      .ping()
      .then(() => {
        if (watching) {
          this.setState({ status: 'up' });
        }
      })
      .catch(() => {
        if (watching) {
          this.setState({ status: 'down' });
        }
      })
      .finally(() => {
        if (watching) {
          setTimeout(this.poll, 0.5 * 1000);
        }
      });
  }

  render() {

    const { error, status, watching } = this.state;

    return (
      <div className="ServerStatus">

        <h2>Server Status</h2>
        <p>GET /status</p>

        <div className="error">{ error }</div>

        <div className="status">{ status }</div>

        { !watching && <button className="toggle" type="button" onClick={this.startWatching}>Start Watching</button> }
        { watching && <button className="toggle" type="button" onClick={this.stopWatching}>Stop Watching</button> }

        <button className="crash" type="button" onClick={lib.crash}>Crash</button>
      </div>
    );
  }
}

export default ServerStatus;
