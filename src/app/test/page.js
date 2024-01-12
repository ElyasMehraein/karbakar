import Image from 'next/image'
import hands from "@/../public/m-hands.png"

export default function Page() {
  return (
    <div className="grid-element">
      <Image
        // fill
        src={hands}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
