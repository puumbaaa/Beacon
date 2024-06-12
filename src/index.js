import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import knex from 'knex';

export const database = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 80,
        user: 'superuser',
        password: 'ZmEUIgrj_7bA6WxI',
        database: 'beacon',
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
