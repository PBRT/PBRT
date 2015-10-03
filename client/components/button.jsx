var s = getStyle();

export default class Button extends React.Component{
  constructor(props) {
    super(props);
    this.hover = this.hover.bind(this);
  }
  hover(event, isHover) {
    if ((this.context.isTouchDevice && event === 'touch') ||
      (!this.context.isTouchDevice && event === 'mouse')) {

      $(React.findDOMNode(this)).velocity({
        backgroundColor: isHover ? UI.primaryLight : UI.primary
      }, {duration: UI.duration * 2});
    }
  }
  render() {
    return (
      <div
        style={s.button}
        className={this.props.containerClass}
        onMouseEnter={this.hover.bind(null, 'mouse', true)}
        onMouseLeave={this.hover.bind(null, 'mouse', false)}
        onTouchStart={this.hover.bind(null, 'touch', true)}
        onTouchEnd={this.hover.bind(null, 'touch', false)}
        onClick={this.props.action}>
        {this.props.children}
      </div>
    );
  }
}

Button.contextTypes = {
  isMobile: React.PropTypes.bool.isRequired,
};

Button.propTypes = {
  containerClass: React.PropTypes.string,
};

function getStyle() {
  return {
    button: {
      backgroundColor: UI.primary,
      borderRadius: 2,
      display: 'inline-block',
      padding: '10px 20px',
      cursor: 'pointer',
    },
  };
};

