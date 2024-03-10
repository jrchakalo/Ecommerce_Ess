import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { EmailContext } from "../../context/EmailContext";

const ListEmailsSpam = () => {
  const { service, state } = useContext(EmailContext);

  useEffect(() => {
    service.getSpamEmails();
  }, [service]);
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Lista de Emails marcados como Spam</h1>
      <div className={styles.listContainer}>
        {state.getEmailSpamRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar Emails marcados como Spam!</span>,
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

export default ListEmailsSpam;
