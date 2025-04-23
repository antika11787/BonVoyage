import mongoose from 'mongoose';
import { ITourMember } from '../interfaces/tourMember';

const tourMemberSchema = new mongoose.Schema<ITourMember>(
    {
        tourId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tour',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['LEADER', 'CO-LEADER', 'MEMBER'],
            required: true
        },
        walletId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Wallet',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const TourMember = mongoose.model('TourMember', tourMemberSchema);
export default TourMember;