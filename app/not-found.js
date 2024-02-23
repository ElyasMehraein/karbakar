import styles from '@/styles/not-found.module.css'
import notFoundImg from "@/public/404.jpg"
import Image from "next/image";
export default function Custom404() {
  return (
    <>
      <div className={styles.main}>
        <Image
          className={styles.notFoundLogo}
          src={notFoundImg}
          alt="karbakar not-found logo"
          priority
          width={300}
        />
        <h1>صفحه مورد نظر یافت نشد</h1>
      </div>
    </>
  )

}