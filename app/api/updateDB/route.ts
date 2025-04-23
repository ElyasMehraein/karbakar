import { NextResponse } from 'next/server';
import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from '@/models/Bill';
import { Model } from 'mongoose';

interface UpdateRequest {
  model: string;
  id: string;
  fieldName: string;
  newValue: any;
}

export async function PUT(req: Request) {
    const body = await req.json() as UpdateRequest;
    let { model, id, fieldName, newValue } = body;
    
    let modelInstance: Model<any>;
    switch (model) {
        case "UserModel":
            modelInstance = UserModel;
            break;
        case "BusinessModel":
            modelInstance = BusinessModel;
            break;
        case "BillModel":
            modelInstance = BillModel;
            break;
        default:
            return NextResponse.json(
                { message: "Invalid model name" },
                { status: 400 }
            );
    }

    try {
        const doc = await modelInstance.findById(id);
        if (!doc) {
            throw new Error('Document not found');
        }
        doc[fieldName] = newValue;
        await doc.save();
        console.log(`${fieldName} updated successfully.`);
        return NextResponse.json(
            { message: `${fieldName} updated successfully.` },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(`Error updating ${fieldName}:`, error);
        return NextResponse.json(
            { message: `Error updating ${fieldName}`, error: error.message },
            { status: 500 }
        );
    }
} 