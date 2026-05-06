import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './config/ThemeContext';
import { Studio } from './pages/Studio'; // Sayfamızı import ediyoruz
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export default function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                {/* Tüm iş mantığı ve görsel düzen Studio bileşeninin içinde! */}
                <Studio />
                
                {/* Premium Glassmorphic Toast Notifications */}
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: 'var(--color-surface)',
                            color: 'var(--color-text-main)',
                            border: '1px solid var(--color-border)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            borderRadius: '20px',
                            fontSize: '12.5px',
                            fontWeight: '600',
                            padding: '12px 18px',
                            boxShadow: '0 15px 40px -10px rgba(0, 0, 0, 0.4)',
                        },
                        success: {
                            iconTheme: {
                                primary: 'var(--color-primary)',
                                secondary: 'var(--color-background)',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#FF4B4B',
                                secondary: 'var(--color-background)',
                            },
                        },
                    }}
                />
            </QueryClientProvider>
        </ThemeProvider>
    );
}