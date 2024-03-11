import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { PromocaoContext } from "../../context/PromocaoContext";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";

const PromocaoProfile = () => {
  const { service, state } = useContext(PromocaoContext);
  const id = window.location.pathname.split("/").pop();

  useEffect(() => {
    service.getPromocao(id || "").then;
  }, [service]);
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Promoção</h1>
      <div className={styles.listContainer}>
        {state.getPromocaoRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar usuário!</span>,
          succeeded: (promocao) => (
            <>
              <p>
                <strong>Nome:</strong> {promocao[0].nome}
              </p>
              <p>
                <strong>Valor:</strong> {promocao[0].valor}
              </p>
              <p>
                <strong>Tipo:</strong> {promocao[0].tipo}
              </p>
              <p>
                <strong>Validade:</strong> {promocao[0].validade}
              </p>
            </>
          ),
        })}
      </div>
      <br />
      <Link data-cy ="update-button" to={`/update-promocao/${id}`} className={styles.linkButton}>
        <Button type="button">Atualizar Promoção</Button>
      </Link>
      
      <Link data-cy ="list-button" to={`/promocoes`} className={styles.linkButton}>
        <Button type="button">Voltar para as promoções</Button>
      </Link>

      <Link to="/home" className={styles.linkButton}>
        <Button type="button">Voltar para o início</Button> 
      </Link>
  
    </section>
  );
};

export default PromocaoProfile;
