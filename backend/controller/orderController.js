import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Order from "../model/orderModel.js";




export const newOrder = async (req, res) => {
    try {
        const {
            name,
            phone,
            orderDate,
            deliveryDate,
            reminderDate,
            paymentStatus,
            advanceAmount,
            modelBlouse,
            lining,
            amount,
            orderStatus,
            order_id 
        } = req.body;

        const user_id = req.id;
        if (!user_id) {
            return res.status(400).json({ success: false, message: "User ID is missing" });
        }

        // Extract image and audio files
        const imageFile = req.files?.image ? req.files.image[0] : null;
        const audioFile = req.files?.audio ? req.files.audio[0] : null;

        let imagePath = null;
        let audioPath = null;

        // Function to handle file uploads
        const handleFileUpload = async (file, uploadFunction, type) => {
            if (file) {
                try {
                    const result = await uploadFunction(file);
                    if (!result?.success) {
                        throw new Error(`${type} upload failed`);
                    }
                    return result.url;
                } catch (error) {
                    console.error(`Error during ${type} upload:`, error);
                    throw new Error(`${type} upload encountered an error`);
                }
            }
            return null;
        };

        // Upload image and audio files
        imagePath = await handleFileUpload(imageFile, uploadImage, "Image");
        audioPath = await handleFileUpload(audioFile, uploadAudio, "Audio");

        // 🔹 If order_id is provided, update the existing order
        if (order_id) {
            const order = await Order.findOne({ order_id });

            if (!order) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            // Keep existing image/audio if not updated
            imagePath = imagePath || order.dressPhoto;
            audioPath = audioPath || order.voiceNote;

            const updatedData = await Order.findOneAndUpdate(
                { order_id },
                {
                    user_id,
                    customerName: name,
                    dressPhoto: imagePath,
                    voiceNote: audioPath,
                    phone,
                    totalAmount: amount,
                    advanceAmount,
                    paymentStatus,
                    orderStatus,
                    withLining: lining,
                    modelDress: modelBlouse,
                    orderDate,
                    deliveryDate,
                    reminderDate
                },
                { new: true } 
            );

            return res.json({ success: true, updatedData, message: "Order Updated!" });
        }

        // 🔹 If no order_id, create a new order
        const lastOrder = await Order.findOne().sort({ order_id: -1 });
        const newOrderId = lastOrder ? lastOrder.order_id + 1 : 100; // Auto-increment order_id starting from 100

        const newOrder = await Order.create({
            order_id: newOrderId,
            user_id,
            customerName: name,
            dressPhoto: imagePath,
            voiceNote: audioPath,
            phone,
            totalAmount: amount,
            advanceAmount,
            paymentStatus,
            orderStatus,
            withLining: lining,
            modelDress: modelBlouse,
            orderDate,
            deliveryDate,
            reminderDate
        });

        return res.json({ success: true, message: "New Order Added!", order: newOrder });

    } catch (error) {
        console.error("Order creation failed:", error);
        return res.status(500).json({ success: false, message: "Failed, try later" });
    }
};




export const updatePaymentAndOrderStatus = async(req,res)=>{

    const {order_id,paymentStatus,orderStatus} = req.body;
   console.log(order_id)
    if (!order_id || !paymentStatus || !orderStatus) {
        return res.status(400).json({ success: false, message: "Invalid input parameters" });
    }

    try {
        const order = await Order.findOneAndUpdate({order_id}, {
            paymentStatus,
            orderStatus
        }, { new: true });

     if(order){
        return res.json({ success: true, message: "Status Changed !" });

     }

    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while updating the order status.", error: error.message });
    }
}





export const getOrder = async(req, res) => {

    const user_id = req.id;

    if (!user_id) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        
        const orders = await Order.find({ user_id });
        if (orders.length === 0) {
            return res.json({ success: true,orders:[], message: "No orders found" });
        }
     
        if (orders) {
            res.json({ success: true, orders });
            return;
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while fetching orders.", error: error.message });
    }

}




export const getOrderDetails = async(req,res)=>{

    const order_id = req.params.id;

    if (!order_id) {
        return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    try {
        
        const order = await Order.findOne({ order_id });
        if (!order) {
            return res.json({ success: true,orders:[], message: "No orders found" });
        }

        return res.status(200).json({ success: true, orders: [order] });

    } catch (error) {
        console.error(`Error fetching orders: ${error.message}`, error);
        return res.status(500).json({ success: false, message: "An error occurred while fetching orders.", error: error.message });
    }

}




export const deleteOrder = async (req, res) => {
    const { id } = req.params; 

    try {
        const order = await Order.findOneAndDelete({order_id:id})

        // Check if record is found and deleted
        if (!order) {
            return res.status(404).json({ success: false, message: "order not found" });
        }

        // Successful deletion
        return res.status(200).json({ success: true, message: "Order deleted successfully" });

    } catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};








// Cloudinary Image Upload Function
async function uploadImage(file) {
    return new Promise((resolve, reject) => {
        if (!file?.buffer) {
            return reject({ success: false, message: "Invalid image file" });
        }

        const safeFilename = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "image-files",
                resource_type: "image",
                public_id: safeFilename, // Unique filename to avoid conflicts
            },
            (error, result) => {
                if (error) {
                    console.error("Image upload error:", error);
                    return reject({ success: false });
                }
                resolve({ success: true, url: result.secure_url });
            }
        );

        // Convert the buffer to a readable stream and pipe it to Cloudinary
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
}

// Cloudinary Audio Upload Function
async function uploadAudio(file) {
    return new Promise((resolve, reject) => {
        if (!file?.buffer) {
            return reject({ success: false, message: "Invalid audio file" });
        }

        const safeFilename = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "audio-recordings",
                resource_type: "video", // Treating audio as video
                public_id: safeFilename,
            },
            (error, result) => {
                if (error) {
                    console.error("Audio upload error:", error);
                    return reject({ success: false });
                }
                resolve({ success: true, url: result.secure_url });
            }
        );

        // Convert the buffer to a readable stream and pipe it to Cloudinary
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
}