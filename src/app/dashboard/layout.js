"use client";
import Navbar from "../../components/navigation/Navbar";
import UserSummary from "../../components/userMenuSummary/UserSummary";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../images/yalaLogo.svg";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import withAuth from "../../utils/ProtectedRoute";
import { auth } from "../../lib/db";
import useUserData from "../../utils/useUserData";

const layout = ({ children }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const dashMenu = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Transfer", link: "/dashboard/transfer" },
    { name: "Profile", link: "/dashboard/profile" },
  ];

  const pathname = usePathname();
  const isActive = (arg) => pathname === arg;

  const user = useUserData();

  const [mobile, setMobile] = useState(false);

  const toggleMenu = () => {
    setMobile((oldstate) => !oldstate);
  };

  return (
    <div className="bg-slate-300 min-h-screen">
      <div className="md:hidden">
        <Navbar onClick={toggleMenu} />
      </div>
      {mobile && (
        <div
          className="bg-black/50 fixed z-40 h-screen w-full top-0 left-0 md:hidden"
          onClick={toggleMenu}
        >
          <div
            className="bg-slate-300 grid px-[10%] content-center h-screen w-3/4 absolute right-0 rounded-l-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative grid gap-5">
              {dashMenu.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.link}
                  onClick={toggleMenu}
                  className={
                    isActive(menu.link)
                      ? "bg-slate-400 px-2 py-3 rounded-lg text-white text-start"
                      : "hover:text-yalaPrimary/50 transition text-start"
                  }
                >
                  {menu.name}
                </Link>
              ))}
              <button
                className="hover:text-yalaPrimary/50 transition text-start"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-full md:grid md:grid-cols-3 lg:grid-cols-5">
        <div className="hidden max-w-full md:block h-screen bg-slate-700 px-6 sticky top-0 left-0 py-10 md:grid md:content-between">
          <Image src={Logo} alt="logo" />
          <div className="grid text-white/70 font-medium text-2xl">
            {dashMenu.map((menu, index) => (
              <Link
                key={index}
                href={menu.link}
                // onClick={menu.link}
                className={
                  isActive(menu.link)
                    ? "bg-slate-400/65 px-2 py-1 rounded-lg text-yalaPrimary/50 text-start"
                    : "hover:text-yalaPrimary/50 transition text-start"
                }
              >
                {menu.name}
              </Link>
            ))}
            <button
              className="hover:text-yalaPrimary/50 transition text-start"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <UserSummary
            username={user ? user?.displayName : ""}
            email={user ? user?.email : ""}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default withAuth(layout);
