// components/Toast.tsx
import { useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  show: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`
      fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-2 transition-all duration-300
      ${type === 'success' 
        ? 'bg-green-900 border-green-400 text-green-100' 
        : 'bg-red-900 border-red-400 text-red-100'
      }
    `}>
      <div className="flex items-center gap-2">
        {type === 'success' ? (
          <Check className="w-5 h-5 text-green-400" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-400" />
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
