//import logo from "./logo.svg";
import "./App.css";
import Movies from './components/movie';
import { Route, Redirect, Switch } from 'react-router-dom';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import Customers from './components/customers';

function App() {
  return (
    <main className="container">
      <Switch>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/notfound" component={NotFound}></Route>
        <Redirect from="/" exact to="/movies" />
        <Redirect to="/notfound" />
      </Switch>  
    </main>
  );
}

export default App;
