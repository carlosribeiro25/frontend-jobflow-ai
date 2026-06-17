import type { Toast, ToastType } from "@/modules/auth/hooks/useToast";
import type { JSX } from "react/jsx-runtime";

type ToastContainerProps = {
    toasts: Toast[];
    removeToast: (id: number) => void;
};

const icons: Record<ToastType, JSX.Element> = {
    success: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ),
    error: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    warning: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
        </svg>
    ),
    info: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        </svg>
    ),
};

const styles: Record<ToastType, string> = {
    success: "border-green-500 bg-green-800 text-green-100",
    error: "border-red-500 bg-red-900 text-red-100",
    warning: "border-yellow-400 bg-yellow-800 text-yellow-100",
    info: "border-sky-400 bg-sky-900 text-sky-100",
};

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
    return (
        <>
            <div className="fixed right-5 top-5 z-50 flex w-80 flex-col gap-3">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`flex animate-[slideIn_0.3s_ease] items-start gap-3 rounded-lg border p-4 shadow-lg ${styles[toast.type]}`}
                    >
                        <span className="mt-0.5 shrink-0">{icons[toast.type]}</span>
                        <p className="flex-1 text-sm">{toast.message}</p>
                        <button
                            type="button"
                            onClick={() => removeToast(toast.id)}
                            className="shrink-0 cursor-pointer opacity-60 transition-opacity hover:opacity-100"
                            aria-label="Fechar notificação"
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(60px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </>
    );
}
