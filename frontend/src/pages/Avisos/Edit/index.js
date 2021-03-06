import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

//Components
import Button from '@material-ui/core/Button';
import TextField from '../../../components/TextField';
import TextArea from '../../../components/TextArea';
import DateField from '../../../components/DateField';
import HeaderDashboard from '../../Dashboard/HeaderDashboard';

//Notifications
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

//Api backend
import api from '../../../services/api';

//Styles
import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginLeft: theme.spacing(20),
      width: '80ch',
    },
  },
  btn : {
    width: '25%',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function AvisosEdit(props) {
  const history = useHistory();
  const classes = useStyles();

  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [professor, setProfessor] = useState('');

  const avisoId = props.location.state?.id;
  const readOnly = props.location.state?.readOnly;

  useEffect(loadAviso, [avisoId]);

  function loadAviso() {
    if (avisoId) {
      api
        .get(`/avisos/${avisoId}`)
        .then((response) => {
          setTipo(response.data.tipo);
          setDescricao(response.data.descricao);
          setProfessor(response.data.professor);
        });
    }
  }

  async function handleNew(e) {
    e.preventDefault();

    const data = {
      avisoId,
      tipo,
      descricao,
      professor
    };

    try {
      if (avisoId) {
        await api.put(`/avisos/${avisoId}`, data);
        NotificationManager.success('Aviso alterado com sucesso!');
      } else {
        await api.post('/avisos', data);
        NotificationManager.success('Aviso cadastrado com sucesso!');
      }
      history.push('/avisos');
    } catch(err) {
      alert('Erro ao cadastrar aviso, tente novamente.');
    }
  }

  function navigateBack() {
    history.push("/avisos");
  }

  return (
        <>
          <HeaderDashboard title="Aviso" handleBack={navigateBack}/>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={handleNew}>
            <TextField 
              id="tipo-id" 
              label="Tipo"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              disabled={readOnly}/>
            <DateField 
              id="data-id" 
              label="Data"
              value={data}
              onChange={e => setData(e.target.value)}
              disabled={readOnly}/>
            <TextArea 
              id="descricao-id" 
              label="Descrição" 
              height={150}
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              disabled={readOnly}/>
            <TextField 
              id="professor-id" 
              label="Professor"
              value={professor}
              onChange={e => setProfessor(e.target.value)}
              disabled={readOnly}/>
            <Button 
              type="submit" 
              className={classes.btn} 
              variant="contained" 
              color="primary"
              disabled={readOnly}>
                Salvar
            </Button>
          </form>
        </>
  );
}