import cloudinary from 'cloudinary'
import multer from 'multer'

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const storage = new multer.memoryStorage();

export const imageUploadUtil = async(file) =>{
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto',
    });
    return result;
}

export const upload = multer({storage});