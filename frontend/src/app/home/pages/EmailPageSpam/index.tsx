import images from "../../../../shared/assets/imagesEmail";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';

const EmailsSpam = () => {
  return(
    <section className={styles.container}>

    {/* Barra Lateral */}
    <div style={{position:"fixed",backgroundColor:"#d79b8d",minHeight:"100vh", width:"19.6vw"}}>
   
      <Link to="/emails" style={{marginTop:"1vw",marginLeft:"0.8vw",width:"15vw",display:"flex",alignItems:"center"}}>
        <img src={images.spam} style={{width:"1.2vw",marginLeft:"2vw", marginBottom:"1vw"}}/>
        <span style={{cursor:"pointer",marginLeft:"1.6vw",fontWeight:"650",fontSize:'1.1vw', marginBottom:"1vw"}}>Caixa de Entrada
        </span>
      </Link>

      <Link to="/emailsSpam" style={{marginTop:"1vw",marginLeft:"0.8vw",width:"15vw",display:"flex",alignItems:"center"}}>
        <img src={images.spam} style={{width:"1.2vw",marginLeft:"2vw", marginBottom:"1vw"}}/>
        <span style={{cursor:"pointer",marginLeft:"1.6vw",fontWeight:"650",fontSize:'1.1vw', marginBottom:"1vw"}}>Spam
        </span>
      </Link>

      <div style={{marginTop:"1vw",marginLeft:"0.8vw",width:"15vw",display:"flex",alignItems:"center"}}>
        <img src={images.send} style={{width:"1.2vw",marginLeft:"2vw", marginBottom:"1vw"}}/>
        <span style={{cursor:"pointer",marginLeft:"1.6vw",fontWeight:"650",fontSize:'1.1vw', marginBottom:"1vw"}}>Enviado</span>
      </div>
      
      <div style={{marginTop:"1vw",marginLeft:"0.8vw",width:"15vw",display:"flex",alignItems:"center"}}>
        <img src={images.bin} style={{width:"1.2vw",marginLeft:"2vw", marginBottom:"1vw"}}/>
        <span style={{cursor:"pointer",marginLeft:"1.6vw",fontWeight:"650",fontSize:'1.1vw', marginBottom:"1vw"}}>Lixeira</span>
      </div>

      <div style={{cursor: 'pointer', height: "4.5vw", marginLeft: "2vw", marginTop:"2vw",
        marginBottom:"2vw", width: "15vw", display: "flex", alignItems: "center",
        borderRadius: "20px", backgroundColor: "#ebd7d2"}}>
        <img src={images.pen} style={{ width: "1.2vw", marginLeft: "2vw" }} />
        <h4 style={{ marginLeft: "1.6vw", fontWeight: "400", fontSize: '1.3vw' }}>Novo email</h4>
      </div>
    </div>

    {/* Barra de Pesquisa */}
    <Grid container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar elevation={0} position="static" sx={{ top: "0", zIndex: "2", backgroundColor: "#C73E1D", minHeight: "5vw", minWidth: "100vw", paddingTop: "7px", paddingRight: "30px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={2}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: "0.8vw", color: "#3C3C3C" }}>
                  <img src={images.menu} style={{ width: "2vw", marginLeft: "2vw" }} />
                </IconButton>
                <img style={{ width: "2.3vw" }} src={images.gmail} />
                <Typography sx={{ color: "#000000", marginLeft: "1vw", fontSize: "2.5vw"}} variant="h6" component="div">
                  Cin-Mail
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}>
              <div style={{ marginLeft: "3vw", display: "flex", alignItems: "center", borderRadius: "40px", backgroundColor: "#E4EFFA", width: "55vw", height: "3.7vw" }}>
                <img src={images.lens} style={{ width: "1.3vw", height: "1.3vw", alignItems: "center", marginLeft: "15px" }} />
                <input style={{ marginLeft: "3vw", height: "3vw", width: "45vw", backgroundColor: "#E4EFFA", border: "none", outline: "none" }} />
              </div>
            </Grid>
          </div>
        </AppBar>
      </Box>
    </Grid>
    
    {/* Final da Pagina */}
    <h6 style={{fontWeight:"400",marginLeft:"28vw",fontSize:"1vw", color: "#000000"}}>Termos · Privacidade · Políticas do Programa</h6>
        
        </section>
    )
}

export default EmailsSpam;