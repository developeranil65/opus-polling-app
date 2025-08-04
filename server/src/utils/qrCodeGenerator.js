import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { uploadOnCloudinary } from "./cloudinary.util.js";

export const generateQRCodeAndUpload = async (text, name = "qr-code") => {
  try {
    // 1. Create unique filename
    const fileName = `${name}-${Date.now()}.png`;
    const filePath = path.join("public", "temp", fileName);

    // 2. Generate QR Code as PNG file
    await QRCode.toFile(filePath, text, {
      width: 300,
      margin: 2,
    });

    // 3. Upload to Cloudinary (this deletes file automatically if error)
    const cloudinaryResult = await uploadOnCloudinary(filePath);

    // 4. Return Cloudinary URL
    return cloudinaryResult?.secure_url;
  } catch (error) {
    console.error("QR Code generation/upload failed:", error);
    return null;
  }
};