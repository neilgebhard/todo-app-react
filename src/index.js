import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const DATA = [
  { id: "todo-0", name: "Clean the house", completed: false },
  { id: "todo-1", name: "Do some exercise", completed: false },
  { id: "todo-2", name: "Cook dinner", completed: false }
];

ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);