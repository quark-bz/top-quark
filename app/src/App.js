import TemporaryDrawer from './components/Header.js'
import MainPage from './MainPage.js'
import Button from '@material-ui/core/Button'
import Container from './components/HomeContainer.js'
import TwoItemSubIcon from './components/TwoItemSubContainer'
import SubFlexContainerCard from './components/SubContainerFlex'
import Card from './components/SubCard';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './avocadoPastel.jpg'
import TitleSubjectText from './components/MainTitleText'
function App(){
    return(
        <Router>
             
            <TemporaryDrawer/>
            <div id="backgroundStyling"></div>
            <Switch>
            <Route exact path='/main'>
                
                <Container>
                    <TwoItemSubIcon 
                    oneItem={
                        <SubFlexContainerCard>
                            <Card 
                            subject='economics'
                            toolName='Econsgraph'
                            description='Create & Export Economic graphs quickly'/>
                                          
                        </SubFlexContainerCard>
                    }
                    twoItem={
                        <TitleSubjectText
                        subject="Economics"
                        description="Level up your Economics notes"
                        lean='LEFT'
                        />

                    }
                    />
                    <hr></hr>
                    <TwoItemSubIcon 
                    id='chemistryContainer'
                    twoItem={
                        <SubFlexContainerCard>
                            <Card 
                            subject='chemistry'
                            toolName='ChemBuild'
                            description='Build & export Chemical structures quickly'/>
                        </SubFlexContainerCard>
                    }
                    oneItem={
                        <TitleSubjectText
                        subject="Chemistry"
                        description="Spice up your Chemistry notes"
                        lean='RIGHT'
                        />

                    }
                    />

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