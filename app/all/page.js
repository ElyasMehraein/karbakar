import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import AllBusinesses from "@/components/templates/allBusinesses/AllBusinesses";

export default async function page() {
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

