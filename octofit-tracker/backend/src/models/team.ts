import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
  captain: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  members: [{ type: String }],
  captain: { type: String, required: true }
}, { timestamps: true });

export const Team = mongoose.model<ITeam>('Team', teamSchema);
