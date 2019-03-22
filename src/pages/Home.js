import React from 'react';
import { Container, Image, Header, Form, Input, Button, Segment, Pagination, Dimmer, Loader, Message } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import yodaImg from '../assets/yoda.png';
import './Home.css';
import Movies from '../assets/output.json';

const searchInputStyle =  { width: '50%', marginRight: '1em' };

const PAGE_QUANTITY = 10;

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questionInput: '',
      questionSearch: '',
      results: null,
      pages: 0,
      activePage: 0,
      loading: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { questionInput } = this.state;
    this.setState({loading:false});
    const result = Movies.map((element,index) => {
      if(element.tituloBr.indexOf(questionInput.toUpperCase()) != -1)
        return element;
      return null;
    });
    let pages = Math.ceil(result.length / PAGE_QUANTITY);
    this.setState({
      activePage: 1,
      pages: pages,
      results: result,
      questionSearch: questionInput,
      loading: false,
    });
  }

  handlePaginationChange = (e, { activePage }) => {
    const { questionSearch,results } = this.state;

    this.setState({ activePage });
  }

  handleInputChange = (e, {name}) => {
    this.setState({ [name]: e.target.value });
  }
  render() {
    const { questionInput, pages, activePage, results, loading } = this.state;

    const pagination = (<Pagination
      activePage={activePage}
      onPageChange={this.handlePaginationChange}
      totalPages={pages}
    />);

    const resultItems = !!results && results.map((r,index) => {
      if(r != null && index > (PAGE_QUANTITY * (this.state.activePage - 1))&& index < (PAGE_QUANTITY * this.state.activePage)){
        let id = r.codigo;
        return <Segment vertical key={r.tituloBr.replace(/"/g,'')}><Link to={`/movie/${id.replace(/"/g,'')}`}>{r.tituloBr.replace(/"/g,'')}</Link></Segment>;
      }
    });

    const resultsSection = (
      <Segment stacked style={{ marginBottom: '2em' }}>
        <Message
          negative
          hidden={pages !== 0}
          header='Pesquisa não retornou nenhum resultado'
        />
        <Container textAlign='left'>
          {resultItems}
        </Container>
        { pages !== 0 ? pagination : '' }
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
      </Segment>
    );

    return(
      <div className='home'>
        <Container textAlign='center'>
          <Image
            src={yodaImg}
            size='medium'
            className='image'
          />
          <p style={{ fontSize: '1.5em' }}>Filmes exibidos no Brasil</p>

          <Form>
            <Input
              name='questionInput'
              value={questionInput}
              placeholder='Título do filme'
              size='big'
              style={searchInputStyle}
              onChange={this.handleInputChange}
            />
            <Button type='submit' size='big' onClick={this.handleSubmit}>Pesquisar</Button>
            { results !== null || loading === true ? resultsSection : '' }
          </Form>
        </Container>
      </div>
    );
  }
}
