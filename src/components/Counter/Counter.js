import React  from 'react';
import config from '../../config';

import './Counter.css';

const api = config.apiRoot;
const lib = {};

lib.get = function () {

  return fetch(`${api}/counter`)
    .then((res) => {

      if (res.status !== 200) {
        return res.json().then(e => Promise.reject(e));
      }

      return res.json();
    });
};

lib.increment = function (step = 1) {

  return fetch(`${api}/counter`, {
    method  : 'PUT',
    headers : {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ step }),
  })
    .then((res) => {

      if (res.status !== 200) {
        return res.json().then(e => Promise.reject(e));
      }

      return res.json();
    });
};

lib.decrement = function (step = 1) {

  return fetch(`${api}/counter`, {
    method  : 'PUT',
    headers : {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ step: step * -1 }),
  })
    .then((res) => {

      if (res.status !== 200) {
        return res.json().then(e => Promise.reject(e));
      }

      return res.json();
    });
};

class Counter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value : '-',
      error : null,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {

    lib
      .get()
      .then((json) => {

        this.setState({
          error : null,
          value : json.value,
        });
      })
      .catch((err) => {

        this.setState({
          error: 'Cannot get counter value',
        });

        /* eslint-disable-next-line no-console */
        console.log(err);
      });
  }

  increment() {

    this.setState({ error: null });

    lib
      .increment(1)
      .then((json) => {

        this.setState({
          error : null,
          value : json.value,
        });
      })
      .catch((err) => {

        this.setState({
          error: 'Cannot increment counter value',
        });

        /* eslint-disable-next-line no-console */
        console.log(err);
      });
  }

  decrement() {

    this.setState({ error: null });

    lib
      .decrement(1)
      .then((json) => {

        this.setState({
          error : null,
          value : json.value,
        });
      })
      .catch((err) => {

        this.setState({
          error: 'Cannot decrement counter value',
        });

        /* eslint-disable-next-line no-console */
        console.log(err);
      });
  }

  render() {

    const { error, value } = this.state;

    return (
      <div className="Counter">

        <h2>Counter</h2>
        <p>Persistent state test</p>

        <div className="error">{ error }</div>

        <div className="value">{ value }</div>

        <button className="increment" type="button" onClick={this.increment}>Increment</button>
        <button className="decrement" type="button" onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}

export default Counter;
