import { cn } from '../../utils/cn';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'rect' | 'circle';
    width?: string | number;
    height?: string | number;
    rounded?: string;
}

/**
 * Reusable premium high-contrast Skeleton loader component.
 * Leverages global CSS theme variables so contrast adjustments are completely synchronized
 * across both Dark (black background) and Light (white background) UI versions.
 */
export function Skeleton({ className, variant = 'rect', width, height, rounded }: SkeletonProps) {
    const isCircle = variant === 'circle';
    const isText = variant === 'text';

    return (
        <div
            className={cn(
                "relative overflow-hidden border border-border/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.01)]",
                isCircle ? "rounded-full" : isText ? "rounded-md h-3.5 w-5/6" : rounded || "rounded-2xl",
                className
            )}
            style={{
                backgroundColor: 'var(--color-skeleton-bg)',
                width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
                height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
            }}
        >
            {/* Shimmer overlay div utilizing centralized gradient values */}
            <div 
                className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
                style={{
                    background: 'linear-gradient(90deg, transparent, var(--color-skeleton-shimmer), transparent)'
                }}
            />
        </div>
    );
}
