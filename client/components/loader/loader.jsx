var s = getStyle();
import {Motion, spring} from 'react-motion';

export default class Loader extends React.Component{
  constructor(props) {
    super(props);
    this.getSpringProps = this.getSpringProps.bind(this);
    this.state = {
      isBigger: false,
    };
  }
  componentDidMount() {
    let count = 0;
    let i = setInterval(function(){
      this.setState({isBigger: !this.state.isBigger});
      count ++;
      if (count === 10) {clearInterval(i);}
    }.bind(this), 500);
  }
  getSpringProps() {
    return {
      defaultStyle: {
        scale: 1,
      },
      style:{
        scale: spring(this.state.isBigger ? 1.1 : 1),
      },
    };
  }
  render() {
    return (
      <div style={s.container}>
        <Motion  {...this.getSpringProps()}>
          {interpolated => {
            return (
              <img
                style={_.extend(s.img, {transform: 'scale(' + interpolated.scale + ') translate3d(-50%, -50%, 0)'})}
                ref='img'
                src={require('./Logo.svg')} />
            );
          }}
        </Motion>
      </div>
    );
  }
}

Loader.contextTypes = {
  isMobile: React.PropTypes.bool.isRequired,
};

Loader.propTypes = {
  containerClass: React.PropTypes.string,
  action: React.PropTypes.func,
};

function getStyle() {
  return {
    container: {},
    img: {
      position: 'absolute',
      width: 60,
      top: '50%',
      left: '50%',
      transform: 'translate3d(-50%,-50%, 0)',
    },
  };
};

