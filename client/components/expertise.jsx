export default class Expertise extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.context);
    return (
      <div> Expertise {this.context.display}</div>
    );
  }
}

Expertise.contextTypes = {
  display: React.PropTypes.string.isRequired,
  isTouchDevice: React.PropTypes.bool.isRequired,
};

