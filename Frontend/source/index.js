// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

//-----------SOCIAL APP-----------
//Instruments
import './aSocialApp/theme/init';
// import 'bootstrap/dist/css/bootstrap-grid.css';

//App
import App from './aSocialApp/navigation/App';

render(
    <App/>,
    document.getElementById('app'),
);

//---------END SOCIAL APP---------










//ANDREW`S APP
// Instruments
// import  './theme/init';
// import { store, history } from './init/store';
//
// // App
// import App from './navigation/App';
//
// render(
//   <Provider store = { store }>
//     <Router history = { history }>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById('app'),
// );

//POSTS APP
// import App from './a-lesson-posts/components/App/App';
// import { store } from './a-lesson-posts/redux/store';

// render(
//     <Provider store = { store }>
//         <App/>
//     </Provider>,
//     document.getElementById('app')
// );
