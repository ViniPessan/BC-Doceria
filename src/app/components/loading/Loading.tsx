// src/components/Loading.tsx
'use client'

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = "Carregando..." }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto"></div>
        
        {/* Mensagem */}
        <p className="text-pink-300 text-xl">{message}</p>
      </div>
    </div>
  );
};
