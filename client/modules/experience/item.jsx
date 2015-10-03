var s = getStyle();

export default class Item extends React.Component{
  constructor(props) {
    super(props);
    this.getContainerClass = this.getContainerClass.bind(this);
    this.getContainerStyle = this.getContainerStyle.bind(this);
  }
  getContainerClass() {
    return this.props.isLeft ?
      'col-sm-6 col-xs-12 text-right no-margin' :
      'col-sm-6 col-sm-offset-6 col-xs-12 text-left no-margin';
  }
  getContainerStyle() {
    return _.extend(this.context.s(s.container), {
      marginBottom: this.props.isLast ? 0 : 100,
      padding: this.props.isLeft ? '0px 40px 0px 0px' : '0px 0px 0px 40px'
    });
  }
  render() {

    return (
      <div className='row no-margin'>
        <div className={this.getContainerClass()} style={this.getContainerStyle()}>
          <div style={this.context.s(s.title)}>
            {this.props.title}
          </div>
          <div style={this.context.s(s.subtitle)}>
            {this.props.subtitle}
          </div>
        </div>
      </div>
    );
  }
}

Item.contextTypes = {
  s: React.PropTypes.func.isRequired,
};
Item.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
  isLeft: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    container: {},
    title: {
      fontSize: 20,
    },
    subtitle: {
      color: 'red',
    },
  };
};
