import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import UserModel from "@/models/User";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(req, res) {
  try {
    const formData = await req.formData()
    const image = formData.get("image")
    const imagePath = formData.get("imagePath")
    const buffer = Buffer.from(await image.arrayBuffer())
    const imageFullPath = path.join(process.cwd(), "public/" + imagePath);
    await writeFile(imageFullPath, buffer);

    // update DB
    let imagePathParts = path.parse(imagePath);
    const headerOrAvatar = imagePathParts.dir;
    const userCodeOrBusinessName = imagePathParts.name;
    
    const isBusiness = isNaN(userCodeOrBusinessName);
    const Model = isBusiness ? BusinessModel : UserModel;
    const query = isBusiness ? {businessName: userCodeOrBusinessName} : {code: userCodeOrBusinessName};
    const update = headerOrAvatar === 'Headers' ? {isHeader: true} : {isAvatar: true};
    
    await Model.findOneAndUpdate(query, update);
    



    return Response.json(
      { message: 'image uploaded successfully' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error uploading image:', err);
    return Response.json({ message: err }, { status: 500 });
  }
}
