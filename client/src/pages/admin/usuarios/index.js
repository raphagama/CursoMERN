import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from '../../../services/api'

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Chip from '@material-ui/core/Chip';

import { getNomeTipo, getNomeTipoLabel } from '../../../functions/static_data';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }

}));

export default function UsuariosListagem() {
  const classes = useStyles();

  const [usuarios, setUsuarios] = useState([]);
  const [ loading, setLoading] = useState(true)

  useEffect(() =>{
    async function loadUsuarios(){
      const response = await api.get("/api/usuarios");
      setUsuarios(response.data)
      setLoading(false);
    }
    setTimeout(() => loadUsuarios(), 1000);
  },[])

  async function handleDelete(id){
   if(window.confirm("Deseja realmente excluir este ususário?")){
      var result = await api.delete('/api/usuarios/'+id);
      if(result.status === 200){
        window.location.href = '/admin/usuarios';
       } else {
        alert('Ocorreu um erro, por favor tente novamente.')
       }
    }
  }
  
  return (
    <div className={classes.root}>
      <MenuAdmin title={'USUÁRIOS'}/>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom: 10}}variant="contained" color="primary"href = {'/admin/usuarios/cadastrar/'}>Cadastrar</Button>
              <Paper className={classes.paper}>
                <h2>Lista de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    {loading? <LinearProgress style={{margin: '20 auto'}}/> :(
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">E-mail</TableCell>
                            <TableCell align="center">Tipo</TableCell>
                            <TableCell align="center">Data de Cadastro</TableCell>
                            <TableCell align="center">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                           {usuarios.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.nome_usuario}
                              </TableCell>
                              <TableCell align="center">{row.email_usuario}</TableCell>
                              <TableCell align="center"><Chip size="small" color={getNomeTipoLabel(row.tipo_usuario)} label={getNomeTipo(row.tipo_usuario)}/></TableCell>
                              <TableCell align="center">{new Date(row.createdAt).toLocaleDateString('pt-br')}</TableCell>
                              <TableCell align="center">
                                <ButtonGroup variant="contained" size="small" aria-label="outlined primary button group">
                                  <Button color="primary"href = {'/admin/usuarios/editar/' + row._id}>Atualizar</Button>
                                  <Button color="secondary" onClick={()=> handleDelete(row._id)}>Excluir</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                              )
                            )
                          }
                        </TableBody>
                      </Table>
                      )}
                    </TableContainer> 
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  )
}
