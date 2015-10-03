import Section from 'section.jsx';
import Button from 'button.jsx';
import Item from './item.jsx';
import {items} from './expertise.constant.js';
var s = getStyle();

export default class Expertise extends React.Component{
  constructor(props) {
    super(props);
    this.renderItems = this.renderItems.bind(this);
  }
  renderItems() {
    return items.map((item, index) => {
      return (
        <Item
          key={index}
          position={index}
          imageSrc={item.imageSrc}
          title={item.title}
          subtitle={item.subtitle} />
      );
    });
  }
  render() {

    return (
      <div>
        <Section
          title='Expertise'
          subtitle='I’m doing complex web application, static website and mobile projects'
          isLast={this.props.isLast}
          backgroundColor={UI.whiteBg}>
          <div style={this.context.s(s.itemsContainer)}>
            {this.renderItems()}
          </div>
          <div className='row text-center'>
            <Button>
              <span className='text-negative text-center headline' style={s.button}>Resume</span>
            </Button>
          </div>
        </Section>
      </div>
    );
  }
}

Expertise.contextTypes = {
  s: React.PropTypes.func.isRequired,
};
Expertise.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
};

function getStyle() {
  return {
    itemsContainer: {
      display: 'block',
      tablet: {
        display: 'table',
        marginBottom: 80,
      },
      desktop: {
        display: 'table',
        marginBottom: 80,
      },
    },
    button: {
      padding: '0 20px',
    },
  };
};
