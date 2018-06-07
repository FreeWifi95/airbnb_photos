import React from 'react';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [{url: ''}],
      galleryOpen: false
    };
    this.openGallery = this.openGallery.bind(this);
    this.closeGallery = this.closeGallery.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        photos: this.props.photos,
        galleryOpen: this.state.galleryOpen
      })
    }
  }
  openGallery() {
    this.setState({
      galleryOpen: true
    })
  }
  closeGallery() {
    console.log('working')
    this.setState({
      galleryOpen: false
    })
  }
  render() {
    if (this.state.galleryOpen === true) {
      return (
    <div>
    <div>
      <div className="row">
        <div className="column">
          <img id="bannerPhoto" src={this.props.photos[0].url} onClick={this.openGallery} /*currentSlide(1)"*//>
        </div>
      </div>
      {/* I plan on making the html below a separate component with mapped divs, but just testing for now */}
      <div id="myModal" className="modal" display="block">
        <div className="close cursor" onClick={this.closeGallery}>&times;</div>
        <div className="modal-content">
      
          <div className="slide">
            <div className="numbertext">1 / 4</div>
            <img className="slidePhoto" src={this.props.photos[0].url}/>
          </div>
      
          <div className="slide">
            <div className="numbertext">2 / 4</div>
            <img className="slidePhoto" src={this.props.photos[7].url}/>
          </div>
      
          <div className="slide">
            <div className="numbertext">3 / 4</div>
            <img className="slidePhoto" src={this.props.photos[2].url}/>
          </div>
      
          <div className="slide">
            <div className="numbertext">4 / 4</div>
            <img className="slidePhoto" src={this.props.photos[3].url}/>
          </div>
      
          <a className="prev" /*onClick="plusSlides(-1)"*/>&#10094;</a>
          <a className="next" /*onClick="plusSlides(1)"*/>&#10095;</a>
      
          <div className="caption-container">
            <p id="caption"></p>
          </div>
      
          <div className="column">
            <img className="demo" src={this.props.photos[0].url} /*onClick="currentSlide(1)"*/ alt="Nature" />
          </div>
      
          <div className="column">
            <img className="demo" src={this.props.photos[7].url} /*onClick="currentSlide(2)"*/ alt="Trolltunga" />
          </div>
      
          <div className="column">
            <img className="demo" src={this.props.photos[2].url} /*onClick="currentSlide(3)"*/ alt="Mountains" />
          </div>
      
          <div className="column">
            <img className="demo" src={this.props.photos[3].url} /*onClick="currentSlide(4)"*/ alt="Lights" />
          </div>
        </div>
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
