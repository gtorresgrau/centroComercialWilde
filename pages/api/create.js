import LocalesModel from "../../server/models/LocalesModel";
import { NextResponse } from "next/server";

export async function POST(req, res){ 
    console.log('estoy en create:', req.body);
    
    try{ 
        await LocalesModel.create(req.body);
        return NextResponse.json({message:`El local ${newLocal.name} fue creado exitosamente`}, {status:201})
    }catch(error){
        return NextResponse.json({message:'Error sarasa:', error}, {status:500})
    }
}

export async function GET(){
    console.log('estoy en get:', req.body);
    try{
        const allLocales = await LocalesModel.find();
        return NextResponse.json({allLocales}, {status:200})
        
    }catch(error){
        return NextResponse.json({message:'Error:', error}, {status:500})
    }
}

// localesSchema.statics.list= async function () {
//     return await this.find()
// };

// localesSchema.statics.get = async function (id) {
//     return await this.findById(id)
// };

// localesSchema.statics.insert = async function (data) {
//     return await this.create(data)
// };

// localesSchema.statics.delete = async function (id) {
//     return await this.findByIdAndDelete(id)
// };