import Image from 'next/image'



export default function itsAvatar({ userCodeOrBusinessBrand }) {

    let avatarOrBrand = ""
    if (isNaN(userCodeOrBusinessBrand)) {
        avatarOrBrand = "brands"
    } else {
        avatarOrBrand = "avatars"
    }

    return <Image
        src={`/${avatarOrBrand}/${userCodeOrBusinessBrand}.jpg`}
        alt={userCodeOrBusinessBrand} quality={100}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
    />
}