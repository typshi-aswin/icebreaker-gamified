import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.container}>
            <img src ='src\assets\mascot.png' className={styles.img}/>
            <p className={styles.footerText}> Gamified Icebreaker </p>
        </div>
    )
}

export default Footer;
