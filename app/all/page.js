import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import AllBusinesses from "@/components/templates/allBusinesses/AllBusinesses";


export default async function page() {
try{

    connectToDB()
    const businesses = await BusinessModel.find({},"businessName bio businessBrand")
    
    
    return (
        <AllBusinesses businesses={businesses} />
    )
}catch(err){
    console.error('Error fetching businesses:', err);
    return (
        <div>
          <h1>An error occurred while fetching businesses.</h1>
          <p>Please try again later.</p>
        </div>
      );
}

}
