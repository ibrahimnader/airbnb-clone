import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import HostScreen from './screens/HostScreen'
import SearchPage from './screens/SearchPage'
import PlaceInfoScreen from './screens/placeInfoScreen'
import { AppProdivder } from './contexts/AppContext'
import AppWrapper from './AppWrapper.js'
import DashboardScreen from './screens/DashboardScreen'
import AdminDashboardScreen from './screens/AdminScreen'
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AppProdivder>
            <AppWrapper>
                <Router>
                    <Switch>
                        <Route path="/" component={HomeScreen} exact />
                        <Route path="/search" render={(props) => <SearchPage {...props} />} exact />
                        <Route path="/search/:id" component={PlaceInfoScreen} exact />
                        <Route path="/host" component={HostScreen} exact />
                        <Route path="/dashboard" component={DashboardScreen} exact />
                        <Route path="/admin" component={AdminDashboardScreen} exact />
                    </Switch>
                </Router>
            </AppWrapper>
        </AppProdivder>
    )
}

export default App
