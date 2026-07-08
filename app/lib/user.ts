import mongoose, { Schema, Model, models } from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

/**
 * User document interface
 */
export interface IUser {
  email: string;
  password: string;
  code?: string | null;
  createdAt: Date;
}

/**
 * User schema
 */
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  code: {
    type: String,
    default: null, // 👈 IMPORTANT
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Hash password before saving
 */
/** userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
}); */

/**
 * Prevent model overwrite in Next.js
 */
export const User: Model<IUser> =
  models.User || mongoose.model<IUser>("User", userSchema);
