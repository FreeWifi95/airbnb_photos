import React from 'react';
import Slider from './Slider.jsx';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [{ url: '' }],
      galleryOpen: false,
      currentIndex: 0,
      marginLeft: 0,
    };
    this.openGallery = this.openGallery.bind(this);
    this.closeGallery = this.closeGallery.bind(this);
    this.reverseSlide = this.reverseSlide.bind(this);
    this.forwardSlide = this.forwardSlide.bind(this);
    this.setOpacity = this.setOpacity.bind(this);
    this.selectThumbnail = this.selectThumbnail.bind(this);
  }
  componentDidUpdate(prevProps) {
    this.setOpacity();
    if (prevProps !== this.props) {
      this.setState({
        photos: this.props.photos,
        galleryOpen: this.state.galleryOpen,
        currentIndex: 0,
      });
    }
  }
  setOpacity() {
    this.state.photos.forEach((photo) => {
      const thumbnail = photo;
      if (this.state.photos.indexOf(photo) === this.state.currentIndex) {
        thumbnail.opacity = '1';
      } else {
        thumbnail.opacity = '0.3';
      }
    });
  }
  openGallery() {
    this.setState({
      galleryOpen: true,
    });
    this.setOpacity();
  }
  closeGallery() {
    this.setState({
      galleryOpen: false,
    });
  }
  forwardSlide() {
    if (this.state.currentIndex + 1 === this.state.photos.length) {
      this.setState({
        currentIndex: 0,
        marginLeft: 0,
      });
    } else if (this.state.currentIndex >= 3 && this.state.currentIndex < this.state.photos.length - 4) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        marginLeft: this.state.marginLeft - 110,
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
      });
    }
  }
  reverseSlide() {
    if (this.state.currentIndex === 0) {
      this.setState({
        currentIndex: this.state.photos.length - 1,
        marginLeft: 0,
      });
    } if (this.state.currentIndex >= 4 && this.state.currentIndex < this.state.photos.length - 3) {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
        marginLeft: this.state.marginLeft + 110,
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
      });
    }
  }
  selectThumbnail(event) {
    const thumbnailUrl = event.target.src;
    this.props.photos.forEach((photo) => {
      if (photo.url === thumbnailUrl) {
        this.setState({
          currentIndex: this.props.photos.indexOf(photo),
        });
      }
    });
    this.setOpacity();
  }

  render() {
    if (this.state.galleryOpen === true) {
      return (
        <div>
          <button className="bannerButton" onClick={this.openGallery}>
            <img id="bannerPhoto" alt="" src={this.props.photos[0].url} />
          </button>
          <div id="myModal" className="modal" display="block">
            <button className="close cursor" onClick={this.closeGallery}>&times;</button>
            <button className="prev" onClick={this.reverseSlide}>&#10094;</button>
            <button className="next" onClick={this.forwardSlide}>&#10095;</button>
            <div className="modal-content">
              <div className="mainSlide">
                <img className="mainSlidePhoto" alt="" src={this.state.photos[this.state.currentIndex].url} />
              </div>
              <Slider
                currentIndex={this.state.currentIndex}
                photos={this.props.photos}
                setOpacity={this.setOpacity}
                selectThumbnail={this.selectThumbnail}
                marginLeft={this.state.marginLeft}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <button className="bannerButton" onClick={this.openGallery}>
          <img id="bannerPhoto" alt="" src={this.props.photos[0].url} />
        </button>
      </div>
    );
  }
}

Banner.propTypes = {
  photos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default Banner;
