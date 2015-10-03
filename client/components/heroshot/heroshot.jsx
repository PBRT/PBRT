// import {mergeStyle} from 'utils-style.js';
var s = getStyle();

export default class Heroshot extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={this.context.s(s.container)}>
        <div style={s.name} className='title-negative text-center'> Pierre Beard </div>
        <div className='text-center subtitle'> Front End Developer </div>
      </div>
    );
  }
}

Heroshot.contextTypes = {
  s: React.PropTypes.func.isRequired,
};

function getStyle() {
  return {
    container: {
      height: window.innerHeight - 20,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: 'url(%link%)'.replace('%link%', require('./assets/background.jpg')),
    },
    name: {
      paddingTop: 160,
    },
  };
};

