import hands from "@/public/s-hands.png"
import Image from "next/image";
import styles from '@/styles/loading.module.css'

export default function page() {
  return (
    <div className={styles.Loading}>
      <header className={styles.loadnigHeader}>
        <Image 
          className={styles.LoadingLogo}
          src={hands}
          alt="karbakar loading logo"
        />

      </header>
    </div>
  );
}

