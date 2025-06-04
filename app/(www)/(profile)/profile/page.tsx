import { IdCard } from "@/components/profile/id-card";
import { ProfileSettingsForm } from "@/components/profile/profile-settings-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Weetoo",
  description: "View your profile, settings, and notifications in Weetoo",
};

export default function Profile() {
  const user = {
    id: "usr_123abc789xyz",
    fullName: "Shad CN",
    nickname: "shadcn",
    email: "shadcn@example.com",
    avatarUrl: "/placeholder.svg?width=120&height=120",
    joinDate: "2023-01-15",
    bio: "Building beautiful and accessible web experiences. Passionate about open source and design systems.",
    role: "Administrator",
    isVerified: true,
  };

  return (
    <div className="container flex flex-col gap-10 mx-auto py-4 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-1">
          <IdCard user={user} />
        </div>
        <div className="lg:col-span-2">
          <ProfileSettingsForm user={user} />
        </div>
      </div>
    </div>
  );
}
