import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import readXlsxFile from 'read-excel-file'


export default class ExcelUpload extends Component {

    getFileExtension(name) {
        const parts = name.split('.');

        if (parts.length > 0) {
            return parts.pop();
        }

        return false;
    }

    isValidExtension(name) {
        const extension = this.getFileExtension(name);
        return extension && extension.indexOf('xlsx') >= 0;
    }

    readFile(e) {
        const { target } = e;
        let file = null;

        if (target.files && target.files.length > 0) {
            file = target.files[0];
            if (!this.isValidExtension(file.name)) {
                return;
            }
        }

        this.proccessFile(file);
    }

    proccessFile(file) {
        readXlsxFile(file).then((rows) => {
            this.props.setRows(rows);
        });
    }

    render() {
        return (
            <Form>
                <FormGroup>
                  <Label for="file">Seu arquivo {this.props.tipo} excel</Label>
                  <Input
                      type="file"
                      name="file"
                      id="file"
                      placeholder="Importar arquivo excel"
                      onChange={this.readFile.bind(this)}
                   />
                </FormGroup>
                <FormText color="muted">
                   somente formato *.xslx 
                </FormText>
            </Form>
        );
    }
}
