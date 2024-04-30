import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import dynamic from 'next/dynamic'
const AllBusinesses = dynamic(() => import("@/components/templates/allBusinesses/AllBusinesses"))

const page = async function () {
    await connectToDB();
    const businesses = JSON.parse(JSON.stringify(await BusinessModel.find({},
       "businessName bio businessBrand isAvatar").catch(err => {
        console.error(err);
    })));


    return (
      <AllBusinesses businesses={businesses} />
      // <h1 className="inMiddle">تست</h1>

    );


}

export default page