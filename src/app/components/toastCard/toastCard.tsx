// components/Toast.tsx
import { useEffect } from "react";
import { Check, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  show: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`
      fixed z-50 
      top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96
      p-3 sm:p-4 
      rounded-lg shadow-xl border-2 
      transition-all duration-500 ease-in-out
      transform ${show ? 'translate-y-0 sm:translate-y-0 sm:translate-x-0 opacity-100' : '-translate-y-full sm:translate-y-0 sm:translate-x-full opacity-0'}
      ${type === 'success' 
        ? 'bg-gradient-to-r from-green-900 to-green-800 border-green-400 text-green-100 shadow-green-500/20' 
        : 'bg-gradient-to-r from-red-900 to-red-800 border-red-400 text-red-100 shadow-red-500/20'
      }
    `}>
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {type === 'success' ? (
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
          )}
          <span className="font-medium text-xs sm:text-sm leading-relaxed break-words">
            {message}
          </span>
        </div>
        <button
          onClick={onClose}
          className={`
            p-1 rounded-full transition-colors duration-200 flex-shrink-0
            ${type === 'success' 
              ? 'hover:bg-green-700/50 text-green-300 hover:text-green-100 active:bg-green-600/50' 
              : 'hover:bg-red-700/50 text-red-300 hover:text-red-100 active:bg-red-600/50'
            }
          `}
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
      
      {/* Barra de progresso - apenas mobile */}
      <div className={`
        block sm:hidden
        mt-2 h-1 rounded-full overflow-hidden
        ${type === 'success' ? 'bg-green-700' : 'bg-red-700'}
      `}>
        <div 
          className={`
            h-full rounded-full
            ${type === 'success' ? 'bg-green-400' : 'bg-red-400'}
          `}
          style={{
            animation: 'progress 4s linear forwards'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};