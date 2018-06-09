import React from 'react';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: this.props.currentIndex
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentIndex !== this.props.currentIndex) {
      this.setState({
        currentIndex: this.props.currentIndex
      });
    }
  }
  render() {
    return (
      <div className="sliderContainer">
        <div className="numbertext">{`${this.props.photos.indexOf(this.props.photos[this.props.currentIndex]) + 1}/${this.props.photos.length}: ${this.props.photos[this.props.currentIndex].description}`}</div>
        <div className="slider">
          <ul className="thumbnails">
            {this.props.photos.map((photo) =>
              <li className="thumbnail"><img className="thumbnailPhoto" src={photo.url} style={{opacity: photo.opacity}}/></li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Slider;
