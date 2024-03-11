import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { UserFormSchema, UserFormType } from "../../forms/UserForm";
import { Link, Navigate } from "react-router-dom";
import InputMask from "react-input-mask";
import 'semantic-ui-css/semantic.min.css';
import { Form, Grid, Header, Button, Segment, Divider } from "semantic-ui-react";  

const CreateUser = () => {
  const { state, prevState, service } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(UserFormSchema),
  });

  const onSubmit: SubmitHandler<UserFormType> = async (body) => {
    service.createUser(body);
    reset();
    setValue("dataNascimento", "");
  };

  useEffect(() => {
    if (
      state.createUserRequestStatus !== prevState?.createUserRequestStatus &&
      state.createUserRequestStatus.isSuccess()
    ) {
      alert("Usuário criado com sucesso! Você será rediriceionado para a página de login.");
    }
  }, [state, prevState]);

  return (
    <section className={styles.container}>
      <Grid centered>
        <Grid.Column style={{maxWidth:750, marginTop:250,}}>
          <Segment>
            <Header size='huge' bold>Cadastre-se</Header>
            <Form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} size='huge'>
              <Form.Field>
                <label>Nome</label>
                <input
                  data-cy="input-name"
                  {...register("nome")}
                  placeholder="Digite seu nome"
                />
                {errors.nome && (
                  <span data-cy="input-name-error" className={styles.formError}>
                    {errors.nome?.message}
                  </span>
                )}
              </Form.Field>
                
              <Form.Field>
                <label>CPF</label>
                <input
                  data-cy="input-cpf"
                  {...register("cpf")}
                  placeholder="Digite seu CPF"
                    
                />
                {errors.cpf && (
                  <span data-cy="input-cpf-error" className={styles.formError}>
                    {errors.cpf.message}
                  </span>
                )}
              </Form.Field>
              
              <Form.Field>
                <label>Data de Nascimento</label>
                <InputMask
                  mask="99/99/9999"
                  data-cy="input-birthdate"
                  {...register("dataNascimento")}
                  placeholder="Digite sua data de nascimento"
                  className={styles.formInput}
                />
                {errors.dataNascimento && (
                  <span data-cy="input-birthdate-error" className={styles.formError}>
                    {errors.dataNascimento.message}
                  </span>
                )}
              </Form.Field>
          
              <Form.Field>
                <label>Email</label>
                <input
                  data-cy="input-email"
                  {...register("email")}
                  placeholder="Digite seu email"
                  className={styles.formInputCadastro}
                />
                {errors.email && (
                  <span data-cy="input-email-error" className={styles.formError}>
                    {errors.email.message}
                  </span>
                )}
              </Form.Field>

              <Form.Field>
                <label>Login</label>
                <input
                  data-cy="input-login"
                  {...register("login")}
                  placeholder="Digite seu login"
                  className={styles.formInput}
                />
              </Form.Field>
          
              <Form.Field>
                <label>Senha</label>
                <input
                  data-cy="input-password"
                  type="password"
                  {...register("senha")}
                  placeholder="Digite sua senha"
                  className={styles.formInput}
                />
                {errors.senha && (
                  <span data-cy="input-password-error" className={styles.formError}>
                    {errors.senha.message}
                  </span>
                )}
              </Form.Field>
        
              <Button fluid color='orange' size='medium' data-cy="create" type="submit" disabled={state.createUserRequestStatus.isLoading()}>
                {state.createUserRequestStatus.isLoading() ? "Criando..." : "CRIAR"}
              </Button>
              <Divider horizontal>Já tem um Login?</Divider>
              <Link to="/login" data-cy="login">
              <Button
                color='orange'
                content='LOGIN'
                icon='user'
                labelPosition='right'
                data-cy="login"
                className="fluid"
              />
            </Link>
              
            </Form>
          </Segment>
          <Link data-cy="go-home" to="/home">
            <Button>Voltar para o início</Button>
          </Link>
        </Grid.Column>
      </Grid>
      
  
      {state.createUserRequestStatus.isSuccess() && (
        <><p className={styles.successMessage}>Usuário criado com sucesso!</p><Navigate to="/login" replace /></>
      )}
  
      {state.createUserRequestStatus.isFailure() && (
        <p className={styles.errorMessage}>{state.createUserRequestStatus.error.message}</p>
      )}
  
      
    </section>
  );  
};

export default CreateUser;

