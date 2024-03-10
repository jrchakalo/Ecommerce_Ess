import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import { Link } from "react-router-dom";
import Button from "../../../../shared/components/Button";

const Carrinho = () => {
  const { service, state } = useContext(CarrinhoContext);
  const id = window.location.pathname.split("/").pop();
  //const { id } = useParams<{ id: string }>();

  useEffect(() => {
    service.getCarrinho(id || "").then;
  }, [service]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Carrinho</h1>
      <div className={styles.listContainer}>
        {state.getCarrinhoRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar carrinho!</span>,
          succeeded: (carrinho) => (
            <>
              <p>
                <strong>Produtos:</strong> {carrinho[0].id_produtos}
              </p>
              <p>
                <strong>Valor Total:</strong> {
                    carrinho[0].id_produtos.reduce((acc: number, id: string | undefined) => {
                        const product = getProductById(id);
                        if (product) {
                        acc += product.price;
                        }
                        else {
                        console.error(`Produto com ID ${id} não encontrado`);
                        }
                        return acc;
                    }, 0)
                }
              </p>
            </>
          ),
        })}
      </div>
      <br />
      <Link to="/home" className={styles.linkButton}>
        <Button type="button">Voltar para o início</Button>
      </Link>
    </section>
  );
};

export default Carrinho;

function getProductById(id: string | undefined) {
    // lógica para buscar o produto com base no ID da rota
    switch(id) {
        case ("1"):
            return {
                name: "Viagem ao Centro da Terra",
                price: 62.00
            };

        case ("2"):
            return {
                name: "20 Mil Léguas Submarinas",
                price: 41.00
            };

        case ("3"):
            return {
                name: "A Ilha Misteriosa",
                price: 32.00
            };

        case ("4"):
            return {
                name: "A Volta Ao Mundo Em 80 Dias",
                price: 48.00
            };

        case ("5"):
            return {
                name: "Da Terra á Lua",
                price: 32.00
            };

        case ("6"):
            return {
                name: "Robur, O Conquistador",
                price: 27.00
            };
        
        case ("7"):
            return {
                name: "O Castelo Dos Cárpatos",
                price: 29.00
            };
        
        case ("8"):
            return {
                name: "O Raio Verde",
                price: 24.00
            };

        case ("9"):
            return {
                name: "O Senhor Do Mundo",
                price: 46.00
            };

        case ("10"):
            return {
                name: "Cinco Semanas Em Um Balão",
                price: 37.00
            };

        default:
            return null;
    }
}
