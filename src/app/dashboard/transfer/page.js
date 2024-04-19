"use client";

import SecondaryButton from "../../../components/buttons/SecondaryButton";
import FormInput from "../../../components/formInput/FormInput";
import React, { useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  collection,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../../../lib/db";
import useUserData from "../../../utils/useUserData";

const Transfer = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useUserData();

  const onChange = (setter, e) => {
    setter(e.target.value);
  };

  const transferFunds = async (senderId, recipientEmail, amount) => {
    setLoading(true);
    try {
      const senderDocRef = doc(firestore, "users", senderId);
      const senderDocSnap = await getDoc(senderDocRef);
      const senderData = senderDocSnap.data();
      const senderBalance = senderData.walletBallance;

      if (senderBalance >= amount) {
        const recipientQuerySnapshot = await getDocs(
          query(
            collection(firestore, "users"),
            where("email", "==", recipientEmail)
          )
        );

        if (!recipientQuerySnapshot.empty) {
          const recipientDoc = recipientQuerySnapshot.docs[0];
          const recipientId = recipientDoc.id;
          const recipientDocRef = doc(firestore, "users", recipientId);
          const recipientDocSnap = await getDoc(recipientDocRef);
          const recipientData = recipientDocSnap.data();
          const recipientBalance = recipientData.walletBallance;

          // Deduct the transfer amount from sender's balance
          const updatedSenderBalance = senderBalance - amount;
          await updateDoc(senderDocRef, {
            walletBallance: updatedSenderBalance,
          });

          // Add the transfer amount to recipient's balance
          const updatedRecipientBalance = recipientBalance + amount;
          await updateDoc(recipientDocRef, {
            walletBallance: updatedRecipientBalance,
          });

          const transactionData = { amount, senderId, recipientId };
          const batch = writeBatch(firestore);
          batch.update(senderDocRef, {
            transactionHistory: arrayUnion(transactionData),
          });
          batch.update(recipientDocRef, {
            transactionHistory: arrayUnion(transactionData),
          });
          await batch.commit(batch);

          alert("Transfer successful");
          setAmount("");
          setEmail("");
        } else {
          alert("Recipient not found");
        }
      } else {
        alert("Insufficient balance");
      }
    } catch (error) {
      console.log(error);
      alert("Error transferring funds:");
    } finally {
      setLoading(false);
    }
  };

  // const isValidEmail = (email) => {
  //   return true; // Placeholder for email validation
  // };

  const isValidAmount = (amount) => {
    return parseFloat(amount) > 0;
  };

  const handleSubmit = () => {
    if (email || !isValidAmount(amount)) {
      alert("Invalid email or amount");
      return;
    }
    transferFunds(user.uid, email, parseFloat(amount));
  };

  return (
    <div className="px-4 content-start py-10 grid md:col-span-2 lg:col-span-4 md:px-8 md:max-h-screen md:py-5 mb-10 lg:gap-6 md:pt-12 md:mb-0 gap-5">
      <FormInput
        type={"mail"}
        id={"eMail"}
        value={email}
        onChange={(e) => onChange(setEmail, e)}
        placeholder={"Recipient's Email Address"}
      />
      <FormInput
        type={"number"}
        id={"amount"}
        value={amount}
        onChange={(e) => onChange(setAmount, e)}
        placeholder={"Amount"}
      />
      <SecondaryButton
        title={loading ? "Loading..." : "Send Money"}
        onClick={handleSubmit}
        disabled={loading}
        state={loading}
      />
    </div>
  );
};

export default Transfer;
