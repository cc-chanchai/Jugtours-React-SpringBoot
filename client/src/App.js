import React,{ Component } from 'react';
import './App.css';
import Home from './component/Home'
import GroupList from './component/GroupList'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export default class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/groups" exact={true} component={GroupList} />
        </Switch>
      </Router>
    )
  }
}
