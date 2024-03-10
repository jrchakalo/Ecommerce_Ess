import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { EmailContext } from "../../context/EmailContext";

const ListEmails = () => {
  const { service, state } = useContext(EmailContext);

  useEffect(() => {
    service.getAllEmails();
  }, [service]);
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Lista de Emails</h1>
      <div className={styles.listContainer}>
        {state.getEmailRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar Emails!</span>,
          succeeded: (emails) => (
            <>
              {emails.map((email) => {
                return (
                  <div key={email.id} className={styles.listItem}>
                    <span
                      data-cy={`user-item-${email.name}`}
                      className={styles.listItemText}
                    >
                      {email.name}
                    </span>
                  </div>
                );
              })}
            </>
          ),
        })}
      </div>
      <br />
    </section>
  );
};

export default ListEmails;
