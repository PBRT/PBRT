var s = getStyle();

export default class Footer extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className='row no-margin' style={this.context.s(s.footer)}>
        <div className='col-xs-6 no-padding'>
          <div className='body text-white'>Pierre Beard</div>
          <div className='body text-white'>2015 London</div>
        </div>
        <div className='col-xs-6 no-padding text-right'>
          <div className='body text-white'>Pierre Beard</div>
          <div className='body text-white'>2015 London</div>
        </div>
      </div>
    );
  }
}

Footer.contextTypes = {
  s: React.PropTypes.func.isRequired,
};

function getStyle() {
  return {
    footer: {
      backgroundColor: UI.darkBlue,
      padding: '80px 20px 30px',
    },
  };
};
