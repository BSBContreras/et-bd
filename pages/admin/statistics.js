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

  return {
    props: {
      histogramData,
      topConflitos,
      topOrganizacoes,
      topGruposArmados
    }
  }
}

function Statistics({ histogramData, topConflitos, topOrganizacoes, topGruposArmados }) {
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
              <Table
                tableHeaderColor="warning"
                tableHead={["Código", "Nome do Conflito", "Número de Feridos", "Número de Mortos"]}
                tableData={topConflitos}
              />
            ),
          },
          {
            tabName: "Organizações",
            tabIcon: Domain,
            tabContent: (
              <Table
                tableHeaderColor="warning"
                tableHead={["Código", "Nome da Organização", "Tipo", "Ajuda", "Mediações"]}
                tableData={topOrganizacoes}
              />
            ),
          },
          {
            tabName: "Grupos Armados",
            tabIcon: LocationSearching,
            tabContent: (
              <Table
                tableHeaderColor="warning"
                tableHead={["Código", "Número de Armas", "Nome do Grupo"]}
                tableData={topGruposArmados}
              />
            ),
          },
        ]}
      />
    </>
  );
}

Statistics.layout = Admin;

export default Statistics;
