import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import AddSong from './components/AddSong';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add-song" component={AddSong} />
          {/* Add routes for other pages */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
