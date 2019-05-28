import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import createReactClass from 'create-react-class';
import configureStore from './store/configureStore';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


import Home from './screens/Home';
import Profile from './screens/Profile';
import { getMe } from './actions/sessionActions';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(getMe(sessionStorage.getItem('token')));

const App = createReactClass({
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/">
                        <IndexRoute component={Home} />
                        <Route path="profile" component={Profile} onEnter={requireAuth} />
                    </Route>
                </Router>
            </Provider>
        );
    }
});

function requireAuth(nextState, replace) {
    if (!sessionStorage.token) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

ReactDom.render(<App />, document.getElementById('react-root'));

