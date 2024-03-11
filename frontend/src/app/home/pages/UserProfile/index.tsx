import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import { Form, Grid, Header, Button, Segment, Divider } from "semantic-ui-react";  

const UserProfile = () => {
  const { service, state } = useContext(UserContext);
  const id = window.location.pathname.split("/").pop();

  useEffect(() => {
    service.getUser(id || "").then;
  }, [service]);
  return (
    <section className={styles.container}>
      <Grid centered>
        <Grid.Column style={{maxWidth:750, marginTop:250,}}>
          <Segment>
            <Header size='huge' bold>Perfil do Usuário</Header>
            <Form className={styles.formContainer} size='huge'>
            {state.getUserRequestStatus.maybeMap({
              loading: () => <span>Carregando...</span>,
              failed: () => <span>Erro ao carregar usuário!</span>,
              succeeded: (user) => (
                <>
                  <Form.Field>
                    <Segment><Header size='medium'><strong>Nome:</strong> {user[0].nome}</Header></Segment>
                  </Form.Field>
                  
                  <Form.Field>
                    <Segment><Header size='medium'><strong>CPF:</strong> {user[0].cpf}</Header></Segment>
                  </Form.Field>
                  
                  <Form.Field>
                    <Segment><Header size='medium'><strong>Data de Nascimento:</strong> {user[0].dataNascimento}</Header></Segment>
                  </Form.Field>
              
                  <Form.Field>
                    <Segment><Header size='medium'><strong>Login:</strong> {user[0].login}</Header></Segment>
                  </Form.Field>

                  <Form.Field>
                    <Segment><Header size='medium'><strong>Email:</strong> {user[0].email}</Header></Segment>
                  </Form.Field>
                </>
              ),
              })}
        
             <Link to={`/update-user/${id}`} data-cy="cancel">
                <Button
                  color='orange'
                  content='ATUALIZAR USUÁRIO'
                  icon='refresh'
                  labelPosition='right'
                  data-cy="update-button"
                  className="fluid"
                />
              </Link>
              <Divider horizontal>OU</Divider>
              <Link to={`/home`} data-cy="cancel">
                <Button
                  color='orange'
                  content='VOLTAR PARA O INÍCIO'
                  icon='home'
                  labelPosition='right'
                  data-cy="login"
                  className="fluid"
                />
              </Link>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </section>
  );
};

export default UserProfile;