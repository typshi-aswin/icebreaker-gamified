import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.container}>
            <img src ='/mascot.png' className={styles.img} alt='footer'/>
            <p className={styles.footerText}> Gamified Icebreaker </p>
        </div>
    )
}

export default Footer;
