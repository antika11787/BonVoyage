import mongoose from "mongoose";
import { IPaidBy } from "../../interfaces/transaction";
import wallet from "../../models/wallet";
import split from "../../models/split";

export const createAdjustment = async (
  paidBy: [IPaidBy],
  custom: [IPaidBy],
  amount: number,
  tourId: mongoose.Schema.Types.ObjectId | string,
  transactionId: mongoose.Schema.Types.ObjectId | string
) => {
  // getting tours wallet no matter paid by tour wallet or not
  const generalTourWallet = await wallet.findOne({
    tourId,
  });

  // getting all wallets who paid to this transaction
  const paidByWallets = await wallet.find({
    _id: { $in: paidBy.map((p: IPaidBy) => p.walletId) },
  });

  // mapping wallet id to amount paid by that wallet
  let paidByBalanceMap: { [key: string]: number } = {};
  paidBy.map((p: IPaidBy) => {
    paidByBalanceMap[p.walletId.toString()] = p.amount;
  });

  // seperating tour wallet from all wallets who paid to this transaction
  const tourWallet = paidByWallets.filter((wallet) => {
    return wallet.tourId == tourId;
  });

  // seperating personal wallets from all wallets who paid to this transaction
  const personalWallets = paidByWallets.filter((wallet) => {
    return wallet.tourId == null;
  });

  // if tour wallet paid to this transaction then deduct amount from tour wallet
  if (tourWallet.length > 0) {
    const tourWalletBalance = tourWallet[0].balance;
    await wallet.updateOne(
      { _id: tourWallet[0]._id },
      {
        balance:
          tourWalletBalance - paidByBalanceMap[tourWallet[0]._id.toString()],
      }
    );
  }

  // if personal wallets paid to this transaction then add amount to personal wallets as contribution
  if (personalWallets.length > 0) {
    const bulkWalletUpdate = personalWallets.map((wallet) => {
      return {
        updateOne: {
          filter: { _id: wallet._id },
          update: {
            $inc: { balance: paidByBalanceMap[wallet._id.toString()] },
          },
        },
      };
    });
    await wallet.bulkWrite(bulkWalletUpdate);

    // keeping record of contribution of each personal wallet
    const bulkSplit = personalWallets.map((wallet) => {
      return {
        transactionId,
        walletId: wallet._id,
        amount: paidByBalanceMap[wallet._id.toString()],
        adjustmentType: "ADDITION",
      };
    });
    await split.insertMany(bulkSplit);

    // keeping record of personal wallet's contribution to tour wallet
    const bulkAddTotourWallet = personalWallets.map((wallet) => {
      return {
        transactionId,
        walletId: generalTourWallet?._id,
        amount: paidByBalanceMap[wallet._id.toString()],
        adjustmentType: "ADDITION",
      };
    });

    await split.insertMany(bulkAddTotourWallet);
  }

  // keeping record of deduction from tour wallet
  await split.create({
    transactionId,
    walletId: generalTourWallet?._id,
    amount: amount,
    adjustmentType: "DEDUCTION",
  });

  // deduction from personal wallet as consumed by each person
  if (custom.length > 0) {
    const bulkWalletUpdate = custom.map((wallet: IPaidBy) => {
      return {
        updateOne: {
          filter: { _id: wallet.walletId },
          update: { $inc: { balance: -wallet.amount } },
        },
      };
    });
    await wallet.bulkWrite(bulkWalletUpdate);

    // keeping record of deduction from each personal wallet
    const bulkSplit = custom.map((split: IPaidBy) => {
      return {
        transactionId,
        walletId: split.walletId,
        amount: split.amount,
        adjustmentType: "DEDUCTION",
      };
    });

    await split.insertMany(bulkSplit);
  }
};

export const deleteAdjustment = async (
  transactionId: string | mongoose.Schema.Types.ObjectId
) => {
  // getting all splits related to this transaction
  const allTransaction = await split.find({ transactionId });

  // reverting all the changes made by this transaction
  const bulkWalletUpdate = allTransaction.map((split) => {
    if (split.adjustmentType === "ADDITION") {
      return {
        updateOne: {
          filter: { _id: split.walletId },
          update: { $inc: { balance: -split.amount } },
        },
      };
    } else {
      return {
        updateOne: {
          filter: { _id: split.walletId },
          update: { $inc: { balance: split.amount } },
        },
      };
    }
  });

  await wallet.bulkWrite(bulkWalletUpdate);

  // deleting all splits related to this transaction
  await split.deleteMany({ transactionId });
};

export const updateAdjustment = async (
  paidBy: [IPaidBy],
  custom: [IPaidBy],
  amount: number,
  tourId: mongoose.Schema.Types.ObjectId | string,
  transactionId: mongoose.Schema.Types.ObjectId | string
) => {
  await deleteAdjustment(transactionId).then(async () => {
    await createAdjustment(paidBy, custom, amount, tourId, transactionId);
  });
};
