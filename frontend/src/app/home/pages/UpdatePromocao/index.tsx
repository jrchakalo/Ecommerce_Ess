import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { PromocaoContext } from "../../context/PromocaoContext";
import { PromocaoUpdateFormSchema, PromocaoUpdateFormType } from "../../forms/PromocaoUpdateForm";
import { Navigate, Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";

const UpdatePromocao = () => {
  const { state, prevState, service } = useContext(PromocaoContext);
  const id = window.location.pathname.split("/").pop();
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PromocaoUpdateFormType>({
    resolver: zodResolver(PromocaoUpdateFormSchema),
  });

  const onSubmit: SubmitHandler<PromocaoUpdateFormType> = async (body) => {
    service.updatePromocao(body, id ?? '');
    service.updatePromocao(body, id ?? '').then(() => {
      setIsUpdateSuccess(true);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
    reset();
  };

  useEffect(() => {
    if (state.updatePromocaoRequestStatus !== prevState?.updatePromocaoRequestStatus) {
      if (state.updatePromocaoRequestStatus.isSuccess() && !isUpdateSuccess) {
        alert("Promoção atualizada com sucesso!");
        setIsUpdateSuccess(true);
      }else{
        alert("Erro ao atualizar promoção!");
      }
    }
  }, [state, prevState]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Atualização de Promoção</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
  
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-valor"
            {...register("valor")}
            placeholder="Digite um novo valor pra promoção"
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
            type="tipo"
            {...register("tipo")}
            placeholder="Digite um novo tipo para a promoção"
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
            placeholder="Digite a condição de validade"
            className={styles.formInput}
          />
          {errors.validade && (
            <span data-cy="input-validade-error" className={styles.formError}>
              {errors.validade.message}
            </span>
          )}
        </div>
  
        <Button data-cy="update-button" type="submit" disabled={state.updatePromocaoRequestStatus.isLoading()}>
          {isLoading ? "Atualizando..." : "Atualizar"}
        </Button>

        <Button data-cy="cancel" type="button">
          <Link to={`/profile/${id}`} className={styles.linkButton}>Cancelar</Link>
        </Button>
      </form>
  
      {isUpdateSuccess && (
        <Navigate to={`/promocoes/all`} />
      )}
  
      {state.updatePromocaoRequestStatus.isFailure() && (
        <p className={styles.errorMessage}>{state.updatePromocaoRequestStatus.error.message}</p>
      )}
    </section>
  );  
};

export default UpdatePromocao;

