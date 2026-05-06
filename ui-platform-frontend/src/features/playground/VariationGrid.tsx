import { SandboxIframe } from './SandboxIframe';
import { useComponentStore } from '../../store/useComponentStore';

/**
 * VariationGrid renders a beautiful 2x2 preview canvas,
 * forcing distinct browser states (Default, Hover, Active, Disabled) simultaneously on the active component.
 */
export function VariationGrid() {
    const { activeComponent, currentConfig, selectedFont, globalStyles } = useComponentStore();

    if (!activeComponent) return null;

    const states: { label: string; value: 'hover' | 'active' | 'focus' | 'disabled' | undefined; desc: string }[] = [
        { label: 'Default', value: undefined, desc: 'Normal interactive display' },
        { label: 'Forced Hover', value: 'hover', desc: 'Emulates hover mouseover styles' },
        { label: 'Forced Active', value: 'active', desc: 'Emulates click/pressed styles' },
        { label: 'Forced Disabled', value: 'disabled', desc: 'Emulates disabled form inputs' },
    ];

    return (
        <div className="w-full h-full p-6 overflow-y-auto bg-background/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {states.map((state) => (
                    <div 
                        key={state.label}
                        className="rounded-3xl border border-border bg-surface/30 backdrop-blur-md overflow-hidden flex flex-col h-[280px] shadow-lg hover:border-primary/20 hover:shadow-[0_10px_30px_rgba(0,210,255,0.02)] transition-all group"
                    >
                        {/* Frame Header */}
                        <div className="px-5 py-3 border-b border-white/5 bg-white/[0.02] flex items-center justify-between select-none">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                                {state.label}
                            </span>
                            <span className="text-[9px] text-text-muted/60 font-bold uppercase tracking-widest">
                                {state.desc}
                            </span>
                        </div>

                        {/* Sandbox Render Box */}
                        <div className="flex-1 relative bg-background/10 overflow-hidden p-6 flex items-center justify-center">
                            {/* Custom background visual grids */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
                            
                            <SandboxIframe 
                                html={activeComponent.raw_html} 
                                config={currentConfig}
                                forcedState={state.value}
                                fontFamily={selectedFont}
                                globalStyles={globalStyles}
                                reactCode={activeComponent.raw_react}
                                componentName={activeComponent.name}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
