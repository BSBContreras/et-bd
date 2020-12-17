import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ChartistGraph from "react-chartist";

import Admin from "layouts/Admin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import SportsKabaddi from "@material-ui/icons/SportsKabaddi";
import Domain from "@material-ui/icons/Domain";
import LocationSearching from "@material-ui/icons/LocationSearching";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

import histogramConfig from 'variables/histogram'
import { url } from 'variables/fetch'

const useStyles = makeStyles(styles);

function toStringArray(arr) {
  return Object.values(arr).map(value => String(value))
}

export const getServerSideProps = async () => {
  let res = await fetch(`${url}/histograma`)
  let data = await res.json()

  const histogramData = {
    labels: data.tipos.map((label, i) => (`${label} (${data.valores[i]})`)),
    series: [data.valores]
  }

  res = await fetch(`${url}/top/conflito`)
  data = await res.json()

  const topConflitos = data.map(toStringArray)

  res = await fetch(`${url}/top/organizacao`)
  data = await res.json()

  const topOrganizacoes = data.map(toStringArray)

  res = await fetch(`${url}/top/grupo_armado`)
  data = await res.json()

  const topGruposArmados = data.map(toStringArray)

  res = await fetch(`${url}/traficante_grupoarmado`)
  data = await res.json()

  const traficante = data.map(toStringArray)

  return {
    props: {
      histogramData,
      topConflitos,
      topOrganizacoes,
      topGruposArmados,
      traficante
    }
  }
}

function Statistics({ histogramData, topConflitos, topOrganizacoes, topGruposArmados, traficante }) {

  const classes = useStyles();
  
  return (
    <>
      <Card chart>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>
            Histrograma: Tipos de Conflito
          </h4>
        </CardHeader>
        <CardBody>
          <code style={{ fontSize: 20 }}>
            SELECT COUNT(*) FROM racial <br/>
            SELECT COUNT(*) FROM religioso <br/>
            SELECT COUNT(*) FROM territorial <br/>
            SELECT COUNT(*) FROM economico <br/>
          </code>
          <ChartistGraph
            className="ct-chart"
            data={histogramData}
            type="Bar"
            options={{ ...histogramConfig.options, high: Math.max(...histogramData.series[0], 1) }}
            responsiveOptions={histogramConfig.responsiveOptions}
            listener={histogramConfig.animation}
          />
        </CardBody>
      </Card>

      <CustomTabs
        title="Top 5:"
        headerColor="dark"
        tabs={[
          {
            tabName: "Conflitos",
            tabIcon: SportsKabaddi,
            tabContent: (
              <>
                <code style={{ fontSize: 20 }}>
                  SELECT * FROM conflito <br/>
                  ORDER BY num_mortos DESC <br/>
                  LIMIT 5
                </code>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Código", "Nome do Conflito", "Número de Feridos", "Número de Mortos"]}
                  tableData={topConflitos}
                />
              </>
            ),
          },
          {
            tabName: "Organizações",
            tabIcon: Domain,
            tabContent: (
              <>
                <code style={{ fontSize: 20 }}>
                  SELECT cod_organizacao, nome, tipo_org, tipo_ajuda, num_mediacoes_query.mediacoes FROM ( <br/>
                  &nbsp;&nbsp;SELECT COUNT(cod_conflito) AS mediacoes, cod_organizacao <br/>
                  &nbsp;&nbsp;FROM media <br/>
                  &nbsp;&nbsp;GROUP BY cod_organizacao <br/>
                  ) AS num_mediacoes_query NATURAL JOIN organizacao_mediadora <br/>
                  ORDER BY mediacoes DESC <br/>
                  LIMIT 5
                </code>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Código", "Nome da Organização", "Tipo", "Ajuda", "Mediações"]}
                  tableData={topOrganizacoes}
                />
              </>
            ),
          },
          {
            tabName: "Grupos Armados",
            tabIcon: LocationSearching,
            tabContent: (
              <>
                <code style={{ fontSize: 20 }}>
                  SELECT cod_grupo, num_armas_query.num_armas, nome FROM (<br/>
                  &nbsp;&nbsp;SELECT SUM(num_armas) AS num_armas, cod_grupo<br/>
                  &nbsp;&nbsp;FROM fornece<br/>
                  &nbsp;&nbsp;GROUP BY cod_grupo<br/>
                  ) AS num_armas_query NATURAL JOIN grupo_armado<br/>
                  ORDER BY num_armas DESC<br/>
                  LIMIT 5
                </code>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Código", "Número de Armas", "Nome do Grupo"]}
                  tableData={topGruposArmados}
                />
              </>
            ),
          },
        ]}
      />

      <Card>
        <CardHeader color="success">
          <h4 className={classes.cardTitleWhite}>Listar os traficantes e os grupos armados (Nome) para os quais os traficantes fornecem armas “Barret M82” ou “M200 intervention”.</h4>
        </CardHeader>
        <CardBody>
          <code style={{ fontSize: 20 }}>
            SELECT nome as nome_grupo, nome_trafica <br />
            FROM fornece NATURAL JOIN grupo_armado <br />
            WHERE nome_arma = 'Barret M82' OR nome_arma = 'M200 intervention'
          </code>
          <Table
            tableHeaderColor="info"
            tableHead={["Grupo Armado", "Nome do Traficante"]}
            tableData={traficante}
          />
        </CardBody>
      </Card>
    </>
  );
}

Statistics.layout = Admin;

export default Statistics;
