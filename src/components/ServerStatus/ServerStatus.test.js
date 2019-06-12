import React        from 'react';
import ReactDOM     from 'react-dom';
import ServerStatus from './ServerStatus';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ServerStatus />, div);
  ReactDOM.unmountComponentAtNode(div);
});
