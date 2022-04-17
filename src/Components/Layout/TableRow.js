import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Button, FormGroup } from 'reactstrap';
import { Container, Col, Row } from 'reactstrap';
import { Offline, Online } from "react-detect-offline";
import SearchInput, { createFilter } from 'react-search-input'

export default class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Sincronizar meu dados',
      searchTerm: '',
      keyterms: [],
      exportchk: [],
      chkbox: false,
      chkboxSelect: null
    }
    this.searchUpdated = this.searchUpdated.bind(this)
    this.handleCheckBox = this.handleCheckBox.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ text: 'Sincronizar meus dados' });
    }
  }

  //handle click checkbox
  handleCheckBox = (event) => {
    const { id, checked } = event.target;
    const { exportchk } = this.state;
    const index = exportchk.indexOf(id);
    if (checked) {
      if (index === -1) {
        this.setState({ exportchk: [...exportchk, id] });
      }
    } else {
      if (index > -1) {
        exportchk.splice(index, 1);
        this.setState({ exportchk: exportchk });
      }
    }
  }

  backgroundList = (id) => {
    if (this.state.chkboxSelect === id) {
      return { backgroundColor: 'gray', color: 'white' }
    } else {
      return { backgroundColor: 'white', color: 'black' }
    }
  }


  mountTableHeaders(rows) {
    if (rows.length > 0) {
      const head = [<th style={{ width: '10px' }}></th>, ...rows[0].map((row, i) => <th key={i}>{row}</th>)]
      return head
    }
  }

  mountTableBody(rows) {
    let body = [];
    for (var i = 1; i < rows.length; i++) {
      body.push(
        <tr key={rows.length + i}>
          <td key={i}>
            <input id={rows}
              type={"checkbox"}
              defaultChecked={this.state.chkbox}
              onChange={this.handleCheckBox}
            />
          </td>
          {this.innerTableContent(rows[i])}
        </tr>
      );
    }

    return body;
  }

  innerTableContent(rows) {
    return rows.map((row, i) => (
      <td style={{ ...this.backgroundList(row), cursor: 'pointer' }}
        key={rows.length + i}
        onClick={() => {
          if (!this.props.disabledSelect) {
            if(this.props.rowSelect === row){
              this.props.setRowSelect(null);
              this.setState({ chkboxSelect: null});
            }else{
              console.log('mudouuuuuuuu', row)
              this.setState({ chkboxSelect: row});
              this.props.setRowSelect(row);
            }
          }


        }}>
        {row}
      </td>
    ))
  }

  syncData() {
    this.setState({ text: 'Dados  sincronizados cm sucesso!!! ' });
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  renderButtons() {
    const { text } = this.state;

    return (

      <FormGroup
        key='render-buttons-form-group'
      >

        <Col>
          <Button
            color="primary"
            onClick={this.props.clearData}
          >
            Limpar tabela
          </Button>

          {/*
          <Online >
          <Button
          color="success"
          style={{marginLeft: 10}}
          onClick={this.syncData.bind(this)}
          >
          {text}
          </Button>
          </Online>
        */}
        </Col>
        <Col>
          <Offline>
            Você deve estar online para sincronizar seus dados! Ative sua conexão com a internet.
          </Offline>
        </Col>
      </FormGroup>

    );
  }

  render() {
    const { rows,  rowSelect, disabledSelect } = this.props;
    const { keyterms, searchTerm } = this.state;

    var filtered = rows.filter(createFilter(searchTerm.toString()))
    if (disabledSelect) {
      if (rowSelect !== null) {
        filtered = [rows[0], ...rows.filter(createFilter(rowSelect.toString()))]
        console.log('row select<<<<<<<<<<', rowSelect.toString())
      }
    }
    if (filtered.length > 0) {
      return (
        <Container>

          <Row>
            <SearchInput className="search-input" onChange={this.searchUpdated} />
          </Row>
          <br />
          <Row>

            {this.renderButtons()}
          </Row>
          <Table
            hover
            responsive
          >
            <thead>
              <tr>
                {this.mountTableHeaders(filtered)}
              </tr>
            </thead>
            <tbody>
              {this.mountTableBody(filtered)}
            </tbody>
          </Table>
        </Container>
      );
    } else {
      return <Container>
        <Row>
          <SearchInput className="search-input" onChange={this.searchUpdated} />
        </Row>
      </Container>
    }

    return null;
  }
}
