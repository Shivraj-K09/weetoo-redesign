import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MailIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  HashIcon,
} from "lucide-react";
import type { UserProfileData } from "./profile-types";

interface IdCardProps {
  user: UserProfileData;
}

export function IdCard({ user }: IdCardProps) {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="border-border">
      <CardHeader className="">
        <div className="bg-muted/20 p-6 border rounded-lg flex flex-col items-center text-center">
          <Avatar className="w-28 h-28 mb-4 border-4 border-background shadow-md">
            <AvatarImage
              src={
                user.avatarUrl ||
                "/placeholder.svg?width=120&height=120&query=user+avatar"
              }
              alt={user.fullName}
            />
            <AvatarFallback className="text-4xl bg-gradient-to-br from-primary/70 to-primary">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold">{user.fullName}</h2>
          <p className="text-sm text-primary">@{user.nickname}</p>
          {user.isVerified && (
            <Badge
              variant="outline"
              className="mt-3 border-green-500/50 text-green-600 dark:text-green-400 bg-green-500/10"
            >
              <ShieldCheckIcon className="w-3.5 h-3.5 mr-1.5" />
              Verified Account
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        {user.bio && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
              Bio
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {user.bio}
            </p>
          </div>
        )}

        <div className="space-y-1.5">
          <h4 className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
            Contact
          </h4>
          <div className="flex items-center text-sm text-foreground/90">
            <MailIcon className="w-4 h-4 mr-3 text-muted-foreground flex-shrink-0" />
            <span>{user.email}</span>
          </div>
        </div>

        <Separator className="my-4 bg-border/60" />

        <div className="space-y-3">
          <h4 className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
            Details
          </h4>
          <div className="flex items-center text-sm text-foreground/90">
            <CalendarDaysIcon className="w-4 h-4 mr-3 text-muted-foreground flex-shrink-0" />
            <span>
              Joined:{" "}
              {new Date(user.joinDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center text-sm text-foreground/90">
            <BriefcaseIcon className="w-4 h-4 mr-3 text-muted-foreground flex-shrink-0" />
            <span>Role: {user.role}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/90">
            <HashIcon className="w-4 h-4 mr-3 text-muted-foreground flex-shrink-0" />
            <span className="truncate">ID: {user.id}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
