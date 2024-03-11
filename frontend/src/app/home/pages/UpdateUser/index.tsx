import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { UserUpdateFormSchema, UserUpdateFormType } from "../../forms/UserUpdateForm";
import { Navigate, Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import { Form, Grid, Header, Button, Segment, Divider } from "semantic-ui-react";  

const UpdateUser = () => {
  const { state, prevState, service } = useContext(UserContext);
  const id = window.location.pathname.split("/").pop();
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserUpdateFormType>({
    resolver: zodResolver(UserUpdateFormSchema),
  });

  const onSubmit: SubmitHandler<UserUpdateFormType> = async (body) => {
    service.updateUser(body, id ?? '');
    service.updateUser(body, id ?? '').then(() => {
      setIsUpdateSuccess(true);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
    reset();
  };

  useEffect(() => {
    if (state.updateUserRequestStatus !== prevState?.updateUserRequestStatus) {
      if (state.updateUserRequestStatus.isSuccess() && !isUpdateSuccess) {
        alert("Usuário atualizado com sucesso!");
        setIsUpdateSuccess(true);
      }
    }
  }, [state, prevState]);

  return (
    <section className={styles.container}>
      <Grid centered>
        <Grid.Column style={{maxWidth:750, marginTop:250,}}>
          <Segment>
            <Header size='huge' bold>Atualize o Usuário</Header>
            <Form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} size='huge'>
              <Form.Field>
                <label>Nome</label>
                <input
                  data-cy="input-name"
                  {...register("nome")}
                  placeholder="Digite seu novo nome"
                  className={styles.formInput}
                />
                {errors.nome && (
                  <span data-cy="input-name-error" className={styles.formError}>
                    {errors.nome?.message}
                  </span>
                )}
              </Form.Field>
  
              <Form.Field>
                <label>Login</label>
                <input
                  data-cy="input-login"
                  {...register("login")}
                  placeholder="Digite seu novo login"
                  className={styles.formInput}
                />
                {errors.login && (
                  <span data-cy="input-login-error" className={styles.formError}>
                    {errors.login.message}
                  </span>
                )}
              </Form.Field>
  
              <Form.Field>
                <label>Senha</label>
                <input
                  data-cy="input-password"
                  type="password"
                  {...register("senha")}
                  placeholder="Digite sua nova senha"
                  className={styles.formInput}
                />
                {errors.senha && (
                  <span data-cy="input-password-error" className={styles.formError}>
                    {errors.senha.message}
                  </span>
                )}
              </Form.Field>
  
              <Button fluid color='orange' data-cy="update-button" type="submit" disabled={state.updateUserRequestStatus.isLoading()}>
                {isLoading ? "Atualizando..." : "ATUALIZAR"}
              </Button>
              <Divider horizontal>OU</Divider>

              <Link to={`/profile/${id}`} data-cy="login">
                <Button
                  color='orange'
                  content='CANCELAR'
                  icon='arrow alternate circle left outline'
                  labelPosition='right'
                  data-cy="login"
                  className="fluid"
                />
            </Link>
      </Form>
      
      {isUpdateSuccess && (
        <Navigate to={`/profile/${id}`} />
      )}
  
      {state.updateUserRequestStatus.isFailure() && (
        <p className={styles.errorMessage}>{state.updateUserRequestStatus.error.message}</p>
      )}

          </Segment>
        </Grid.Column>
      </Grid>
    </section>
  );  
};

export default UpdateUser;

