var s = getStyle();
import Tech from './tech.jsx';

export default class ModalContainer extends React.Component{
  constructor(props) {
    super(props);
    this.renderTechs = this.renderTechs.bind(this);
  }
  renderTechs() {
    return this.props.item.techs.map((item, index) => {
      return (
        <Tech
          item={item}
          key={'m' + index}
          techsColor={this.props.item.techsColor} />
      );
    });
  }
  render() {

    let githubLink = this.props.item.gitLink ?
      (<div>
          GitHub link:&nbsp;
          <a
            className='text-blue'
            style={s.link}
            href={this.props.item.gitLink}
            target='_blank'>{this.props.item.gitLink}</a>
        </div>) : '';

    return (
      <div style={s.container}>
        <img style={s.close} src={require('./assets/close.png')} onClick={this.props.handleModal.bind(null, false)}/>
        <div style={s.title} className='body text-center'>{this.props.item.name}</div>
        <div style={s.subtitle} className='caption text-center text-grey'>{this.props.item.description}</div>
        <div style={s.sectionTitle} className='caption text-left'>Goal</div>
        <div style={s.paragraph} className='caption text-left text-grey'>{this.props.item.fullDescription}</div>
        <div style={s.sectionTitle} className='caption text-left'>Technologies</div>
        <div style={s.paragraph}>{this.renderTechs()}</div>
        <div style={s.sectionTitle} className='caption text-left'>Links</div>
        <div style={s.paragraph} className='caption text-left'>
          <div>
            Live link:&nbsp;
            <a
              className='text-blue'
              style={s.link}
              href={this.props.item.link}
              target='_blank'>{this.props.item.link}</a>
          </div>
          {githubLink}
        </div>
      </div>
    );
  }
}

ModalContainer.PropTypes = {
  item: React.PropTypes.object.isRequired,
};

function getStyle() {
  return {
    container: {
      padding: 20,
    },
    close: {
      position: 'absolute',
      top: 20,
      right: 20,
      width: 12,
      cursor: 'pointer',
    },
    title: {
      marginBottom: 10,
    },
    subtitle: {
      marginBottom: 30,
    },
    sectionTitle: {
      margin: '0px 20px 20px 0px',
      borderBottom: '1px solid',
      borderColor: UI.keyline,
    },
    paragraph: {
      marginBottom: 30,
    },
    link: {
      marginBottom: 5,
    },
  };
};

