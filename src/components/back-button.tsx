'use client';
import { useRouter } from 'next/navigation';

function BackButton({ className, children }: React.PropsWithChildren<{className?: string}>) {
    const router = useRouter();
    return (
        <button type="button"
                className={`${className} text-white bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                onClick={() => router.back()}>
            {children}
        </button>
    );
}

export default BackButton;