import {catchAsyncErrors} from "../middleware/catchAsyncError.js"
import {ErrorHandler} from "../middleware/errorMiddleware.js"
import {Appointment} from "../models/appointmentSchema.js"
import {User} from "../models/userSchema.js"

export const postAppointment=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body)
    const {firstName,lastName,email,phone,dob,gender,appointment_date,department,doctor_firstName,doctor_lastName,hasVisited,address}=req.body;
    if(!firstName||!lastName||!email||!phone||!dob||!gender||!appointment_date||!department||!doctor_firstName||!doctor_lastName || !address){
        return next (new ErrorHandler("Please fill all the requireds fileds"))
    }
    const isConflict=await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDepartment:department
    });
    if(isConflict.length===0){
        return next(new ErrorHandler("Doctor not found",404));
    }
    if(isConflict.length>1){
        return next(new ErrorHandler("Doctor conflit found please contact through phone or email",404));
    }
    const doctorId=isConflict[0]._id;
    const patientId=req.user._id;
    const appointment=await Appointment.create({
        firstName,lastName,email,phone,dob,gender,appointment_date,department,doctor:{
            firstName:doctor_firstName,
            lastName:doctor_lastName,
        },hasVisited,address,doctorId,patientId
    });

    res.status(200).json({
        success:true,
        message:"Appointment sent successfully....",
        appointment
    })

});

export const getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
    const appointments=await Appointment.find();
    res.status(200).json({
        success:true,
        appointments,
    })
});

export const getAllUserAppointments=catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    // console.log(user)
    const appointments=await Appointment.find();
    let appointmentObj={...appointments}
    if(user.email){
        let data=[]
        for(let i in appointmentObj){
            if(appointmentObj[i].email== user.email){
                    data.push(
                        appointmentObj[i]
                    )
            }
        }
        res.status(200).json({
            success:true,
            data,
        })
    }
    
});

export const getDoctorAppointments=catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    // console.log(user)
    const appointments=await Appointment.find();
    let appointmentObj={...appointments}
    if(user.doctorDepartment){
        let data=[]
        for(let i in appointmentObj){
            if(appointmentObj[i].department== user.doctorDepartment){
                    data.push(
                        appointmentObj[i]
                    )
            }
        }
        res.status(200).json({
            success:true,
            data,
        })
    }
    
});

export const updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    let appointment=await Appointment.findById(id)
    if(!appointment){
        return next(new ErrorHandler("Appointment not found",404))
    }
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        message:"Appointment status updated successfully.....",
        appointment
    })
})

export const deleteAppointment=catchAsyncErrors(async(req,res,next)=>{
    const{id}=req.params
    let appointment=await Appointment.findById(id)
    if(!appointment){
        return next(new ErrorHandler("Appointment not found",400))
    }
    await appointment.deleteOne()
    res.status(200).json({
        success:true,
        message:"Appointment Deleted successfully"
    })
})