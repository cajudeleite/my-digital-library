// == Import
import './styles.scss';
import NavBar from '../NavBar';
import { Route, Switch } from 'react-router-dom';

// == Composant
const App = () => (
  <main className="app">
    <NavBar />

    <Switch>
      <Route path='/' exact>
        <h1>Composant : App</h1>
      </Route>
      <Route path='/lol' exact>
        <h1>Composant : Lol</h1>
      </Route>
    </Switch>

  </main>
);

// == Export
export default App;
