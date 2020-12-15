import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomSelect/CustomSelect.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import Handgun from "assets/img/handgun.svg";
import { url } from "variables/fetch";

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

// const cod_grupo, num_barcos, num_avioes, num_tanques, num_homens, num_baixas;

// nome, num_feridos, num_mortos, tipo

const typesConflicts = [
  { text: 'economico', value: 'economico' },
  { text: 'racial', value: 'racial' },
  { text: 'territorial', value: 'territorial'},
  { text: 'religioso', value: 'religioso' }
];

const useStyles = makeStyles(styles);

export const getServerSideProps = async () => {
  const response = await fetch(`${url}/grupo_armado`);
  const gruposArmados = await response.json();

  return {
    props: {
      gruposArmados
    }
  }
}

const CadastroGrupoArmado = () => {

  const [nomeGrupo, setNomeGrupo] = useState();

  const handleChangeName = (e) => {
    setNomeGrupo(e.target.value);
  }

  const onClickButton = () => {
    fetch(`${url}/grupo_armado`, { 
      method: 'POST', 
      body: { 
        nome: nomeGrupo 
      }
    }).then(data => {

      console.log(data);
    }).catch(data => {

      console.log(data);
    });

    // const gruposArmados = await response.json();
  }

  return (
    <Card profile>
      <CardAvatar profile>
        <a href="#handgun" onClick={(e) => e.preventDefault()}>
          <img src={Handgun} alt="..." />
        </a>
      </CardAvatar>
      <h4 >Cadastrar Grupo Armado</h4>
      <CardBody>
        <CustomInput
          labelText="Nome do Grupo Armado"
          id="nome_grupo_armado"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: handleChangeName
          }}
        />
      </CardBody>
      <CardFooter>
        <Button color="danger" onClick={onClickButton}>Cadastrar Grupo Armado</Button>
      </CardFooter>
    </Card>
  )
}

const CadastroDivisao = ({ grupoArmadoOptions }) => {

  const classes = useStyles();

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Cadastro de divisões</h4>
        <p className={classes.cardCategoryWhite}>Cadastrar divisões dentro de um grupo armado</p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomSelect
              labelText="Grupo Armado"
              id="grupo-armado"
              formControlProps={{
                fullWidth: true,
              }}
              options={grupoArmadoOptions}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Número de homens"
              id="num_homens"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Número de baixas"
              id="num_baixas"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Número de Aviões"
              id="num_avioes"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Número de Barcos"
              id="num_barcos"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Número de Tanques"
              id="num_tanques"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <Button color="primary">Cadastrar divisão</Button>
      </CardFooter>
    </Card>
  )
}

const CadastroChefeMilitar = ({ grupoArmadoOptions }) => {

  const classes = useStyles();

  return (
    <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Cadastro de Chefe Militar</h4>
        <p className={classes.cardCategoryWhite}>Cadastrar chefes militares</p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Faixa do chefe militar"
              id="faixe_chefe"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomSelect
              labelText="Grupo armado que o líder politíco pertence"
              id="grupo_lider_chefe"
              formControlProps={{
                fullWidth: true,
              }}
              options={grupoArmadoOptions}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomSelect
              labelText="Grupo da divisão que chefe militar pertence"
              id="grupo_divisao_chefe"
              formControlProps={{
                fullWidth: true,
              }}
              options={grupoArmadoOptions}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4} />
          <GridItem xs={12} sm={12} md={4}>
            <CustomSelect
              labelText="Nome do líder politíco"
              id="nome_lider_chefe"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                disabled: true,
              }}
              options={[{ value: 0, text: 'zero' }]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomSelect
              labelText="Divisão do grupo armado"
              id="divisao_grupo_chefe"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                disabled: true,
              }}
              options={[{ value: 0, text: 'zero' }]}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <Button color="warning">Cadastrar chefe militar</Button>
      </CardFooter>
    </Card>
  )
}

const CadastroLiderPolitico = ({ grupoArmadoOptions }) => {

  const classes = useStyles();

  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>Cadastro de Líder Politíco</h4>
        <p className={classes.cardCategoryWhite}>Cadastrar líderes politícos</p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Nome do líder politíco"
              id="nome_lider"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Apoios do líder politíco"
              id="apoios_lider"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
        </GridContainer>
        <CustomSelect
          labelText="Grupo Armado"
          id="grupo-armado-lider"
          formControlProps={{
            fullWidth: true,
          }}
          options={grupoArmadoOptions}
        />
      </CardBody>
      <CardFooter>
        <Button color="info">Cadastrar Líder Politíco</Button>
      </CardFooter>
    </Card>
  )
}

const CadastroConflito = () => {

  const classes = useStyles();

  return (
    <Card>
      <CardHeader color="rose">
        <h4 className={classes.cardTitleWhite}>Cadastro de Conflitos</h4>
        <p className={classes.cardCategoryWhite}>Cadastrar conflitos bélicos</p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomSelect
              labelText="Tipo de conflito"
              id="tipo_conflito"
              formControlProps={{
                fullWidth: true,
              }}
              options={typesConflicts}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Nome do conflito"
              id="nome_conflito"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Número de Feridos"
              id="num_feridos"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Número de Mortos"
              id="num_mortos"
              formControlProps={{
                fullWidth: true,
              }}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <Button color="rose">Cadastrar Conflito</Button>
      </CardFooter>
    </Card>
  )
}

const defaultDataSnackbar = {
  open: false,
  color: 'info',
  message: 'Notification',
  icon: CheckCircleIcon
}

function InsertData({ gruposArmados }) {

  const [grupoArmadoOptions, setGrupoArmadoOptions] = useState([]);
  const [snackbarData, setSnackbarData] = useState(defaultDataSnackbar);

  const openSnackbar = (msg, error) => {
    setSnackbarData({
      open: true,
      message: msg,
      color: error ? 'danger' : 'success',
      icon: error ? ErrorIcon : CheckCircleIcon
    })
  }

  const closeSnackbar = () => {
    setSnackbarData(defaultDataSnackbar);
  }

  useEffect(() => {
    setGrupoArmadoOptions(gruposArmados.map(grupo => ({ value: grupo.cod_grupo, text: grupo.nome })));
  }, []);

  return (
    <div>
      <Snackbar
        place="br"
        color={snackbarData.color}
        icon={snackbarData.icon}
        message={snackbarData.message}
        open={snackbarData.open}
        closeNotification={() => closeSnackbar()}
        close
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <CadastroGrupoArmado />
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <CadastroDivisao grupoArmadoOptions={grupoArmadoOptions} />
        </GridItem>
      </GridContainer>
      <CadastroChefeMilitar grupoArmadoOptions={grupoArmadoOptions} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CadastroLiderPolitico grupoArmadoOptions={grupoArmadoOptions} />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CadastroConflito />
        </GridItem>
      </GridContainer>
    </div>
  );
}

InsertData.layout = Admin;

export default InsertData;
