import LocalesModel from "../models/LocalesModel";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const newLocal = await req.json().formData;
        await LocalesModel.create(newLocal);
        return NextResponse.json({message:`El local ${newLocal.name} fue creado exitosamente`}, {status:201})
        
    }catch(error){
        return NextResponse.json({message:'Error:', error}, {status:500})
    }
}


localesSchema.statics.list= async function () {
    return await this.find()
};

localesSchema.statics.get = async function (id) {
    return await this.findById(id)
};

localesSchema.statics.insert = async function (data) {
    return await this.create(data)
};

localesSchema.statics.delete = async function (id) {
    return await this.findByIdAndDelete(id)
};