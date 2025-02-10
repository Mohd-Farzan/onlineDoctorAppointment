const doctorModel=require('../../Model/doctor')
module.exports.createDoctor = async (req, res) => {
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

module.exports.showDoctor = async (req, res) => {
    try {

        let doctor = await doctormodel.find();
         res.render("showdoc",{doctor});


       
    } catch (err) {
        console.error(err);
     
    }
};