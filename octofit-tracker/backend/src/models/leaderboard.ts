import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  name: string;
  points: number;
  streak: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 }
}, { timestamps: true });

export const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
