export const runtime = 'edge';

import { auth } from "@/server/auth";
import { signOutAction } from "./actions"; // Adjust path if your actions file is elsewhere
import SubscribeButton from "@/components/SubscribeButton"; 

export default async function DashboardPage() {
  const session = await auth();

  // If they somehow land here without logging in, this is a fallback.
  // Ideally, middleware handles this, but it's good to be safe.
  if (!session?.user) {
    return (
      <div className="flex h-screen items-center justify-center text-neutral-500">
        Please sign in from edgehavenhosting.com to access your portal.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Welcome back, {session.user.name || "Homesteader"}.
          </p>
          <p className="text-sm text-neutral-500 mt-1">{session.user.email}</p>
        </div>
        
        {/* Sign Out Button */}
        <form action={signOutAction}>
          <button 
            type="submit"
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>

      {/* --- STRIPE PAYWALL SECTION --- */}
      <div className="p-8 bg-white dark:bg-neutral-900 rounded-[20px] shadow-sm border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-2xl font-semibold mb-3">Activate Your EdgeHaven Hosting</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg">
          Get full access to reliable, rock-solid web hosting. No hidden fees, no complicated tiers. Just pure performance for your homestead on the web.
        </p>
        
        <div className="max-w-xs">
          <SubscribeButton />
        </div>
      </div>
      
    </div>
  );
}