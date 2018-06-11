import React from 'react';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: this.props.currentIndex,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentIndex !== this.props.currentIndex) {
      this.setState({
        currentIndex: this.props.currentIndex,
      });
    }
  }
  render() {
    return (
      <div className="sliderContainer">
        <div className="numbertext">{`${this.props.photos.indexOf(this.props.photos[this.state.currentIndex]) + 1}/${this.props.photos.length}: ${this.props.photos[this.props.currentIndex].description}`}
          <button className="toggleList">Hide photo list <i className="fa fa-caret-down" /></button>
        </div>
        <div className="slider">
          <ul className="thumbnails">
            {this.props.photos.map(photo =>
              <li className="thumbnail"><button className="thumbnailButton" onClick={e => this.props.selectThumbnail(e)}><img className="thumbnailPhoto" alt="" src={photo.url} style={{ opacity: photo.opacity }} /></button></li>)}
          </ul>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  photos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selectThumbnail: React.PropTypes.func.isRequired,
  currentIndex: React.PropTypes.number.isRequired,
};

export default Slider;
