"use client";
import React, { useEffect, useState } from "react";
import avatar from "../../../images/avatar.png";
import Image from "next/image";
import FormInput from "../../../components/formInput/FormInput";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import useUserData from "../../../utils/useUserData";
import { auth, storage, updateProfile, firestore } from "../../../lib/db";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updatePassword } from "firebase/auth";

const Profile = () => {
  const userDetails = useUserData();
  const name = userDetails?.displayName;

  useEffect(() => {
    setFullName(name);
    setEmail(userDetails?.email);
  }, [userDetails]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pWord, setPWord] = useState("");
  const [img, setImg] = useState(null);
  const [newPword, setNewPword] = useState("");
  const [conPword, setConPword] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (setter, value) => {
    setter(value);
  };

  const handleProfileUpdate = async () => {
    let errorMessage = null;

    switch (true) {
      case newPword !== conPword:
        errorMessage = "New passwords do not match";
        break;
      case !email:
        errorMessage = "Email field cannot be empty";
        break;
      case !pWord:
        errorMessage = "Please, enter your password";
        break;

      default:
        const data = {
          fullName,
          email,
          pWord,
          newPword,
          conPword,
        };

        // Update user profile with displayName
        setLoading(true);
        const user = auth.currentUser;

        if (img) {
          const timestamp = Date.now();
          const fileName = `profileImage_${timestamp}.${img.name
            .split(".")
            .pop()}`;
          const storageRef = ref(storage, `/profileImages/${user.uid}`);
          const imageRef = ref(storageRef, fileName);

          try {
            await uploadBytes(imageRef, img);
            const imageUrl = await getDownloadURL(imageRef);

            // Update user profile with new image URL
            await updateProfile(user, { photoURL: imageUrl });

            // Update user profile data
            data.photoURL = imageUrl;

            if (newPword) {
              // If both new image and new password provided
              await updatePassword(user, newPword);
            }

            errorMessage = "Profile successfully updated";
          } catch (error) {
            console.error("Error uploading profile image:", error);
            errorMessage = "Failed to update profile";
          }
        } else if (newPword) {
          console.log("first");
          // If only new password provided
          try {
            await updatePassword(user, newPword);
            errorMessage = "Profile successfully updated";
          } catch (error) {
            console.error("Error updating password:", error);
            errorMessage = "Failed to update profile";
          }
        }

        setLoading(false);
        auth.signOut();
    }

    if (errorMessage) {
      alert(errorMessage);
    }
  };

  return (
    <div className="px-4 content-start py-10 grid md:col-span-2 lg:col-span-4 md:px-8 md:max-h-screen md:py-5 pb-10 lg:grid-flow-col lg:grid-cols-1 lg:gap-6 lg:pt-12 md:mb-0">
      <div className="grid gap-5 md:pt-[15%] lg:pt-0">
        <div className="mx-auto flex items-center text-black/70 gap-2">
          <Image
            src={userDetails?.photoURL ? userDetails?.photoURL : avatar}
            alt="avatar"
            className="size-20 rounded-full border-2 object-cover border-yalaPrimary"
            width={80}
            height={80}
          />
          <div>
            <h3 className="font-medium text-xl lg:text-lg">{name}</h3>
            <p className="text-[10px]">{userDetails?.email}</p>
          </div>
        </div>
        <form className="grid gap-4">
          <div className="lg:grid lg:grid-flow-col lg:grid-cols-2 gap-5 space-y-4">
            <div className="grid gap-4">
              <FormInput
                type={"text"}
                id={"fullName"}
                name={"fullName"}
                defaultValue={fullName}
                onChange={(e) => onChange(setFullName, e.target.value)}
                placeholder={name}
                disabled={true}
              />
              <FormInput
                type={"mail"}
                id={"eMail"}
                name={"eMail"}
                defaultValue={email}
                disabled={true}
                placeholder={"Email Address"}
              />
              <FormInput
                type={"password"}
                id={"oldPassword"}
                name={"oldPassword"}
                value={pWord}
                onChange={(e) => onChange(setPWord, e.target.value)}
                placeholder={"Old Password"}
              />
              <FormInput
                type={"password"}
                id={"newPassword"}
                name={"newPassword"}
                value={newPword}
                onChange={(e) => onChange(setNewPword, e.target.value)}
                placeholder={"New Password"}
              />
              <FormInput
                type={"password"}
                id={"confirmNewPassword"}
                value={conPword}
                onChange={(e) => onChange(setConPword, e.target.value)}
                name={"confirmNewPassword"}
                placeholder={"Confirm New Password"}
              />
            </div>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-400 border-dashed rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="sr-only"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </label>
          </div>
        </form>
        <SecondaryButton
          onClick={handleProfileUpdate}
          disabled={loading}
          state={loading}
          title={loading ? "Loading..." : "Update Profile"}
        />
      </div>
    </div>
  );
};

export default Profile;
