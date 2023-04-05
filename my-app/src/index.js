// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // import BrowserRouter from react-router-dom
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
//import NavBar from './NavBar';
import Home from './Home';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      {/* <App /> */}
      {/* <NavBar /> */}
      <Home  />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();