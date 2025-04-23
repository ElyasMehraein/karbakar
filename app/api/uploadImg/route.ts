import connectToDB from "@/configs/db";
import BusinessModel from "@/models/Business";
import UserModel from "@/models/User";
import { writeFile } from "fs/promises";
import path from "path";

interface UploadRequestBody {
    image: File;
    imagePath: string;
}

export async function PUT(req: Request): Promise<Response> {
    try {
        await connectToDB();
        const formData = await req.formData();
        const image = formData.get("image") as File;
        const imagePath = formData.get("imagePath") as string;
        
        if (!image || !imagePath) {
            return Response.json(
                { message: "Image and imagePath are required" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await image.arrayBuffer());
        const imageFullPath = path.join(process.cwd(), "images", imagePath);
        await writeFile(imageFullPath, buffer);

        // Update DB
        const imagePathParts = path.parse(imagePath);
        const headerOrAvatar = imagePathParts.dir;
        const userCodeOrBusinessName = imagePathParts.name;

        const isBusiness = isNaN(Number(userCodeOrBusinessName));
        const Model = isBusiness ? BusinessModel : UserModel;
        const query = isBusiness 
            ? { businessName: userCodeOrBusinessName } 
            : { code: Number(userCodeOrBusinessName) };
        
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
        return Response.json(
            { message: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
} 