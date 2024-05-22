import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js"
import { User } from "../models/userSchema.js"
import { generateToken } from "../utils/jwtToken.js"
import cloudinary from "cloudinary"
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    let { firstName, lastName, email, phone, password, gender, role, dob } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob  || !role) {
        return next(new ErrorHandler("Please fill all required fields", 400))
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already exist", 400));
    }
    user = await User.create(
        {
            firstName, lastName, email, phone, password, gender, dob,  role
        });
    generateToken(user, "User Registered ", 200, res)
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password,  role } = req.body;
    if (!email || !password  || !role) {
        return next(new ErrorHandler("Please provide all details"), 400);
    }
    
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or email"), 400);
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or password"), 400);
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role not ound"), 400);
    }
    generateToken(user, "Logged in successfully ", 200, res)

});
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob } = req.body
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob ) {
        return next(new ErrorHandler("Please fill nall required field", 400))
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists`));
    }
    const admin = await User.create({ firstName, lastName, email, phone, password, gender, dob,  role: "Admin" })
    res.status(200).json({
        success: true,
        message: "New Admin registered successfully"
    })

})
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors
    })
})

export const getuserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
});


export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "",
        {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "Admin log out successfully...."
        })
});

export const logoutDoctor = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("doctorToken", "",
        {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "Doctor log out successfully...."
        })
});


export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "",
        {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "Patient log out successfully...."
        })
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avtar required", 400))
    }
    const { docAvtar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvtar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
    const { firstName, lastName, email, phone, password, gender, dob,  doctorDepartment } = req.body
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob  || !doctorDepartment) {
        return next(new ErrorHandler("Please fill all required fields", 400));
    }
    const isRegistered = await User.findOne({ email })
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already exists with this email`, 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvtar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("cloudinary error", cloudinaryResponse.error || "unknown cloudinary error")

    }
    const doctor = await User.create({ firstName, lastName, email, phone, password, gender, dob, doctorDepartment, role: "Doctor", 
    docAvtar:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url,
    },
    })
    res.status(200).json({
        success:true,
        message:"New doctor registered",
        doctor
    })
})