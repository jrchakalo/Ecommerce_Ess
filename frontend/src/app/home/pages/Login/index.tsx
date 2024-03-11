import 'semantic-ui-css/semantic.min.css';
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";
import { LoginFormSchema, LoginFormType } from "../../forms/LoginForm";
import { Link, Navigate } from "react-router-dom";
import { Segment, Button, Divider } from "semantic-ui-react";  

const Login = () => {
  const { state, prevState, service } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (body) => {
    service.login(body);
    reset();
  };

  useEffect(() => {
    if (
      state.loginRequestStatus !== prevState?.loginRequestStatus &&
      state.loginRequestStatus.isSuccess()
    ) {
      alert("Login realizado com sucesso!");
    }
  }, [state, prevState]);

  return (
    <section className={styles.container}>
      <Segment basic padded='very' floated='left'>
        <h1 className={styles.title}>Faça seu login</h1>
      </Segment> 
      <div className={styles.bottomContent}>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formInputContainer}>
            <input
              data-cy="input-login"
              {...register("login")}
              placeholder="Digite seu login"
              className={styles.formInput}
            />
            <div className={styles.bottomContent}>
              {errors.login && (
              <span data-cy="input-login-error" className={styles.formError}>
                {errors.login?.message}
              </span>
              )}
            </div>
          </div>
    
          <div className={styles.formInputContainer}>
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
          </div>
    
          <Button color="orange" data-cy="login-button" type="submit" disabled={state.loginRequestStatus.isLoading()}>
            {state.loginRequestStatus.isLoading() ? "Logando..." : "Login"}
          </Button>
          
            {state.loginRequestStatus.isFailure() && (
            <p className={styles.errorMessage}>{state.loginRequestStatus.error.message}</p>
            )}
        </form>
        <div className={styles.bottomContent}>     
          <Divider horizontal>Não possui uma conta?</Divider>
            <Link to="/create-user" data-cy="register">
              <Button
                color='orange'
                content='Cadastre-se'
                icon='add'
                labelPosition='right'
                data-cy="register"
                className="fluid"
              />
            </Link>
                
          <div className={styles.linkButtonContainer}>
            <Link data-cy="go-home" to="/home">
              <Button size='tiny'>Voltar para o início</Button>
            </Link>
          </div>
        </div>
      </div> 
  
      {state.loginRequestStatus.isSuccess() && (
        <Navigate to={`/home`} />
      )}
    </section>
  );  
};

export default Login;

