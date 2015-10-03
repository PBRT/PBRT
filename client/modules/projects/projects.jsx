import Section from 'section.jsx';
import Item from './item.jsx';
var Masonry = require('react-masonry-component')(React);
import {list} from './projects.constant.js';

export default class Projects extends React.Component{
  constructor(props) {
    super(props);
    this.renderProjects = this.renderProjects.bind(this);
  }
  renderProjects() {
    return list.map((item, index) => {
      return (
        <Item
          key={index}
          isLast={(list.length -1) === index}
          imageSrc={require('./assets/' + item.imageSrc)}
          title={item.name}
          link={item.link}
          description={item.description}
          techsColor={item.techsColor}
          techs={item.techs}/>
      );
    });
  }
  render() {

    return (
      <div>
        <Section
          title='Projects'
          subtitle='I love my job. I build professional products but also working on side projects during my free time.'
          isLast={this.props.isLast}
          backgroundColor={UI.lightGrey}>
          <Masonry className={'row'}>
            {this.renderProjects()}
          </Masonry>
        </Section>
      </div>
    );
  }
}

Projects.propTypes = {
  isLast: React.PropTypes.bool.isRequired,
};
