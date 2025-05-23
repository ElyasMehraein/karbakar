import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import UserModel from "@/models/User";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(req, res) {
  try {
    await connectToDB()
    const formData = await req.formData();
    const image = formData.get("image");
    const imagePath = formData.get("imagePath");
    const buffer = Buffer.from(await image.arrayBuffer());
    const imageFullPath = path.join(process.cwd(), "images", imagePath);
    await writeFile(imageFullPath, buffer);

    // Update DB
    let imagePathParts = path.parse(imagePath);
    const headerOrAvatar = imagePathParts.dir;
    const userCodeOrBusinessName = imagePathParts.name;

    const isBusiness = isNaN(userCodeOrBusinessName);
    const Model = isBusiness ? BusinessModel : UserModel;
    const query = isBusiness ? { businessName: userCodeOrBusinessName } : { code: userCodeOrBusinessName };
    const update = headerOrAvatar === '/headers'
      ? { headerUrl: `/api/images${imagePath}` }
      : { avatarUrl: `/api/images${imagePath}` };

    await Model.findOneAndUpdate(query, update);

    return Response.json(
      { message: 'Image uploaded successfully' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error uploading image:', err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
