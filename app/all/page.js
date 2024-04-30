import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import dynamic from 'next/dynamic'
const AllBusinesses = dynamic(() => import("@/components/templates/allBusinesses/AllBusinesses"))

const page = async function () {
  try {
    await connectToDB();
    const businesses = JSON.parse(JSON.stringify(await BusinessModel.find({}, "businessName bio businessBrand isAvatar")));


    return (
      <AllBusinesses businesses={businesses} />
      // <h1 className="inMiddle">تست</h1>

    );
  } catch (err) {

    console.error('Error fetching businesses:', err);
  }
}

export default page