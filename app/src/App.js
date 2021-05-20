import TemporaryDrawer from './components/Header.js'
import MainPage from './MainPage.js'
import Button from '@material-ui/core/Button'
import Container from './components/HomeContainer.js'
import TwoItemSubIcon from './components/TwoItemSubContainer'
import SubFlexContainerCard from './components/SubContainerFlex'
import Card from './components/SubCard';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App(){
    return(
        <Router>
            <TemporaryDrawer/>

            <Switch>
            <Route exact path='/'>
                <Container>
                    <TwoItemSubIcon 
                    oneItem={
                        <SubFlexContainerCard>
                            <Card 
                            subject='economics'
                            toolName='Econsgraph'
                            description='Create & Export Economic Graphs quickly'/>

                            <Card 
                            subject='economics'
                            toolName='Econsgraph'
                            description='Create & Export Economic Graphs quickly'/>
                        </SubFlexContainerCard>
                    }
                    />
                    <TwoItemSubIcon/>
                </Container>        

            </Route>
            <Route path='/main'>

            </Route>
            <Route path='/about'></Route>
            </Switch>
        </Router>
    )
}
export default App