import React from 'react'
import styles from '/loading.module.css'
import hands from "@/public/m-hands.png"

function loading() {
    return (
        <div className={styles.Loading}>
            <header className={styles.Loading - header}>
                <img src={hands} className={styles.Loading - logo} alt="logo" />
            </header>
        </div>
    )
}

export default loading
