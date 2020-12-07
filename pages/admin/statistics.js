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

const useStyles = makeStyles(styles);

const delays2 = 80,
  durations2 = 500;
const histogramData = {
  data: {
    labels: [
      "Conflito 1",
      "Conflito 2",
      "Conflito 3",
      "Conflito 4",
      "Conflito 5",
      "Conflito 6",
      "Conflito 7",
      "Conflito 8",
    ],
    series: [[542, 443, 320, 780, 553, 453, 326, 434]],
  },
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    high: 1000,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0,
    },
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 1,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

function Statistics() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Top 5:"
            headerColor="dark"
            tabs={[
              {
                tabName: "Conflitos",
                tabIcon: SportsKabaddi,
                tabContent: (
                  <>
                    <h3>SELECT * FROM conflitos ORDER BY num_mortos LIMIT 5</h3>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["ID", "Nome do Conflito", "Número de Mortos"]}
                      tableData={[
                        ["1", "Free Fire vs PUBG", "1.254"],
                        ["2", "Dota 2 vs LOL", "932"],
                        ["3", "Bolacha vs Biscoito", "325"],
                        ["4", "Nakano vs Daniel lanchando em sala", "2"],
                        ["5", "Fausto Silva vs Thanos", "2"],
                      ]}
                    />
                  </>
                ),
              },
              {
                tabName: "Organizações",
                tabIcon: Domain,
                tabContent: (
                  <>
                    <h3>SELECT * FROM organizacoes ORDER BY mediacoes LIMIT 5</h3>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["ID", "Nome do Conflito", "Número de Mortos"]}
                      tableData={[
                        ["1", "Free Fire vs PUBG", "1.254"],
                        ["2", "Dota 2 vs LOL", "932"],
                        ["3", "Bolacha vs Biscoito", "325"],
                        ["4", "Nakano vs Daniel lanchando em sala", "2"],
                      ]}
                    />
                  </>
                ),
              },
              {
                tabName: "Grupos Armados",
                tabIcon: LocationSearching,
                tabContent: (
                  <>
                    <h3>SELECT * FROM conflitos ORDER BY num_mortos LIMIT 5</h3>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["ID", "Nome do Conflito", "Número de Mortos"]}
                      tableData={[
                        ["1", "Free Fire vs PUBG", "1.254"],
                        ["2", "Dota 2 vs LOL", "932"],
                        ["3", "Bolacha vs Biscoito", "325"],
                        ["4", "Nakano vs Daniel lanchando em sala", "2"],
                      ]}
                    />
                  </>
                ),
              },
            ]}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                Histrograma: Tipos de Conflito
              </h4>
            </CardHeader>
            <CardBody>
              <ChartistGraph
                className="ct-chart"
                data={histogramData.data}
                type="Bar"
                options={histogramData.options}
                responsiveOptions={histogramData.responsiveOptions}
                listener={histogramData.animation}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Statistics.layout = Admin;

export default Statistics;
