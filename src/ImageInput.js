import PropTypes from 'prop-types';
import React, { Component } from 'react';

const readFileAsDataURL = file =>
  new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = event =>
      resolve(event.target.result);

    reader.readAsDataURL(file);
  });

const resizeImage = (imageURL, canvas, maxHeight) =>
  newPromise(resolve => {
    const image = new Image();

    image.onload = () => {
      const context = canvas.getContext('2d');

      if (image.height > maxHeight) {
        image.width *= maxHeight / image.height;
        image.height = maxHeight;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0, image.width, image.height);

      resolve(canvas.toDataURL('image/jpg'));
    }

    image.src = imageURL;
  });

class ImageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleFilehange(event) {
    const file = event.target.files[0];

    if (
      file &&
      file.type.match(/^image\//)
    ) {
      readFileAsDataURL(file)
        .then(originalURL =>
          resizeImage(originalURL, this.canvas, this.props.maxHeight)
          .then(url => this.setState({ value: url, }))
        );
    } else {
      this.setState({ value: '', });
    }
  }

  handleFormReset() {
    this.setState({ value: '', });
  }

  componentDidMount() {
    this.canvas = document.createElement('canvas');
    this.fileInput.form.addEventListener('reset', this.handleFormReset);
  }

  componentWillMount() {
    this.fileInput.form.removeEventListener('reset', this.handleFormReset);
  }

  getStyles(value) {
    if (value) {
      return {
        ...this.props.style,
        backgroundImage: `url("${value}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      };
    }
    return {
      ...this.props.style,
    };
  }

  render() {
    const { className, name, fileStyle, } = this.props;
    const { value } = this.state;
    const style = this.getStyles(value);

    return (
      <div className={className} style={style}>
        <input type="hidden" name={name} value={value} />
        <input
          onChange={this.handleFilehange}
          ref={node => this.fileInput = node}
          style{fileStyle}
          type="file"
        />
      </div>
    );
  }
}

ImageInput.propTypes = {
  className: PropTypes.string,
  maxHeight: PropTypes.number,
  name: PropTypes.string,
  style: PropTypes.object,
}

ImageInput.defaultProps = {
  className: '',
  fileStyle: {
    height: '100%',
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  maxHeight: '100px',
  name: '',
  style: {
    position: 'relative',
  },
};

export default ImageInput;