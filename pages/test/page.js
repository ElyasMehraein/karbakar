import Image from 'next/image'
import hands from "@/../public/m-hands.png"
import { mainTabYourReqText } from '../../../public/typoRepo'
import Typography from '@mui/material/Typography'
import YourReq from '@/components/index/indexDatas/YourReq'
export default function Page() {
  return (
    <div className="grid-element">
      <Image
        priority
        alt='hich'
        src={hands}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <YourReq/>
      <Typography>
        {mainTabYourReqText}
      </Typography>
    </div>
  )
}
