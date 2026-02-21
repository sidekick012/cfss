'use client'; 

import dynamic from "next/dynamic";

// Export the dynamically loaded component directly, rather than a function that returns it
export const ThemeToggler = dynamic(() => import("./theme-button"), {
    ssr: false,
    loading: () => <div className="w-6 h-6" />,
});