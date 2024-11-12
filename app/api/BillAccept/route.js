import UserModel from '@/models/User';
import BusinessModel from '@/models/Business';
import BillModel from '@/models/Bill';
import ProductModel from '@/models/Product';
import { GET } from "@/app/api/auth/me/route";
import ReportModel from '@/models/Report';
import BusinessRelationModel from '@/models/BusinessRelation';

export async function PUT(req) {
    const body = await req.json();
    const { billId } = body;
    const response = await GET(req);
    const user = await response.json();

    try {
        const bill = await BillModel.findById(billId);
        if (!bill) {
            throw new Error('Document not found');
        }
        if (bill.to?.toString() !== user._id.toString()) {
            return new Response(
                JSON.stringify({ message: "You are not authorized to update the bill" }),
                { status: 403 }
            );
        }
        if (bill.accepted) {
            return new Response(
                JSON.stringify({ message: "It's not a pending bill" }),
                { status: 400 }
            );
        }

        const recipientBusiness = await BusinessModel.findById(bill.recipientBusiness);
        if (!recipientBusiness) {
            return new Response(
                JSON.stringify({ message: "Recipient business not found" }),
                { status: 404 }
            );
        }

        const providerBusiness = await BusinessModel.findById(bill.from);
        if (!providerBusiness) {
            return new Response(
                JSON.stringify({ message: "Provider business not found" }),
                { status: 404 }
            );
        }
        const businessRelation = await BusinessRelationModel.findOne({
            provider: providerBusiness._id,
            receiver: recipientBusiness._id,
        });

        const products = []
        for (let billProduct of bill.products) {
            const product = await ProductModel.findById(billProduct.product);
            if (!product) {
                return new Response(
                    JSON.stringify({ message: `Product not found: ${billProduct.product}` }),
                    { status: 404 }
                );
            }
            products.push({
                product: product._id,
                amount: billProduct.amount
            })
            let existingRecipientProduct = recipientBusiness.recipientProducts.find(
                (recipientProduct) =>
                    recipientProduct.guild?.toString() === product.guild.toString() &&
                    recipientProduct.unitOfMeasurement === product.unitOfMeasurement
            );

            if (existingRecipientProduct) {
                existingRecipientProduct.totalDelivered += billProduct.amount;
            } else {
                recipientBusiness.recipientProducts.push({
                    guild: product.guild,
                    unitOfMeasurement: product.unitOfMeasurement,
                    totalDelivered: billProduct.amount
                });
            }

            billProduct.accepted = true;

            await ProductModel.updateOne(
                { _id: billProduct.product },
                { $set: { billConfirm: true } }
            );
            if (businessRelation) {
                const existingProductInCommitment = providerBusiness.monthlyCommitment.find(
                    (commitmentProduct) => commitmentProduct.product.toString() === product._id.toString()
                );

                if (existingProductInCommitment) {
                    const currentMonth = new Date().getMonth() + 1;

                    if (existingProductInCommitment.lastDeliveredMonth === currentMonth) {
                        existingProductInCommitment.lastMonthDelivered += billProduct.amount;
                    } else if (existingProductInCommitment.lastDeliveredMonth === currentMonth - 1) {
                        existingProductInCommitment.previousMonthDelivered = existingProductInCommitment.lastMonthDelivered;
                        existingProductInCommitment.lastMonthDelivered = billProduct.amount;
                        existingProductInCommitment.lastDeliveredMonth = currentMonth;
                    }
                }
            }
        }

        await recipientBusiness.save();
        await providerBusiness.save();
        const recepiantUser = await UserModel.findOne({ code: providerBusiness.agentCode })
        await ReportModel.create({
            recepiant: recepiantUser._id,
            title: "billAccept",
            products,
            isSeen: false,
        });
        await BillModel.updateOne(
            { _id: billId },
            {
                $unset: { to: "", recipientBusiness: "" },
                $set: { accepted: true }
            }
        );

        return new Response(
            JSON.stringify({ message: "The bill was updated successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating the bill:", error);
        return new Response(
            JSON.stringify({ message: "Error updating the bill", error: error.message }),
            { status: 500 }
        );
    }
}
