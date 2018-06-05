import React from 'react';
import ReactDOM from 'react-dom';
import Photos from './components/Photos.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.getPhotos();
    console.log(window.location.pathname);
  }
  getPhotos() {
    axios.get('/houses/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <h1>Sharebnb</h1>
        <Photos />
      </div>
    );
  }  
};

ReactDOM.render(<App />, document.getElementById('app'));
