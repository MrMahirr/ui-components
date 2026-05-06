import type {UIComponent} from '../../types/component';
import {cn} from '../../utils/cn';

interface SidebarProps {
    components: UIComponent[];
    activeComponent: UIComponent;
    onSelect: (component: UIComponent) => void;
}

export function Sidebar({components, activeComponent, onSelect}: SidebarProps) {
    return (
        <aside className="w-64 border-r border-border bg-surface/30 flex flex-col h-full overflow-y-auto">
            <nav className="p-4 space-y-1">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 pl-2 mt-2">
                    Components
                </div>

                {components.map((comp) => (
                    <button
                        key={comp.id}
                        onClick={() => onSelect(comp)}
                        className={cn(
                            "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                            activeComponent.id === comp.id
                                ? "bg-primary/10 border-primary text-primary font-semibold shadow-[0_0_15px_rgba(59,130,246,0.05)]"
                                : "border-transparent text-text-muted hover:bg-surface-hover hover:text-text-main font-medium"
                        )}
                    >
                        {comp.name}
                    </button>
                ))}
            </nav>
        </aside>
    );
}