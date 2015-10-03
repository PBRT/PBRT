import {mergeStyle} from 'utils-style.js';
var s = getStyle();

export default class Section extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {

    let styleContainer = {
      backgroundColor: this.props.backgroundColor,
      borderBottom: this.props.isLast ? 'none' : '1px solid',
      borderColor: UI.keyline,
    };

    return (
      <div style={styleContainer}>
        <div style={mergeStyle(this.context.s(s.container), {backgroundColor: this.props.backgroundColor})}>
          <div style={this.context.s(s.title)} className='title text-center'>{this.props.title}</div>
          <div style={this.context.s(s.subtitle)} className='subtitle text-center'>{this.props.subtitle}</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Section.contextTypes = {
  s: React.PropTypes.func.isRequired,
};
Section.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired,
  backgroundColor: React.PropTypes.string.isRequired,
  isLast: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    container: {
      margin: 'auto',
      maxWidth: UI.widthMobile,
      padding: '60px 15px 90px',
      tablet: {
        maxWidth: UI.widthTablet,
        padding: '80px 20px 140px',
      },
      desktop: {
        maxWidth: UI.widthDesktop,
        padding: '80px 20px 140px',
      }
    },
    title: {
      marginBottom: 10,
      tablet: {
        marginBottom: 20,
      },
      desktop: {
        marginBottom: 20,
      }
    },
    subtitle: {
      marginBottom: 60,
      tablet: {
        marginBottom: 80,
      },
      desktop: {
        marginBottom: 80,
      },
    },
  };
};

