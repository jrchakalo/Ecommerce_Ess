//import React from "react";
import images from "../../../../shared/assets/images/";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { LoginContext } from "../../context/LoginContext";
import { useContext} from "react";
import 'semantic-ui-css/semantic.min.css';
import { Form, Grid, Header, Button, Segment, Divider, Image } from "semantic-ui-react"; 

const HomePage = () => {
  const { state } = useContext(LoginContext);
 
  const handleLogout = () => {
    alert ("Usuário deslogado com sucesso!");
    window.location.reload(); // Marcar que a página deve ser recarregada
  }

  
  
  return (
    <section className={styles.container}>
      <div className={styles.backGroudContainer}>
        <img src={images.logo} alt="Logo" className={styles.logoImage} />
      </div>
        <h1 className={styles.headerCustom}>Seja bem-vindo à</h1>
        <h1 className={styles.headerCustom}>Livraria Júlio Verne</h1>
        <h1 className={styles.headerCustom2}>Seu universo de leitura!</h1>
      <div className={styles.buttonContainer}>
        {state.isLogged ? (
          <>            
            {(state.userId == '0') ? ( // Verifica se o ID do usuário é "01"
              <>
                <Link data-cy="promocoes-button" to={`/create-promocao`}>
                  <Button color='orange'>Cadastrar Promoções </Button> 
                </Link>
                <Link data-cy="promocoes-button" to={`/promocoes`}>
                  <Button color='orange'>Todas as Promoções </Button>
                </Link>
              </>
            ) : (
              <>
                <Link data-cy="promocoes-button" to={`/promocoes/user/${state.userId}`}>
                  <Button color='orange'>Minhas Promoções </Button>
                </Link>  
                <Link data-cy="profile-button" to={`/profile/${state.userId}`}>
                  <Button color='orange'>Perfil </Button>
                </Link>              
              </>
            )}
            <Link to={`/logout/${state.userId}`} onClick={handleLogout}>
              <Button color='orange'>Logout </Button>
            </Link>
          </>
        ) : (
          <>
            <Link data-cy="login-button" to="/login">
              <Button color='orange'>Login </Button>
            </Link>
            <Link data-cy="register-button" to="/create-user">
              <Button color='orange'>Cadastro </Button>
            </Link>
          </>
        )}
      </div>
      <Divider />
      <div className={styles.productSection}>
        <h2 className={styles.headerCustom2}>Produtos em destaque</h2>
        <div className={styles.productContainer}>
            <div className={styles.productBox}>
                <img src={images.livro1} alt="Produto 1" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>Viagem ao Centro da Terra</h3>
                <p className={styles.productPrice}>R$ 62,00</p>
                <Link to="/product/1">
                 <Button color='orange'>Comprar </Button>
                </Link>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro2} alt="Produto 2" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>20 Mil Léguas Submarinas</h3>
                <p className={styles.productPrice}>R$ 41,00</p>
                <Link to="/product/2">
                  <Button color='orange'>Comprar </Button>
                </Link>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro3} alt="Produto 3" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>A Ilha Misteriosa</h3>
                <p className={styles.productPrice}>R$ 32,00</p>
                <Link to="/product/3">
                  <Button color='orange'>Comprar </Button>
                </Link>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro4} alt="Produto 4" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>A Volta Ao Mundo Em 80 Dias</h3>
                <p className={styles.productPrice}>R$ 48,00</p>
                <Link to="/product/4">
                  <Button color='orange'>Comprar </Button>
                </Link>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro5} alt="Produto 5" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>Da Terra á Lua</h3>
                <p className={styles.productPrice}>R$ 32,00</p>
                <Link to="/product/5">
                  <Button color='orange'>Comprar </Button>
                </Link>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro6} alt="Produto 6" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>Robur, O Conquistador</h3>
                <p className={styles.productPrice}>R$ 27,00</p>
                <Link to="/product/6">
                  <Button color='orange'>Comprar </Button>
                </Link>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro7} alt="Produto 7" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>O Castelo Dos Cárpatos</h3>
                <p className={styles.productPrice}>R$ 29,00</p>
                <Link to="/product/7">
                  <Button color='orange'>Comprar </Button>
                </Link>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro8} alt="Produto 8" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>O Raio Verde</h3>
                <p className={styles.productPrice}>R$ 24,00</p>
                <Link to="/product/8">
                  <Button color='orange'>Comprar </Button>
                </Link>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro9} alt="Produto 9" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>O Senhor Do Mundo</h3>
                <p className={styles.productPrice}>R$ 46,00</p>
                <Link to="/product/9">
                  <Button color='orange'>Comprar </Button>
                </Link>
                </div>
            </div>
            <div className={styles.productBox}>
                <img src={images.livro10} alt="Produto 10" className={styles.productImage} />
                <div className={styles.productInfo}>
                <h3 className={styles.productName}>Cinco Semanas Em Um Balão</h3>
                <p className={styles.productPrice}>R$ 37,00</p>
                <Link to="/product/10">
                  <Button color='orange'>Comprar </Button>
                </Link>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
