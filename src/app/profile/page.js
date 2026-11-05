import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { requireUser } from "@/lib/require-user";

export const metadata = {
  title: "My Profile",
};

export default async function ProfilePage() {
  const user = await requireUser("/profile");
  const initial = user.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <section className="mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">My Profile</h1>

      <div className="rounded-xl border bg-card p-6 text-card-foreground">
        <Avatar className="size-16">
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>

        <dl className="mt-5 space-y-4">
          <div>
            <dt className="text-sm text-muted-foreground">Name</dt>
            <dd className="mt-1 font-semibold">{user.name}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Email</dt>
            <dd className="mt-1 break-all">{user.email}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}