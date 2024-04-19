"use client";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import CreditCard from "../../components/creditCard/CreditCard";
import TransactionItem from "../../components/transaction/TransactionItem";
import useUserData from "../../utils/useUserData";
import { firestore } from "../../lib/db";
import { useEffect, useState } from "react";
import FormInput from "../../components/formInput/FormInput";
import SecondaryButton from "../../components/buttons/SecondaryButton";

const Dashboard = () => {
  // const sorts = ["All", "Revenue", "Expense"];
  const user = useUserData();
  // console.log(user);

  const [userData, setUserData] = useState(null);
  const [pop, setPop] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch user data by ID
  const fetchUserDataById = async (userId) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        return userDocSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
      return null;
    }
  };

  // Function to fetch sender data
  const fetchSenderData = (senderId) => {
    return fetchUserDataById(senderId)
      .then((senderData) => {
        return senderData.displayName;
      })
      .catch((error) => {
        console.error("Error fetching sender data:", error);
      });
  };

  // Function to fetch recipient data
  const fetchRecipientData = (recipientId) => {
    return fetchUserDataById(recipientId)
      .then((senderData) => {
        return senderData.displayName;
      })
      .catch((error) => {
        console.error("Error fetching sender data:", error);
      });
  };

  // Inside your fetchUserData function
  const fetchUserData = async (id) => {
    try {
      const userDocRef = doc(firestore, "users", id);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // Extract senderId and recipientId for each transaction
        const transactions = await Promise.all(
          userData.transactionHistory.map(async (transaction) => {
            // Fetch sender and recipient data
            const sender = await fetchSenderData(transaction.senderId);
            const recipient = await fetchRecipientData(transaction.recipientId);

            return {
              amount: transaction.amount,
              sender: sender,
              recipient: recipient,
            };
          })
        );

        setUserData(userData);
      } else {
        alert("Data not found");
      }
    } catch (error) {
      console.error("Error fetching document", error);
      alert("Error fetching document");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
    }
  }, [user]);

  const addMoney = async () => {
    setLoading(true);
    try {
      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, {
        walletBallance: increment(amount),
      });
      alert("Deposit Successful");
      setPop(false);
      window.location.reload();
    } catch (error) {
      alert("Deposit declined");
    }
    setLoading(false);
  };

  return (
    <div className="px-4 overflow-clip content-start py-10 grid gap-16 md:col-span-2 lg:col-span-4 md:px-8 md:max-h-screen md:py-5 pb-10 lg:grid-flow-col lg:grid-cols-2 lg:gap-12 lg:pt-12 md:mb-0">
      {pop && (
        <div
          className="w-screen fixed h-full bg-black/50 top-0 left-0 z-20 grid content-center"
          onClick={() => setPop(false)}
        >
          <div
            className="bg-slate-300 px-3 py-6 rounded-lg w-3/4 md:w-1/2 lg:w-1/4 mx-auto grid gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <FormInput
              placeholder={"Amount"}
              id={"amount"}
              required={true}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              name={"amount"}
              type={"number"}
              min={0}
            />
            <SecondaryButton
              title={loading ? "Loading..." : "Add Money"}
              onClick={addMoney}
              disabled={loading}
              state={loading}
            />
          </div>
        </div>
      )}
      <div>
        <CreditCard
          balance={userData ? userData?.walletBallance : ""}
          name={userData ? userData?.displayName : ""}
        />
        <div className="mt-[15%]">
          <SecondaryButton title={"Add Money"} onClick={() => setPop(true)} />
        </div>
      </div>
      <div className="space-y-10 md:space-y-5 lg:space-y-2">
        <div className="flex justify-between items-center text-sm text-black/50">
          <h2 className="font-bold text-2xl lg:text-xl text-black">
            Transactions
          </h2>
          {/* <button>View All</button> */}
        </div>
        <div className="space-y-5 md:space-y-2">
          {userData?.transactionHistory.length === 0 ? (
            <p className="text-center font-semibold">
              You have not performed any transactions
            </p>
          ) : (
            <>
              <div className="h-96 md:h-[850px] overflow-y-auto divide-y md:px-4 lg:px-0">
                {userData?.transactionHistory.map((item, index) => (
                  <TransactionItem
                    key={index}
                    amount={item.amount}
                    sender={
                      item.senderId === user?.uid
                        ? fetchRecipientData(item?.recipientId)
                        : fetchSenderData(item?.senderId)
                    }
                    sent={item.senderId === user?.uid}
                    spendType={
                      item.senderId === user?.uid ? "Sent to" : "Received From"
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
