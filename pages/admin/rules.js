import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { grayscale } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

function Rules() {

  const classes = useStyles();

  return (
    <>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Exclusividade da hierarquia de conflitos.</h4>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>

            </GridItem>
            <GridItem xs={12} sm={12} md={4}>

            </GridItem>
            <GridItem xs={12} sm={12} md={4}>

            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>

            </GridItem>
            <GridItem xs={12} sm={12} md={4}>

            </GridItem>
            <GridItem xs={12} sm={12} md={4}>

            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>

      <Card>
        <CardHeader color="success">
          <h4 className={classes.cardTitleWhite}>Qualquer chefe militar obedece no mínimo a um líder político.</h4>
        </CardHeader>
        <CardBody>
          <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "18px", lineHight: "2" }}>
            {
              'ALTER TABLE chefe_militar\n' +
              'ALTER COLUMN cod_grupo_lider\n' +
              'SET NOT NULL;\n\n' +
              'ALTER TABLE chefe_militar\n' +
              'ALTER COLUMN nome_lider\n' +
              'SET NOT NULL;'
            }
          </SyntaxHighlighter>
        </CardBody>
      </Card>

      <Card>
        <CardHeader color="dark">
          <h4 className={classes.cardTitleWhite}>Uma divisão é dirigida pelo menos por um chefe militar.</h4>
        </CardHeader>
        <CardBody>

        </CardBody>
      </Card>

      <Card>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>Uma divisão é dirigida por três chefes militares como máximo.</h4>
        </CardHeader>
        <CardBody>

        </CardBody>
      </Card>

      <Card>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>Todo grupo armado dispõe de no mínimo uma divisão.</h4>
        </CardHeader>
        <CardBody>

        </CardBody>
      </Card>

      <Card>
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Em um conflito armado participam como mínimo dois grupos armados.</h4>
        </CardHeader>
        <CardBody>

        </CardBody>
      </Card>

      <Card>
        <CardHeader color="rose">
          <h4 className={classes.cardTitleWhite}>Qualquer conflito afeta pelo menos um país.</h4>
        </CardHeader>
        <CardBody>

        </CardBody>
      </Card>

      <Card>
        <CardHeader color="dark">
          <h4 className={classes.cardTitleWhite}>
            Com um disparador (trigger), procedimento armazenado o dentro do código dos programas você deveria:
          </h4>
          <p className={classes.cardCategoryWhite}>
            Manter a consistência das baixas totais em cada grupo armado, a partir das baixas produzidas nas suas divisões <br />
            Gerar e assegurar a sequencialidade do número de divisão dentro do grupo armado.
          </p>
        </CardHeader>
        <CardBody>

        </CardBody>
      </Card>
    </>
  )
}

Rules.layout = Admin;

export default Rules;