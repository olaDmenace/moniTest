"use client";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import CreditCard from "../../components/creditCard/CreditCard";
import TransactionItem from "../../components/transaction/TransactionItem";
import useUserData from "../../utils/useUserData";
import { firestore } from "../../lib/db";
import { useEffect, useState } from "react";
import FormInput from "../../components/formInput/FormInput";
import SecondaryButton from "../../components/buttons/SecondaryButton";
// import { auth } from "@/lib/db";
// import { useEffect, useState } from "react";

const Dashboard = () => {
  // const sorts = ["All", "Revenue", "Expense"];
  const user = useUserData();
  // console.log(user);

  const [userData, setUserData] = useState(null);
  const [pop, setPop] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // let userData;
  const fetchUserData = async (id) => {
    try {
      const userDocRef = doc(firestore, "users", id);

      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap) {
        // console.log(userDocSnap.data());
        // console.log(Array.isArray(userDocSnap.data().transactionHistory));
        // console.log(userDocSnap.data().transactionHistory);
        // console.log(typeof userDocSnap.data().transactionHistory);
        setUserData(userDocSnap.data());
      } else {
        console.log("Data not found");
      }
    } catch (error) {
      console.error("Error fetching document", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
      console.log(user.uid);
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
      // console.error("Error depositing money:", error);
      alert("Deposit declined");
    }
    setLoading(false);
  };

  // const objectToArray = (obj) => {
  //   return Object.entries(obj).map(([key, value]) => ({ key, value }));
  // };

  const objectToArray = (obj) => {
    if (obj == null) return []; // Return an empty array if obj is nullish
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  };

  return (
    <div className="px-4 overflow-clip content-start py-10 grid gap-16 md:col-span-2 lg:col-span-4 md:px-8 md:max-h-screen md:py-5 mb-10 lg:grid-flow-col lg:grid-cols-2 lg:gap-12 lg:pt-12 md:mb-0">
      {pop && (
        <div
          className="w-screen fixed h-full bg-black/50 top-0 left-0 z-30 grid content-center"
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
              {/* <div className="flex justify-around lg:justify-between">
                {sorts.map((sort, index) => (
                  <button key={index} className="font-bold lg:font-semibold">
                    {sort}
                  </button>
                ))}
              </div> */}
              <div className="h-96 md:h-[850px] overflow-y-auto divide-y md:px-4 lg:px-0">
                {userData?.transactionHistory.map((item, index) => (
                  <TransactionItem
                    key={index}
                    amount={item.amount}
                    spendType={
                      item.senderId === user.uid ? "Outflow" : "Inflow"
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
