import React, { Component } from 'react';
import Search from './components/Search';
import Saved from './components/Saved';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      savedResults: [],
    }
  }

  updateSavedResults(event, res) {
    if(this.state.savedResults.includes(res)){
      alert('You have already saved this image');
    } else {
      this.setState(() => ({
        savedResults: [res]
      }))
    }
  }
  
  render() {
    return (
      <div className="App">
        <Grid container >
          <Grid item xs={12} sm={6} className="search-container">
            <Search updateSavedResults={this.updateSavedResults.bind(this)} />
          </Grid>
          <Grid item xs={12} sm={6} className="saved-container">
            {this.state.savedResults.length > 0 ? (<Saved savedResults={this.state.savedResults}/>) : (<Typography variant="h5" gutterBottom>You do not have any images saved yet</Typography>)}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
