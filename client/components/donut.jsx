import Chart from 'chart.js/Chart';
var s = getStyle();

export default class Donut extends React.Component{
  constructor(props) {
    super(props);
    this.renderLegend = this.renderLegend.bind(this);
  }
  componentDidMount() {
    /* eslint-disable no-undef */
    this.chart = new Chart($(React.findDOMNode(this.refs.canvas)).get(0).getContext('2d')).Doughnut(
      this.props.data, this.props.options);
    this.chart.generateLegend();
    /* eslint-enable no-undef */
  }
  renderLegend() {
    return this.props.data.map((item, index) => {
      return (
        <div
          key={index}
          style={_.extend(this.context.s(s.legendItem), {paddingBottom:
            (index === this.props.data.length -1) ? 0 : 20})
          }>
          <div style={_.extend(this.context.s(s.legendBox),{backgroundColor: item.color})}></div>
          <div
            style={this.context.s(s.legendTitle)}
            className='body'>{item.label}</div>
        </div>
      );
    });
  }
  componentDidUpdate() {
    this.chart.segments[0].value = this.props.data[0].value;
    this.chart.segments[1].value = this.props.data[1].value;
    this.chart.segments[2].value = this.props.data[2].value;
    this.chart.segments[3].value = this.props.data[3].value;
    this.chart.segments[4].value = this.props.data[4].value;
    this.chart.update();
  }
  render() {
    return (
      <div>
        <div style={this.context.s(s.donutContainer)}>
          <canvas ref='canvas' width={this.props.width} height={this.props.width * 0.5}></canvas>
        </div>
        <div style={this.context.s(s.container)}>
          {this.renderLegend()}
        </div>
      </div>
    );

  }
}

function getStyle() {
  return {
    container: {
      marginTop: 30,
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '100%',
      tablet: {
        width: '40%',
        marginTop: 0,
      },
      desktop: {
        width: '40%',
        marginTop: 0,
      },
    },
    donutContainer: {
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '100%',
      tablet: {
        width: '60%',
      },
      desktop: {
        width: '60%',
      },
    },
    legendBox: {
      width: 30,
      height: 10,
      display: 'table-cell',
      verticalAlign: 'middle',
      tablet: {
        width: 50,
        height: 30,
      },
      desktop: {
        width: 50,
        height: 30,
      },
    },
    legendTitle: {
      display: 'table-cell',
      verticalAlign: 'middle',
      paddingLeft: 30,
    },
    legendItem: {
      display: 'block',
      padding: '0px 0px 20px 20px',
    },
  };
};

Donut.displayName = 'Donut';

Donut.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  data: React.PropTypes.array,
  options: React.PropTypes.object,
};

Donut.contextTypes = {
  s: React.PropTypes.func.isRequired,
};

