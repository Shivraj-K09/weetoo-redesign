import { Metadata } from "next";
import { ProfileTabs } from "@/components/profile/profile-tabs";

export const metadata: Metadata = {
  title: "Profile | Weetoo",
  description: "View your profile, settings, and notifications in Weetoo",
};

export default function Profile() {
  return (
    <div className="container flex flex-1 w-full gap-10 mx-auto py-5">
      <div className="border w-full flex flex-1">
        <ProfileTabs />
      </div>
    </div>
  );
}
