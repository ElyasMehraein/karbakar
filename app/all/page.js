import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import AllBusinesses from "@/components/templates/allBusinesses/AllBusinesses";
import { notFound } from "next/navigation";

export default async function page() {
  try {

    connectToDB()
    const businesses = await BusinessModel.find({}, "businessName bio businessBrand isAvatar")


    return (
      <AllBusinesses businesses={businesses} />
    )
  } catch (err) {
    console.error('Error fetching businesses:', err);
    return (
      notFound()
    );
  }

}
