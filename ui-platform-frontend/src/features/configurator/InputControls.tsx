// Farklı input tipleri için izole edilmiş, tekrar kullanılabilir bileşenler

export const ToggleControl = ({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
        />
        <div className="w-10 h-5 bg-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
    </label>
);

export const ColorControl = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <div className="flex items-center gap-3 bg-background/40 p-2 rounded-xl border border-border w-full">
        <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-6 h-6 rounded-md cursor-pointer bg-transparent border-none"
        />
        <span className="text-[10px] font-mono text-text-main uppercase tracking-widest">{value}</span>
    </div>
);

export const TextControl = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background/40 border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all outline-none"
    />
);