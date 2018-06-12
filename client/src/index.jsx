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
    this.getPhotos(39);
  }
  getPhotos(houseId) {
    axios.get(`http://localhost:3003/${houseId}`)
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

ReactDOM.render(<App />, document.getElementById('app'));
