import React from 'react';
import { Container, Header, Table, Button, Icon, Message, Dimmer, Loader, Image } from 'semantic-ui-react';
import Movies from '../assets/output.json';

export default class movie extends React.Component {
  state = { movie: {} };

  componentWillMount() {
    const { id } = this.props.match.params;
    let result;
    Movies.forEach(element => {
      if(element.codigo.replace(/"/g,'') === id)
        result = element;  
    });
    this.setState({movie:result});
  }

  render() {
    const { movie } = this.state;

    const result = (
      <Table definition style={{ width: '60%', margin: '1em auto 3em auto' }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Código</Table.Cell>
          <Table.Cell>{movie.codigo.replace(/"/g,'')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Título original</Table.Cell>
            <Table.Cell>{movie.titulo.replace(/"/g,'')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Título no Brasil</Table.Cell>
            <Table.Cell>{movie.tituloBr.replace(/"/g,'')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Ano</Table.Cell>
            <Table.Cell>{movie.ano.replace(/"/g,'')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Distribuidora</Table.Cell>
            <Table.Cell>{movie.razao.replace(/"/g,'')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    return(
      <div>
        <Container textAlign='center'>
          <Header
            as='h1'
            content={ movie.titulo.replace(/"/g,'') }
            style={{ fontSize: '4em', margin: '1em auto 0.5em auto' }}
            dividing
          />
        { result }
          <Button size='large' onClick={(e) => {
            e.preventDefault();
            this.props.history.goBack();
          }}>
            <Icon name='arrow left'/> Back
          </Button>
        </Container>
          <Loader />
      </div>
    );
  }
}
