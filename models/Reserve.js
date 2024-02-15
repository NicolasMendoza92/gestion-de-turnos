import mongoose, { Schema, models } from "mongoose";

const ReserveSchema = new Schema(
    {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      date:{
        type:Date, 
        required:true,
      },
      time: {
        type: String,
        required:true,
      },
      cita:{
        type: String, 
      },
      status: {
        type: String,
        default: 'confirmada',
      }
    },
    { timestamps: true }
  );

const Reserve = models.Reserve || mongoose.model("Reserve", ReserveSchema);
export default Reserve;