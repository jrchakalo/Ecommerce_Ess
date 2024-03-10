import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { PromocaoContext } from "../../context/PromocaoContext";
import { PromocaoFormSchema, PromocaoFormType } from "../../forms/PromocaoForm";
import { Link, Navigate } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import InputMask from "react-input-mask";

const CreatePromocao = () => {
  const { state, prevState, service } = useContext(PromocaoContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PromocaoFormType>({
    resolver: zodResolver(PromocaoFormSchema),
  });

  const onSubmit: SubmitHandler<PromocaoFormType> = async (body) => {
    service.createPromocao(body);
    reset();
    //setValue("dataNascimento", "");
  };

  useEffect(() => {
    if (
      state.createPromocaoRequestStatus !== prevState?.createPromocaoRequestStatus &&
      state.createPromocaoRequestStatus.isSuccess()
    ) {
      alert("Usuário criado com sucesso! Você será rediriceionado para a página de login.");
    }else{
      alert("Erro ao criar usuário! Tente novamente.");
    }
  }, [state, prevState]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Cadastro de Usuário</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-name"
            {...register("nome")}
            placeholder="Digite o nome da promoção"
            className={styles.formInput}
          />
          {errors.nome && (
            <span data-cy="input-name-error" className={styles.formError}>
              {errors.nome?.message}
            </span>
          )}
        </div>
  
        <div className={styles.formInputContainer}>
          <InputMask
          mask = "99"
            data-cy="input-valor"
            {...register("valor")}
            placeholder="Digite o valor da promoção"
            className={styles.formInput}
          />
          {errors.valor && (
            <span data-cy="input-valor-error" className={styles.formError}>
              {errors.valor.message}
            </span>
          )}
        </div>
  
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-tipo"
            {...register("tipo")}
            placeholder="Digite o tipo da promoção"
            className={styles.formInput}
          />
          {errors.tipo && (
            <span data-cy="input-tipo-error" className={styles.formError}>
              {errors.tipo.message}
            </span>
          )}
        </div>
  
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-validade"
            {...register("validade")}
            placeholder="Digite seu email"
            className={styles.formInput}
          />
          {errors.validade && (
            <span data-cy="input-email-error" className={styles.formError}>
              {errors.validade.message}
            </span>
          )}
        </div>
  
        <Button data-cy="create" type="submit" disabled={state.createPromocaoRequestStatus.isLoading()}>
          {state.createPromocaoRequestStatus.isLoading() ? "Criando..." : "CRIAR"}
        </Button>
      </form>
  
      {state.createPromocaoRequestStatus.isSuccess() && (
        <><p className={styles.successMessage}>Usuário criado com sucesso!</p><Navigate to="/login" replace /></>
      )}
  
      {state.createPromocaoRequestStatus.isFailure() && (
        <p className={styles.errorMessage}>{state.createPromocaoRequestStatus.error.message}</p>
      )}
  
      <Link data-cy="view-promocoes" to="/home">
        Voltar para início
      </Link>
    </section>
  );  
};

export default CreatePromocao;
