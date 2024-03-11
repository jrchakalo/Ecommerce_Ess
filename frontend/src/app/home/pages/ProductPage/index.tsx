import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import styles from "./index.module.css";
import images from "../../../../shared/assets/images/";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const { state } = useContext(LoginContext);
    const { id } = useParams<{ id: string }>();

    const handleLogout = () => {
        alert ("Usuário deslogado com sucesso!");
        window.location.reload(); // Marcar que a página deve ser recarregada
      }

      // lógica para buscar o produto com base no ID da rota
      const selectedProduct = getProductById(id);

      if (!selectedProduct) {
        return <p>Produto não encontrado</p>;
      }

    return (
        <section className={styles.container}>
            <div className={styles.logo}>
                <img src={images.logo} alt="Logo" className={styles.logoImage} />
            </div>
            <div className={styles.header}>
                <h1 className={styles.title}>Livraria Jupter Verne</h1>
                <p className={styles.subtitle}>Seu universo de leitura!</p>
            </div>
            <div className={styles.buttonContainer}>
                {state.isLogged ? (
                    <>
                        <Link to={`/profile/${state.userId}`} className={styles.linkButton}>
                            Perfil
                        </Link>
                        <Link to={`/logout/${state.userId}`} className={styles.linkButton} onClick={handleLogout}>
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.linkButton}>
                            Login
                        </Link>
                        <Link to="/home" className={styles.linkButton}>
                            Home
                        </Link>
                        <Link to="/create-user" className={styles.linkButton}>
                            Cadastro
                        </Link>
                    </>
                )}
            </div>

            <div className={styles.productSection}>
                <div className={styles.productContainer}>
                    <div className={styles.productBox}>
                        <img src={selectedProduct.image} alt="Produto" className={styles.productImage} />
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>{selectedProduct.name}</h3>
                            <p className={styles.productPrice}>R$ 62,00</p>
                            <button className={styles.productButton}>Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;

function getProductById(id: string | undefined) {
    // lógica para buscar o produto com base no ID da rota
    switch(id) {
        case ("1"):
            return {
                name: "Viagem ao Centro da Terra",
                price: 62.00,
                image: images.livro1
            };

        case ("2"):
            return {
                name: "20 Mil Léguas Submarinas",
                price: 41.00,
                image: images.livro2
            };

        case ("3"):
            return {
                name: "A Ilha Misteriosa",
                price: 32.00,
                image: images.livro3
            };

        case ("4"):
            return {
                name: "A Volta Ao Mundo Em 80 Dias",
                price: 48.00,
                image: images.livro4
            };

        case ("5"):
            return {
                name: "Da Terra á Lua",
                price: 32.00,
                image: images.livro5
            };

        case ("6"):
            return {
                name: "Robur, O Conquistador",
                price: 27.00,
                image: images.livro6
            };
        
        case ("7"):
            return {
                name: "O Castelo Dos Cárpatos",
                price: 29.00,
                image: images.livro7
            };
        
        case ("8"):
            return {
                name: "O Raio Verde",
                price: 24.00,
                image: images.livro8
            };

        case ("9"):
            return {
                name: "O Senhor Do Mundo",
                price: 46.00,
                image: images.livro9
            };

        case ("10"):
            return {
                name: "Cinco Semanas Em Um Balão",
                price: 37.00,
                image: images.livro10
            };

        default:
            return null;
    }
}
