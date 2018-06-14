import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Banner from './components/Banner.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [{ url: '' }],
    };
  }
  componentDidMount() {
    this.getPhotos();
  }
  getPhotos() {
    const endPoint = window.location.pathname;
    axios.get(`/photos${endPoint}`)
      .then((response) => {
        this.setState({
          photos: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <h1>Sharebnb</h1>
        <Banner photos={this.state.photos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('photos'));
