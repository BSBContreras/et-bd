import React, { useState, useEffect } from "react";
import axios from 'axios'
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
import { url, api } from "variables/fetch";

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

const defaultDataSnackbar = {
  open: false,
  color: 'info',
  message: 'Notification',
  icon: CheckCircleIcon
}

const typesConflicts = [
  { text: 'economico', value: 'economico' },
  { text: 'racial', value: 'racial' },
  { text: 'territorial', value: 'territorial' },
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

const CadastroGrupoArmado = ({ openNotification }) => {

  const [nomeGrupo, setNomeGrupo] = useState();

  const handleChangeName = (e) => {
    setNomeGrupo(e.target.value);
  }

  const onClickButton = () => {
    api.post(`${url}/grupo_armado`, {
      nome: nomeGrupo
    }).then(json => {

      openNotification(json.data.msg);
    }).catch(error => {

      openNotification('Não foi possível cadastrar Grupo Armado', true);
    }).finally(() => {

      setNomeGrupo('');
    })
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
            value: nomeGrupo,
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

const CadastroDivisao = ({ grupoArmadoOptions, openNotification }) => {

  const classes = useStyles();

  const [grupoId, setGrupoId] = useState(0);
  const [numHomens, setNumHomens] = useState(0);
  const [numBaixas, setNumBaixas] = useState(0);
  const [numAvioes, setNumAvioes] = useState(0);
  const [numBarcos, setNumBarcos] = useState(0);
  const [numTanques, setNumTanques] = useState(0);

  const handleChangeGrupo = (event) => {
    setGrupoId(event.target.value)
  }

  const handleChangeNumHomens = (event) => {
    setNumHomens(event.target.value)
  }

  const handleChangeNumBaixas = (event) => {
    setNumBaixas(event.target.value)
  }

  const handleChangeNumAvioes = (event) => {
    setNumAvioes(event.target.value)
  }

  const handleChangeNumBarcos = (event) => {
    setNumBarcos(event.target.value)
  }

  const handleChangeNumTanques = (event) => {
    setNumTanques(event.target.value)
  }

  const onClickButton = () => {
    api.post(`${url}/divisao`, { 
      cod_grupo: Number(grupoId), 
      num_barcos: Number(numBarcos), 
      num_avioes: Number(numAvioes), 
      num_tanques: Number(numTanques), 
      num_homens: Number(numHomens), 
      num_baixas: Number(numBaixas)
    }).then(json => {

      openNotification(json.data.msg);
    }).catch(error => {

      openNotification('Não foi possível cadastrar Divisão', true);
    }).finally(() => {

      setGrupoId(0);
      setNumHomens(0);
      setNumBaixas(0);
      setNumAvioes(0);
      setNumBarcos(0);
      setNumTanques(0);
    })
  }

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
              inputProps={{
                onChange: handleChangeGrupo,
                value: grupoId
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
              inputProps={{
                onChange: handleChangeNumHomens,
                type: 'number',
                value: numHomens
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
              inputProps={{
                onChange: handleChangeNumBaixas,
                type: 'number',
                value: numBaixas
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
              inputProps={{
                onChange: handleChangeNumAvioes,
                type: 'number',
                value: numAvioes
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
              inputProps={{
                onChange: handleChangeNumBarcos,
                type: 'number',
                value: numBarcos
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
              inputProps={{
                onChange: handleChangeNumTanques,
                type: 'number',
                value: numTanques
              }}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <Button color="primary" onClick={onClickButton}>Cadastrar divisão</Button>
      </CardFooter>
    </Card>
  )
}

const CadastroChefeMilitar = ({ grupoArmadoOptions, openNotification }) => {

  const classes = useStyles();

  const [faixa, setFaixa] = useState('');
  
  const [lideres, setLideres] = useState([]);
  const [grupoIdLider, setGrupoIdLider] = useState(0);
  const [nomeLider, setNomeLider] = useState(0);

  const [divisoes, setDivisoes] = useState([]);
  const [grupoIdDivisao, setGrupoIdDivisao] = useState(0);
  const [numDivisao, setNumDivisao] = useState(0);

  const handleChangeFaixa = (e) => {
    setFaixa(e.target.value);
  }

  const handleChangeGrupoLider = (event) => {
    const grupoIdLider = event.target.value;

    api.get(`${url}/grupo_armado_lider/${grupoIdLider}`)
    .then(json => {
      const { data } = json;

      if(data.length > 0) {
        
        setLideres(json.data.map(lider => ({
          value: lider.nome,
          text: lider.nome
        })));
      } else {

        openNotification(`O grupo armado ${grupoIdLider} não possui nenhum líder`, true);
      }
    })
    .catch(error => {

      openNotification('Não foi possível carregar os Lideres', true);
    })
    .finally(() => {

      setGrupoIdLider(grupoIdLider);
    })
  }

  const handleChangeLider = (event) => {
    setNomeLider(event.target.value);
  }

  const handleChangeGrupodivisao = (event) => {
    const grupoIdDivisao = event.target.value;

    api.get(`${url}/grupo_armado_divisao/${grupoIdDivisao}`)
    .then(json => {
      const { data } = json;

      if(data.length > 0) {
        
        setDivisoes(json.data.map(divisao => ({
          value: divisao.num_divisao,
          text: divisao.num_divisao
        })));
      } else {

        openNotification(`O grupo armado ${grupoIdDivisao} não possui nenhuma divisão`, true);
      }
    })
    .catch(error => {

      openNotification('Não foi possível carregar as Divisões', true);
    })
    .finally(() => {

      setGrupoIdDivisao(grupoIdDivisao);
    })
  }

  const handleChangeDivisao = (event) => {
    setNumDivisao(event.target.value);
  }

  const onClickButton = () => {
    api.post(`${url}/chefe_militar`, { 
      nome_lider: nomeLider, 
      faixa: faixa,
      cod_grupo_lider: Number(grupoIdLider), 
      num_divisao: Number(numDivisao), 
      cod_grupo_divisao: Number(grupoIdDivisao), 
    }).then(json => {

      openNotification(json.data.msg);
    }).catch(error => {

      openNotification('Não foi possível cadastrar o Chefe Militar', true);
    }).finally(() => {

      setFaixa('');

      setLideres([]);
      setGrupoIdLider(0);
      setNomeLider(0);

      setDivisoes([]);
      setGrupoIdDivisao(0);
      setNumDivisao(0);
    })
  }

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
              id="faixa_chefe"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: faixa,
                onChange: handleChangeFaixa
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
              inputProps={{
                value: grupoIdLider,
                onChange: handleChangeGrupoLider
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
              inputProps={{
                value: grupoIdDivisao,
                onChange: handleChangeGrupodivisao
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
                disabled: lideres.length === 0,
                onChange: handleChangeLider,
                value: nomeLider
              }}
              options={lideres}
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
                disabled: divisoes.length === 0,
                onChange: handleChangeDivisao,
                value: numDivisao
              }}
              options={divisoes}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <Button color="warning" onClick={onClickButton}>Cadastrar chefe militar</Button>
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

    setTimeout(() => {
      closeSnackbar();
    }, 6000);
  }

  const closeSnackbar = () => {
    setSnackbarData(prev => ({...prev, open: false }));
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
          <CadastroGrupoArmado openNotification={openSnackbar} />
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <CadastroDivisao grupoArmadoOptions={grupoArmadoOptions} openNotification={openSnackbar} />
        </GridItem>
      </GridContainer>
      <CadastroChefeMilitar grupoArmadoOptions={grupoArmadoOptions} openNotification={openSnackbar} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CadastroLiderPolitico grupoArmadoOptions={grupoArmadoOptions} openNotification={openSnackbar} />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CadastroConflito openNotification={openSnackbar} />
        </GridItem>
      </GridContainer>
    </div>
  );
}

InsertData.layout = Admin;

export default InsertData;
