import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

import './index.scss';

console.log('ENV');
console.dir(process.env);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
