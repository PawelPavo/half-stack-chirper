import * as React from 'react';
import './scss/app';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import editChirp from './components/editChirp'


interface IAppProps {}

interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {

    render() {
        return (
            <Router>
                <main className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/:id" component={editChirp} />
                    </Switch>
                </main>
            </Router>
        )
    }
}

