import React, { Component } from 'react';
import Header from '../Components/Layout/Header';
import TableRow from '../Components/Layout/TableRow';

import ExcelUpload from '../Components/Form/ExcelUpload';

import { Container, Row, Col } from 'reactstrap';


export default class Class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            base: [],
            dePara: [],
            orcamento: [],
            rowSelect: null
        };
        this.setRowSelect = this.setRowSelect.bind(this);
        this.setRows = this.setRows.bind(this);
        this.setBase = this.setBase.bind(this);
        this.setdePara = this.setdePara.bind(this);
        this.setOrcamento = this.setOrcamento.bind(this);
        this.clearData = this.clearData.bind(this);
        this.clearDataBase = this.clearDataBase.bind(this);
        this.clearDataOrcamento = this.clearDataOrcamento.bind(this);
        this.clearDatadePara = this.clearDatadePara.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('tableRows')) {
            this.setState({ rows: JSON.parse(localStorage.getItem('tableRows')) });
        }
        if (localStorage.getItem('tableBase')) {
            this.setState({ rows: JSON.parse(localStorage.getItem('tableBase')) });
        }
        if (localStorage.getItem('tabledePara')) {
            this.setState({ rows: JSON.parse(localStorage.getItem('tabledePara')) });
        }
        if (localStorage.getItem('tableOrcamento')) {
            this.setState({ rows: JSON.parse(localStorage.getItem('tableOrcamento')) });
        }

    }
    setRowSelect(row) {
        this.setState({ rowSelect: row });
    }
    clearData() {
        localStorage.clear();
        this.setState({
            rows: [],

        });
    }

    clearDataBase() {
        localStorage.clear();
        this.setState({
            base: [],

        });
    }

    clearDataOrcamento() {
        localStorage.clear();
        this.setState({
            orcamento: []
        });
    }

    clearDatadePara() {
        localStorage.clear();
        this.setState({
            dePara: [],

        });
    }

    setRows(rows) {
        localStorage.setItem('tableRows', JSON.stringify(rows));
        this.setState({ rows });
    }
    setBase(base) {
        localStorage.setItem('tableBase', JSON.stringify(base));
        this.setState({ base });
    }
    setdePara(dePara) {
        localStorage.setItem('tabledePara', JSON.stringify(dePara));
        this.setState({ dePara });
    }
    setOrcamento(orcamento) {
        localStorage.setItem('tableOrcamento', JSON.stringify(orcamento));
        this.setState({ orcamento });
    }

    render() {
        const { rows, base, orcamento, dePara } = this.state;
        return (
            <div>
                <div className="App">
                    <Header />
                </div>
                <Container className="mg-tp-5-percent">
                    <Row>
                      
                        <Col xs="4" sm="4" md="4" lg="4" xl="4">
                            <ExcelUpload
                                tipo="orçamento"
                                setRows={this.setOrcamento}
                            />
                        </Col>
                        <Col xs="4" sm="4" md="4" lg="4" xl="4">
                            <ExcelUpload
                                tipo="base"
                                setRows={this.setBase}
                            />
                        </Col>
                        <Col xs="4" sm="4" md="4" lg="4" xl="4">

                            <ExcelUpload
                                tipo="dePara"
                                setRows={this.setdePara}
                            />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                    <Col xs="4" sm="4" md="4" lg="4" xl="4">
                            <TableRow
                                rows={orcamento}
                                disabledSelect={false}
                                clearData={this.clearDataOrcamento}
                                rowSelect={this.state.rowSelect}
                                setRowSelect={this.setRowSelect}
                            />
                        </Col>
                        <Col xs="8" sm="8" md="8" lg="8" xl="8">
                            <TableRow
                                rows={base}                               
                                rowSelect={this.state.rowSelect}
                                setRowSelect={this.setRowSelect}
                                disabledSelect={true}
                                clearData={this.clearDataBase}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
