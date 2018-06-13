import React from 'react';
import styles from './style.css';

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
  }
  moveSlides(event) {
    this.props.photos.forEach((photo) => {
      if (this.props.photos.length > 7 && photo.url === event.target.src && this.props.photos.indexOf(photo) > this.state.currentIndex) {
        this.moveRight(photo);
      } else if (this.props.photos.length > 7 && photo.url === event.target.src && this.props.photos.indexOf(photo) < this.state.currentIndex) {
        this.moveLeft(photo);
      }
    });
  }
  moveRight(photo) {
    if (this.state.currentIndex < 3 && this.props.photos.indexOf(photo) > 3) {
      this.setState({
        marginLeft: this.state.marginLeft - ((this.props.photos.indexOf(photo) - 3) * 110),
        currentIndex: this.props.photos.indexOf(photo),
      });
    } else if (this.state.currentIndex >= 3 && this.props.photos.indexOf(photo) < this.props.photos.length - 3) {
      this.setState({
        marginLeft: this.state.marginLeft - ((this.props.photos.indexOf(photo) - this.state.currentIndex) * 110),
        currentIndex: this.props.photos.indexOf(photo),
      });
    } else if (this.state.currentIndex >= 3 && this.state.currentIndex < this.props.photos.length - 3 && this.props.photos.indexOf(photo) > this.props.photos.length - 2) {
      this.setState({
        marginLeft: this.state.marginLeft - ((this.props.photos.length - this.props.photos.indexOf(photo) - 1) * 110),
        currentIndex: this.props.photos.indexOf(photo),
      });
    } 
  }
  moveLeft(photo) {
    if (this.state.currentIndex >= 3 && this.props.photos.indexOf(photo) < this.props.photos.length - 3 && this.props.photos.indexOf(photo) > 2) {
      this.setState({
        marginLeft: this.state.marginLeft + ((this.state.currentIndex - this.props.photos.indexOf(photo)) * 110),
        currentIndex: this.props.photos.indexOf(photo),
      });
    }
    if ((this.state.currentIndex === 4 || this.state.currentIndex === 5) && (this.props.photos.indexOf(photo) === 1 || this.props.photos.indexOf(photo) === 2)) {
      this.setState({
        marginLeft: this.state.marginLeft + ((this.state.currentIndex - this.props.photos.indexOf(photo) - 1) * 110),
        currentIndex: this.props.photos.indexOf(photo),
      });
    }
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
        <div className={styles.sliderContainer} style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>
          <div className={styles.numbertext} style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>{`${this.props.photos.indexOf(this.props.photos[this.state.currentIndex]) + 1}/${this.props.photos.length}: ${this.props.photos[this.props.currentIndex].description}`}
            <button className={styles.toggleList} onClick={e => this.toggleList(e)}>Hide photo list <i className="fa fa-caret-down" /></button>
          </div>
          <div className={styles.slider} style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>
            <ul className={styles.thumbnails} style={{ ...thumbnailStyles, marginLeft: this.state.marginLeft }}>
              {this.props.photos.map(photo =>
                <li className={styles.thumbnail}><button className={styles.thumbnailButton} onClick={(e) => { this.props.selectThumbnail(e); this.moveSlides(e); }}><img className={styles.thumbnailPhoto} alt="" src={photo.url} style={{ opacity: photo.opacity }} /></button></li>)}
            </ul>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.sliderContainer} style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>
        <div className={styles.numbertext} style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>{`${this.props.photos.indexOf(this.props.photos[this.state.currentIndex]) + 1}/${this.props.photos.length}: ${this.props.photos[this.props.currentIndex].description}`}
          <button className={styles.toggleList} onClick={e => this.toggleList(e)}>Show photo list <i className="fa fa-caret-up" /></button>
        </div>
        <div className={styles.slider} style={{ ...sliderStyles, paddingTop: this.state.paddingTop }}>
          <ul className={styles.thumbnails} style={{ ...thumbnailStyles, marginLeft: this.state.marginLeft }}>
            {this.props.photos.map(photo =>
              <li className={styles.thumbnail}><button className={styles.thumbnailButton} onClick={e => this.props.selectThumbnail(e)}><img className={styles.thumbnailPhoto} alt="" src={photo.url} style={{ opacity: photo.opacity }} /></button></li>)}
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
