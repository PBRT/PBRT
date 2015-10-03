var s = getStyle();
import {spring} from 'react-motion';
import {Motion} from 'react-motion';

export default class Tech extends React.Component{
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.state = {
      isHover: false
    };
  }
  getSpringProps() {
    return {
      defaultStyle: {
        opacity: 0.8,
      },
      style:{
        opacity: spring(this.state.isHover ? 1 : 0.8)
      },
    };
  }
  handleHover(active) {
    if (!this.context.isTouchDevice) {
      this.setState({isHover: active});
    }
  }
  render() {

    return (
      <Motion {...this.getSpringProps()}>
        {interpolated => {
          return (
            <a
              onMouseOver={this.handleHover.bind(null, true)}
              onMouseOut={this.handleHover.bind(null, false)}
              style={_.extend(this.context.s(s.tech), {
                backgroundColor: this.props.techsColor,
                opacity: interpolated.opacity})}
              href={this.props.item.link}
              target='_blank'>
                {this.props.item.name}
            </a>
          );
        }}
      </Motion>
    );
  }
}

function getStyle() {
  return {
    tech: {
      padding: '5px 10px',
      display: 'inline-block',
      borderRadius: 2,
      color: UI.whiteBg,
      marginRight: 5,
      marginBottom: 5,
      textDecoration: 'none',
      fontSize: 12,
    },
  };
};

Tech.propTypes = {
  item: React.PropTypes.object.isRequired,
};
Tech.contextTypes = {
  s: React.PropTypes.func.isRequired,
};
