import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import AllBusinesses from "@/components/templates/allBusinesses/AllBusinesses";
import { notFound } from "next/navigation";

export default async function page() {
  try {
    connectToDB();
    console.log("db connected for allBusinesses");
    const businesses = JSON.parse(JSON.stringify(await BusinessModel.find({}, "businessName bio businessBrand isAvatar")));
    console.log("allBusinesses data is", businesses);


    return (
      <AllBusinesses businesses={businesses} />
    );
  } catch (err) {
    console.error('Error fetching businesses:', err);
    // return notFound();
  }
}

