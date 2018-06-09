import React from 'react';
import Slider from './Slider.jsx';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [{url: ''}],
      galleryOpen: false,
      currentIndex: 0,
    };
    this.openGallery = this.openGallery.bind(this);
    this.closeGallery = this.closeGallery.bind(this);
    this.reverseSlide = this.reverseSlide.bind(this);
    this.forwardSlide = this.forwardSlide.bind(this);
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
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
      });
    }
    // this.setOpacity();
  }
  reverseSlide() {
    if (this.state.currentIndex === 0) {
      this.setState({
        currentIndex: this.state.photos.length - 1, 
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
      });
    }
    // this.setOpacity();
  }
  setOpacity() {
    this.state.photos.forEach((photo) => {
      if (this.state.photos.indexOf(photo) === this.state.currentIndex) {
        photo.opacity = "1";
      } else {
        photo.opacity = "0.3";
      }
    });
  }
  render() {
    if (this.state.galleryOpen === true) {
      return (
        <div>
          <img id="bannerPhoto" src={this.props.photos[0].url} onClick={this.openGallery} /*currentSlide(1)"*//>
          <div id="myModal" className="modal" display="block">
            <div className="close cursor" onClick={this.closeGallery}>&times;</div>
              <a className="prev" onClick={this.reverseSlide}>&#10094;</a>
              <a className="next" onClick={this.forwardSlide}>&#10095;</a>
            <div className="modal-content">

              <div className="mainSlide">
                <img className="mainSlidePhoto" src={this.state.photos[this.state.currentIndex].url}/>
                {/* <div className="numbertext">{`${this.state.photos.indexOf(this.state.photos[this.state.currentIndex]) + 1}/${this.state.photos.length}: ${this.state.photos[this.state.currentIndex].description}`}</div> */}
              </div>
          
              <Slider currentIndex={this.state.currentIndex} photos={this.props.photos}/>
          

            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <img id="bannerPhoto" src={this.props.photos[0].url} onClick={this.openGallery} /*currentSlide(1)"*/ className="hover-shadow"/>
        </div>
      )
    }
  }
};

export default Banner;
