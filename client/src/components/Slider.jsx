import React from 'react';

const sliderStyles = {
  transition: 'padding 0.25s',
};

const thumbnailStyles = {
  transition: 'margin 0.5s',
};

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: this.props.currentIndex,
      paddingTop: 0,
      marginLeft: 0,
      listShown: true,
    };
    this.toggleList = this.toggleList.bind(this);
    this.moveSlides = this.moveSlides.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentIndex !== this.props.currentIndex) {
      this.setState({
        currentIndex: this.props.currentIndex,
        // marginLeft: this.props.marginLeft,
      });
    }
    if (prevProps.marginLeft !== this.props.marginLeft) {
      this.setState({
        marginLeft: this.props.marginLeft,
      });
    }
    if (prevState.paddingTop !== this.state.paddingTop) {
      this.setState({
        paddingTop: this.state.paddingTop,
      });
    }
    if (prevState.marginLeft !== this.state.marginLeft) {
      this.setState({
        marginLeft: this.state.marginLeft,
      });
    }
  }
  moveSlides(event) {
    this.props.photos.forEach((photo) => {
      if (photo.url === event.target.src) {
        if (this.props.photos.indexOf(photo) > this.state.currentIndex && this.state.currentIndex >= 3 && this.state.currentIndex < this.props.photos.length - 4) {
          console.log('working');
          this.setState({
            marginLeft: this.state.marginLeft - 110,
          });
          console.log(this.state.marginLeft);
        } else if (this.props.photos.indexOf(photo) < this.state.currentIndex && this.state.currentIndex >= 4 && this.state.currentIndex < this.props.photos.length - 3) {
          this.setState({
            marginLeft: this.state.marginLeft + 110,
          });
        }
      }
    });
  }
  toggleList() {
    if (this.state.paddingTop === 0) {
      this.setState({
        paddingTop: 35,
        listShown: false,
      });
    } else {
      this.setState({
        paddingTop: 0,
        listShown: true,
      });
    }
  }
  render() {
    if (this.state.listShown === true) {
      return (
        <div className="sliderContainer" style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>
          <div className="numbertext" style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>{`${this.props.photos.indexOf(this.props.photos[this.state.currentIndex]) + 1}/${this.props.photos.length}: ${this.props.photos[this.props.currentIndex].description}`}
            <button className="toggleList" onClick={e => this.toggleList(e)}>Hide photo list <i className="fa fa-caret-down" /></button>
          </div>
          <div className="slider" style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>
            <ul className="thumbnails" style={{ ...thumbnailStyles, marginLeft: this.state.marginLeft }}>
              {this.props.photos.map(photo =>
                <li className="thumbnail"><button className="thumbnailButton" onClick={(e) => { this.props.selectThumbnail(e); this.moveSlides(e); }}><img className="thumbnailPhoto" alt="" src={photo.url} style={{ opacity: photo.opacity }} /></button></li>)}
            </ul>
          </div>
        </div>
      );
    }
    return (
      <div className="sliderContainer" style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>
        <div className="numbertext" style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>{`${this.props.photos.indexOf(this.props.photos[this.state.currentIndex]) + 1}/${this.props.photos.length}: ${this.props.photos[this.props.currentIndex].description}`}
          <button className="toggleList" onClick={e => this.toggleList(e)}>Show photo list <i className="fa fa-caret-up" /></button>
        </div>
        <div className="slider" style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>
          <ul className="thumbnails" style={{ ...thumbnailStyles, marginLeft: this.state.marginLeft }}>
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
  marginLeft: React.PropTypes.number.isRequired,
};

export default Slider;
