import React,{ Component } from 'react';
import './App.css';
import Home from './component/Home'
import GroupList from './component/GroupList'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import GroupEdit from './component/GroupEdit'

export default class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/groups" exact={true} component={GroupList} />
          <Route path='/group/:id' component={GroupEdit}/>
        </Switch>
      </Router>
    )
  }
}
