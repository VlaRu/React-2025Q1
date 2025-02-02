import { Component } from 'react';
import './App.css';
import { Search } from '../components/search/SearchBar';

class App extends Component {
  render() {
    return (
      <>
        <p className="read-the-docs">Searching your pokemon!</p>
        <Search />
      </>
    );
  }
}

export default App;
