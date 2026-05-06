import { useState } from 'react';
import { Save, LayoutTemplate, Code2, Settings2, X } from 'lucide-react';
import { useCreateComponent, useUpdateComponent } from '../../hooks/useComponents';
import { cn } from '../../utils/cn';
import type { UIComponent } from '../../types/component';
import { toast } from 'react-hot-toast';

interface ComponentEditorProps {
    onSuccess: () => void;
    initialData?: UIComponent | null;
}

export function ComponentEditor({ onSuccess, initialData }: ComponentEditorProps) {
    const createMutation = useCreateComponent();
    const updateMutation = useUpdateComponent();

    const isEditMode = !!initialData;

    // --- Form State Management ---
    const [name, setName] = useState(initialData?.name || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [rawReact, setRawReact] = useState(initialData?.raw_react || '');
    const [rawHtml, setRawHtml] = useState(initialData?.raw_html || '');
    const [configString, setConfigString] = useState(
        initialData
            ? JSON.stringify(initialData.default_config, null, 2)
            : '{\n  "color": "#00D2FF",\n  "text": "Button"\n}'
    );
    const [jsonError, setJsonError] = useState('');

    // --- Handlers ---
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        // Sadece yeni kayıt modundaysak otomatik slug oluştur
        if (!isEditMode) {
            setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setJsonError('');

        let parsedConfig;
        try {
            parsedConfig = JSON.parse(configString);
        } catch {
            setJsonError('Geçersiz JSON formatı!');
            toast.error('Geçersiz JSON formatı! ⚠️');
            return;
        }

        const payload = {
            name,
            category,
            slug,
            raw_react: rawReact || null,
            raw_html: rawHtml || null,
            default_config: parsedConfig,
        };

        if (isEditMode && initialData) {
            updateMutation.mutate(
                { id: initialData.id, data: payload },
                { onSuccess: () => onSuccess() }
            );
        } else {
            createMutation.mutate(payload, {
                onSuccess: () => onSuccess()
            });
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <form onSubmit={handleSubmit} className="h-full flex flex-col w-full bg-surface/30">
            {/* Header / Actions */}
            <div className="px-8 py-4 border-b border-border flex items-center justify-between bg-surface/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3 text-primary">
                    <LayoutTemplate size={20} />
                    <h2 className="text-sm font-black uppercase tracking-[0.2em]">
                        {isEditMode ? 'Edit Component' : 'New Component'}
                    </h2>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onSuccess}
                        className="p-2 text-text-muted hover:text-white transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 px-6 py-2 bg-primary border border-primary text-background rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)] disabled:opacity-50 cursor-pointer active:scale-95"
                    >
                        <Save size={16} />
                        {isPending ? 'Saving...' : isEditMode ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">

                {/* Meta Data Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Component Name</label>
                        <input required value={name} onChange={handleNameChange} placeholder="e.g. Neon Button" className="w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Category</label>
                        <input required value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Buttons" className="w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Slug</label>
                        <input required value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-all" />
                    </div>
                </div>

                {/* Code Editors Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2 h-[400px] flex flex-col">
                        <label className="flex items-center gap-2 text-[10px] font-black text-green-400 uppercase tracking-[0.2em]">
                            <Code2 size={14} /> HTML & Tailwind
                        </label>
                        <textarea
                            value={rawHtml}
                            onChange={e => setRawHtml(e.target.value)}
                            className="flex-1 w-full bg-[#0A0A0A] border border-border rounded-2xl p-4 text-xs font-mono text-green-400/80 focus:border-green-500/40 outline-none resize-none"
                            placeholder='<button class="bg-[{{color}}]">...</button>'
                        />
                    </div>
                    <div className="space-y-2 h-[400px] flex flex-col">
                        <label className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                            <Code2 size={14} /> React (JSX)
                        </label>
                        <textarea
                            value={rawReact}
                            onChange={e => setRawReact(e.target.value)}
                            className="flex-1 w-full bg-[#0A0A0A] border border-border rounded-2xl p-4 text-xs font-mono text-primary/80 focus:border-primary/40 outline-none resize-none"
                            placeholder="export function MyButton() { ... }"
                        />
                    </div>
                </div>

                {/* Configuration Section */}
                <div className="space-y-2 h-64 flex flex-col pb-10">
                    <div className="flex justify-between items-center">
                        <label className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                            <Settings2 size={14} /> Default Configuration (JSON)
                        </label>
                        {jsonError && <span className="text-[10px] text-red-400 font-bold bg-red-400/10 px-2 py-1 rounded">{jsonError}</span>}
                    </div>
                    <textarea
                        value={configString}
                        onChange={e => setConfigString(e.target.value)}
                        className={cn(
                            "flex-1 w-full bg-[#0A0A0A] border rounded-2xl p-4 text-xs font-mono transition-all outline-none resize-none",
                            jsonError ? "border-red-500/50 text-red-400" : "border-border text-text-muted focus:border-primary/40"
                        )}
                    />
                </div>
            </div>
        </form>
    );
}