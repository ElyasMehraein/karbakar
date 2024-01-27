import { useRouter } from 'next/router'
 
export default function Name() {
  const router = useRouter()
  return <p>you are in {router.query.name} page</p>
}