const doctorModel=require('../../Model/doctor');
const UserModel = require('../../Model/userModel');
const createDoctor = async (req, res) => {
        const { Name, Specialty , Availability,Email,Address,Time,Fees } = req.body;
        try {
            const newDoctor=new doctorModel({
                Name,
                Specialty,
                Availability,
                Email,
                Address,
                Time,
                Fees,
    
            })
    
            await newDoctor.save()
            res.status(200).json({
                success:true,
                message:'doctor created successfully',
                data:newDoctor
            })
       
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Failed to create patient',
            details: err.message || err
        });
    }
}

const showDoctor = async (req, res) => {
    try {  
        const doctors = await doctorModel.find({});
        if(!doctors || doctors.length === 0){
            return res.status(400).json({
                success:false,
                message:'No doctors found'
            });
        }
        return res.status(200).json({
            success:true,
            message:'Doctors data found',
            data:doctors
        });   
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctors',
            error: err.message || err
        });
    }
};
module.exports={createDoctor,showDoctor}