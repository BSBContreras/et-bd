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

import CustomTabs from "components/CustomTabs/CustomTabs.js";

import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import TableChartIcon from '@material-ui/icons/TableChart';

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

      <CustomTabs
        title="Exclusividade da hierarquia de conflitos"
        headerColor="primary"
        tabs={[
          {
            tabName: "UPDATE",
            tabIcon: TableChartIcon,
            tabContent: (
              <>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "14px", lineHight: "2" }}>
                      {
                        'CREATE OR REPLACE RULE territorial_restrito_update AS\n' +
                        'ON UPDATE TO territorial\n' +
                        'WHERE (SELECT count(*)\n' +
                        '  FROM religioso\n' +
                        '  WHERE religioso.cod_conflito = NEW.cod_conflito) > 0\n' +
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM racial\n' +
                        '  WHERE racial.cod_conflito = NEW.cod_conflito) > 0'+
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM economico\n' +
                        '  WHERE economico.cod_conflito = NEW.cod_conflito) > 0\n' +
                        'DO INSTEAD NOTHING;'
                      }
                    </SyntaxHighlighter>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "14px", lineHight: "2" }}>
                        {
                          'CREATE OR REPLACE RULE racial_restrito_update AS \n' +
                          'ON UPDATE TO racial\n' +
                          'WHERE (SELECT count(*)\n' +
                          '  FROM religioso\n' +
                          '  WHERE religioso.cod_conflito = NEW.cod_conflito) > 0\n' +
                          '  OR\n' +
                          ' (SELECT count(*)\n' +
                          '  FROM territorial\n' +
                          '  WHERE territorial.cod_conflito = NEW.cod_conflito) > 0'+
                          '  OR\n' +
                          ' (SELECT count(*)\n' +
                          '  FROM economico\n' +
                          '  WHERE economico.cod_conflito = NEW.cod_conflito) > 0\n' +
                          'DO INSTEAD NOTHING;'
                        }
                      </SyntaxHighlighter>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "14px", lineHight: "2" }}>
                      {
                        'CREATE OR REPLACE RULE religioso_restrito_update AS \n' +
                        'ON UPDATE TO religioso\n' +
                        'WHERE (SELECT count(*)\n' +
                        '  FFROM racial\n' +
                        '  WHERE racial.cod_conflito = NEW.cod_conflito) > 0\n' +
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM territorial\n' +
                        '  WHERE territorial.cod_conflito = NEW.cod_conflito) > 0'+
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM economico\n' +
                        '  WHERE economico.cod_conflito = NEW.cod_conflito) > 0\n' +
                        'DO INSTEAD NOTHING;'
                      }
                    </SyntaxHighlighter>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "14px", lineHight: "2" }}>
                      {
                        'CREATE OR REPLACE RULE economico_restrito_update AS\n' +
                        'ON UPDATE TO economico\n' +
                        'WHERE (SELECT count(*)\n' +
                        '  FFROM racial\n' +
                        '  WHERE racial.cod_conflito = NEW.cod_conflito) > 0\n' +
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM territorial\n' +
                        '  WHERE territorial.cod_conflito = NEW.cod_conflito) > 0'+
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM religioso\n' +
                        '  WHERE religioso.cod_conflito = NEW.cod_conflito) > 0\n' +
                        'DO INSTEAD NOTHING;'
                      }
                    </SyntaxHighlighter>
                  </GridItem>
                </GridContainer>
              </>
            ),
          },
          {
            tabName: "INSERT",
            tabIcon: AddToQueueIcon,
            tabContent: (
              <>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "14px", lineHight: "2" }}>
                      {
                        'CREATE OR REPLACE RULE territorial_restrito_insert AS\n' +
                        'ON INSERT TO territorial\n' +
                        'WHERE (SELECT count(*)\n' +
                        '  FROM religioso\n' +
                        '  WHERE religioso.cod_conflito = NEW.cod_conflito) > 0\n' +
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM racial\n' +
                        '  WHERE racial.cod_conflito = NEW.cod_conflito) > 0'+
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM economico\n' +
                        '  WHERE economico.cod_conflito = NEW.cod_conflito) > 0\n' +
                        'DO INSTEAD NOTHING;'
                      }
                    </SyntaxHighlighter>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "14px", lineHight: "2" }}>
                        {
                          'CREATE OR REPLACE RULE racial_restrito_insert AS \n' +
                          'ON INSERT TO racial\n' +
                          'WHERE (SELECT count(*)\n' +
                          '  FROM religioso\n' +
                          '  WHERE religioso.cod_conflito = NEW.cod_conflito) > 0\n' +
                          '  OR\n' +
                          ' (SELECT count(*)\n' +
                          '  FROM territorial\n' +
                          '  WHERE territorial.cod_conflito = NEW.cod_conflito) > 0'+
                          '  OR\n' +
                          ' (SELECT count(*)\n' +
                          '  FROM economico\n' +
                          '  WHERE economico.cod_conflito = NEW.cod_conflito) > 0\n' +
                          'DO INSTEAD NOTHING;'
                        }
                      </SyntaxHighlighter>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "14px", lineHight: "2" }}>
                      {
                        'CREATE OR REPLACE RULE religioso_restrito_insert AS \n' +
                        'ON INSERT TO religioso\n' +
                        'WHERE (SELECT count(*)\n' +
                        '  FFROM racial\n' +
                        '  WHERE racial.cod_conflito = NEW.cod_conflito) > 0\n' +
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM territorial\n' +
                        '  WHERE territorial.cod_conflito = NEW.cod_conflito) > 0'+
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM economico\n' +
                        '  WHERE economico.cod_conflito = NEW.cod_conflito) > 0\n' +
                        'DO INSTEAD NOTHING;'
                      }
                    </SyntaxHighlighter>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "14px", lineHight: "2" }}>
                      {
                        'CREATE OR REPLACE RULE economico_restrito_insert AS\n' +
                        'ON INSERT TO economico\n' +
                        'WHERE (SELECT count(*)\n' +
                        '  FFROM racial\n' +
                        '  WHERE racial.cod_conflito = NEW.cod_conflito) > 0\n' +
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM territorial\n' +
                        '  WHERE territorial.cod_conflito = NEW.cod_conflito) > 0'+
                        '  OR\n' +
                        ' (SELECT count(*)\n' +
                        '  FROM religioso\n' +
                        '  WHERE religioso.cod_conflito = NEW.cod_conflito) > 0\n' +
                        'DO INSTEAD NOTHING;'
                      }
                    </SyntaxHighlighter>
                  </GridItem>
                </GridContainer>
              </>
            ),
          },
        ]}
      />

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
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>Uma divisão é dirigida pelo menos por um chefe militar.</h4>
          <h4 className={classes.cardTitleWhite}>Uma divisão é dirigida por três chefes militares como máximo.</h4>
        </CardHeader>
        <CardBody>
          <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "18px", lineHight: "2" }}>
              {
                '-- Uma divisão é dirigida por três chefes militares como máximo.\n' + 
                'CREATE OR REPLACE RULE chefemilitar_lider_insert AS \n' +
                'ON INSERT TO chefe_militar\n' +
                'WHERE (SELECT count(*) FROM chefe_militar WHERE num_divisao = NEW.num_divisao) >= 3\n' +
                'DO INSTEAD NOTHING; \n\n' +
                '-- Uma divisão é dirigida pelo menos por um chefe militar.\n' +
                'CREATE OR REPLACE RULE chefemilitar_lider_delete AS \n' +
                'ON DELETE TO chefe_militar\n' +
                'WHERE (SELECT count(*) FROM chefe_militar WHERE num_divisao = OLD.num_divisao) <= 1 \n' +
                'DO INSTEAD NOTHING; \n\n' +
                '-- Uma divisão é dirigida por três chefes militares como máximo.\n' +
                '-- Uma divisão é dirigida pelo menos por um chefe militar.\n' +
                'CREATE OR REPLACE RULE chefemilitar_lider_update AS \n' +
                'ON UPDATE TO chefe_militar\n' +
                'WHERE (SELECT count(*) FROM chefe_militar WHERE num_divisao = OLD.num_divisao) <= 1  \n' +
                'OR (SELECT count(*) FROM chefe_militar WHERE num_divisao = NEW.num_divisao) >= 3\n' +
                'DO INSTEAD NOTHING;'
              }
            </SyntaxHighlighter>
        </CardBody>
      </Card>

      <Card>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>Todo grupo armado dispõe de no mínimo uma divisão.</h4>
        </CardHeader>
        <CardBody>
          <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "18px", lineHight: "2" }}>
            {
              '-- Todo grupo armado dispõe de no mínimo uma divisão.\n' +
              'CREATE OR REPLACE RULE grupoarmado_divisao_delete AS \n' +
              'ON DELETE TO divisao\n' +
              'WHERE (SELECT count(*) FROM divisao WHERE cod_grupo = OLD.cod_grupo) <= 1 \n' +
              'DO INSTEAD NOTHING; \n\n' +
              '-- Todo grupo armado dispõe de no mínimo uma divisão.\n' +
              'CREATE OR REPLACE RULE grupoarmado_divisao_update AS \n' +
              'ON UPDATE TO divisao\n' +
              'WHERE (SELECT count(*) FROM divisao WHERE cod_grupo = OLD.cod_grupo) <= 1 \n' +
              'DO INSTEAD NOTHING;'
            }
          </SyntaxHighlighter>
        </CardBody>
      </Card>

      <Card>
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Em um conflito armado participam como mínimo dois grupos armados.</h4>
        </CardHeader>
        <CardBody>
          <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "18px", lineHight: "2" }}>
              {
                '-- Em um conflito armado participam como mínimo dois grupos armados.\n' +
                'CREATE OR REPLACE RULE participam_grupoarmado_delete AS \n' +
                'ON DELETE TO participam\n' +
                'WHERE (SELECT count(*) FROM participam\n' +
                '  WHERE cod_conflito = OLD.cod_conflito AND data_saida IS null) <= 2 AND OLD.data_saida IS null\n' +
                'DO INSTEAD NOTHING; \n\n' +
                '-- Em um conflito armado participam como mínimo dois grupos armados.\n' +
                'CREATE OR REPLACE RULE participam_grupoarmado_update AS \n' +
                'ON UPDATE TO participam\n' +
                'WHERE (SELECT count(*) FROM participam\n' +
                '  WHERE cod_conflito = OLD.cod_conflito AND data_saida IS null) <= 2 AND OLD.data_saida IS null\n' +
                'DO INSTEAD NOTHING;'
              }
            </SyntaxHighlighter>
        </CardBody>
      </Card>

      <Card>
        <CardHeader color="rose">
          <h4 className={classes.cardTitleWhite}>Qualquer conflito afeta pelo menos um país.</h4>
        </CardHeader>
        <CardBody>
          <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "18px", lineHight: "2" }}>
            {
              '-- Qualquer conflito afeta pelo menos um país.\n' +
              'CREATE OR REPLACE RULE pais_conflito_delete AS \n' +
              'ON DELETE TO pais_conflito\n' +
              'WHERE (SELECT count(*) FROM pais_conflito WHERE cod_conflito = OLD.cod_conflito) <= 1 \n' +
              'DO INSTEAD NOTHING;\n\n' +
              '-- Qualquer conflito afeta pelo menos um país.\n' +
              'CREATE OR REPLACE RULE pais_conflito_update AS \n' +
              'ON UPDATE TO pais_conflito\n' +
              'WHERE (SELECT count(*) FROM pais_conflito WHERE cod_conflito = OLD.cod_conflito) <= 1 \n' +
              'DO INSTEAD NOTHING;'
            }
          </SyntaxHighlighter>
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
          <SyntaxHighlighter language="sql" style={grayscale} customStyle={{ fontSize: "18px", lineHight: "2" }}>
            {
              '--------------------- BAIXAS ATUAL ---------------------\n' +
              '-- FUNCAO --\n' +
              'CREATE OR REPLACE FUNCTION baixas_grupo_atual()\n' +
              'RETURNS TRIGGER AS $$\n' +
              'DECLARE\n' +
              '  total INTEGER := SUM(num_baixas) FROM divisao WHERE cod_grupo = NEW.cod_grupo;\n' +
              'BEGIN\n' +
              `RAISE NOTICE 'INICIO baixas_grupo_atual() OPERACAO: % ', TG_OP;\n` +
              `RAISE NOTICE 'OLD?: % ', OLD.cod_grupo;\n` +
              `RAISE NOTICE 'GRUPO % ',  NEW.cod_grupo;\n` +
              `RAISE NOTICE 'BAIXAS DA DIVISAO: % ', NEW.num_baixas;\n` +
              `RAISE NOTICE 'TOTAL DE BAIXAS %' , total;\n` +
              '-- ATUALIZA BAIXAS DO GRUPO NOVO\n' +
              'UPDATE grupo_armado\n' +
              'SET num_baixas = total\n' +
              'WHERE cod_grupo = NEW.cod_grupo;\n' +
              '-- FIM\n' +
              'return NEW;\n' +
              'END\n' +
              '$$ LANGUAGE plpgsql;\n\n' +
              '-- TRIGGER --\n' +
              'CREATE TRIGGER update_baixas_atual\n' +
              'AFTER INSERT OR UPDATE\n' +
              'ON divisao\n' +
              'FOR EACH ROW\n' +
              'EXECUTE PROCEDURE baixas_grupo_atual();\n\n' +
              '--------------------- BAIXAS ANTIGO --------------------- \n' +
              '-- FUNCAO --\n' +
              'CREATE OR REPLACE FUNCTION baixas_grupo_antigo()\n' +
              'RETURNS TRIGGER AS $$\n' +
              'DECLARE\n' +
              '  total_baixas_old INTEGER := SUM(num_baixas) FROM divisao WHERE cod_grupo = OLD.cod_grupo;\n' +
              'BEGIN\n' +
              `RAISE NOTICE 'INICIO baixas_grupo_antigo() OPERACAO: % ', TG_OP;\n` +
              `RAISE NOTICE 'GRUPO OLD: % ', OLD.cod_grupo;\n` +
              `RAISE NOTICE 'GRUPO NEW?: % ',  NEW.cod_grupo;\n` +
              `RAISE NOTICE 'Total OLD: % ', total_baixas_old ;\n` +
              '--ATUALIZA BAIXAS DO GRUPO ANTIGO\n' +
              'UPDATE grupo_armado\n' +
              'SET num_baixas = total_baixas_old\n' +
              'WHERE cod_grupo = OLD.cod_grupo;\n' +
              '-- FIM --\n' +
              'return NEW;\n' +
              'END\n' +
              '$$ LANGUAGE plpgsql;\n\n' +
              '-- TRIGGER --\n' +
              'CREATE TRIGGER update_baixas_antigo\n' +
              'AFTER UPDATE OR DELETE\n' +
              'ON divisao\n' +
              'FOR EACH ROW\n' +
              'EXECUTE PROCEDURE baixas_grupo_antigo();\n\n' +
              '--------------------- NUM DIV ---------------------\n' +
              '-- FUNCAO --\n' +
              'CREATE OR REPLACE FUNCTION set_num_div_func()\n' +
              'RETURNS TRIGGER AS $$\n' +
              'DECLARE\n' +
              '  max_num_div INTEGER := MAX(num_divisao) FROM divisao WHERE cod_grupo = NEW.cod_grupo;\n' +
              'BEGIN\n' +
              `RAISE NOTICE 'INICIO set_num_div() OPERACAO: % ', TG_OP;\n` +
              `RAISE NOTICE 'NEW GRUPO: % ', NEW.cod_grupo;\n` +
              `RAISE NOTICE 'OLD GRUPO?: % ', OLD.cod_grupo;\n` +
              `RAISE NOTICE 'MAX DA DIVISAO: % ', max_num_div;\n` +
              '-- ATUALIZA BAIXAS DO GRUPO NOVO --\n' +
              'IF max_num_div IS NULL \n' +
              '  THEN\n' +
              `    RAISE NOTICE 'NEW = 1';\n` +
              '    NEW.num_divisao = 1;\n' +
              '  ELSE \n' +
              `    RAISE NOTICE 'NEW = MAX + 1;\n` +
              '    NEW.num_divisao = max_num_div + 1;\n' +
              'END IF;\n' +
              
              '-- FIM --\n' +
              'return NEW;\n' +
              'END\n' +
              '$$ LANGUAGE plpgsql;\n\n' +
              '-- TRIGGER --\n' +
              'CREATE TRIGGER set_num_div\n' +
              'BEFORE INSERT OR UPDATE\n' +
              'ON divisao\n' +
              'FOR EACH ROW\n' +
              'EXECUTE PROCEDURE set_num_div_func();\n'
            }
          </SyntaxHighlighter>
        </CardBody>
      </Card>
    </>
  )
}

Rules.layout = Admin;

export default Rules;