import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { PromocaoContext } from "../../context/PromocaoContext";
import { Link } from "react-router-dom";

const ListPromocoes = () => {
  const { service, state } = useContext(PromocaoContext);

  useEffect(() => {
    service.getPromocoes();
  }, [service]);
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Promoções Cadastradas</h1>
      <div className={styles.listContainer}>
        {state.getPromocaoRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar promoções!</span>,
          succeeded: (promocoes) => (
            <>
              {promocoes.map((promocao) => {
                return (
                  <div key={promocao.id} className={styles.listItem}>
                    <span
                      data-cy={`promocao-item-${promocao.nome}`}
                      data-testid={`promocao-item-${promocao.nome}`}
                      data-id={promocao.id}
                      className={styles.listItemText}
                    >
                      {promocao.nome}
                    </span>
                    
                    <Link to={`/promocao/${promocao.id}`} replace>
                      EDITAR
                    </Link>
                  </div>
                );
              })}
            </>
          ),
        })}
      </div>
      <br />
      <Link to="/create-promocao" replace>
        CRIAR PROMOÇÃO
      </Link>
    </section>
  );
};

export default ListPromocoes;
