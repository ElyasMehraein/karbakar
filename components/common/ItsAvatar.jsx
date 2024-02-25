import Image from 'next/image'



export default function itsAvatar({ userCodeOrBusinessBrand, alt }) {
console.log("userCodeOrBusinessBrand",userCodeOrBusinessBrand);

    let avatarOrBrand = ""
    if (isNaN(userCodeOrBusinessBrand)) {
        avatarOrBrand = "brands"
    } else {
        avatarOrBrand = "avatars"
    }
    
    console.log(avatarOrBrand ,userCodeOrBusinessBrand , alt)
    return <Image src={`/${avatarOrBrand}/${userCodeOrBusinessBrand}.jpg`} alt={alt} width="64" height="64" />
}