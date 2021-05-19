import TemporaryDrawer from './components/Header.js'
import MainPage from './MainPage.js'
import Button from '@material-ui/core/Button'
//import card from './SubCard';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App(){
    return(
        <Router>
            <TemporaryDrawer/>

            <Switch>
            <Route exact path='/'>
        

            </Route>
            <Route path='/main'>

            </Route>
            <Route path='/about'></Route>
            </Switch>
        </Router>
    )
}
export default App