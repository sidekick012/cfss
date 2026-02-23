import { auth } from "@/server/auth";
import SubscribeButton from "@/components/SubscribeButton";

export default async function Dashboard() {
  const session = await auth();

  // In the future, we will query your D1 database right here 
  // to check if their `stripeSubscriptionId` is active before showing this block.

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-10">
        Welcome back, {session?.user?.name}.
      </p>

      {/* --- PAYWALL SECTION --- */}
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