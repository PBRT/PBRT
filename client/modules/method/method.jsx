import Section from 'section.jsx';
import Donut from 'donut.jsx';

export default class Method extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      chartData: [
        {value: 1, color: '#4D535D'},
        {value: 1, color: '#F8464A'},
        {value: 1, color: '#FEB45A'},
        {value: 1, color: '#949FB1'},
        {value: 96, color: '#45BFBD'},
      ],
      isVisible: false,
    };
    this.triggerAnimation = this.triggerAnimation.bind(this);
  }
  componentDidMount() {
    if (this.context.scrollPosition > ($(React.findDOMNode(this)).position().top)) {
      this.triggerAnimation();
    }
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    if ((prevContext.scrollPosition !== this.context.scrollPosition) && !this.state.isVisible) {
      if (this.context.scrollPosition > $(React.findDOMNode(this)).position().top) {this.triggerAnimation(); };
    }
  }
  triggerAnimation() {
    this.setState({
      chartData: [
        {label: 'Specifications', value: 15, color: '#4D535D'},
        {label: 'Technologies analysis', value: 20, color: '#F8464A'},
        {label: 'Design Review', value: 15, color: '#949FB1'},
        {label: 'Deployment and test', value: 15, color: '#FEB45A'},
        {label: 'Development', value: 30, color: '#45BFBD'},
      ],
      isVisible: true,
    });
  }
  render() {

    let chartOptions = {
      segmentShowStroke: false,
      percentageInnerCutout: 65,
      animateRotate: false,
      animationEasing: 'easeInOutExpo',
      segmentStrokeColor: UI.UIGreenPastel,
      showTooltips: true,
      responsive: true,
    };

    return (
      <div>
        <Section
          title='How I work'
          subtitle='I follow a powerful pattern I learnt from my previous experience in a agile way of thinking.'
          isLast={this.props.isLast}
          backgroundColor={UI.whiteBg}>
          <Donut
            data={this.state.chartData}
            options={chartOptions}
            width={400}/>
        </Section>
      </div>
    );
  }
}

Method.contextTypes = {
  s: React.PropTypes.func.isRequired,
  isMobile: React.PropTypes.bool.isRequired,
  isTablet: React.PropTypes.bool.isRequired,
  scrollPosition: React.PropTypes.number.isRequired,
};
Method.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
};
