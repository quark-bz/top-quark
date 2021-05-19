import TemporaryDrawer from './Header.js'
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
                <MainPage/>
                <Button>Hello World</Button>
            </Route>
            <Route path='/about'></Route>
            </Switch>
        </Router>
    )
}
export default App