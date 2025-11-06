import type { FC, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export const TypographyH1: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    return (
        <h1 className={cn('text-3xl font-serif font-medium', className)}>
            {children}
        </h1>
    );
};

export const TypographyH2: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    return (
        <h2 className={cn('text-2xl font-serif font-medium', className)}>
            {children}
        </h2>
    );
};

export const TypographyH3: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    return (
        <h3 className={cn('text-xl font-serif font-medium', className)}>
            {children}
        </h3>
    );
};

export const TypographyH4: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    return (
        <h4 className={cn('text-lg font-serif font-medium', className)}>
            {children}
        </h4>
    );
};

export const TypographyP: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    return (
        <p className={cn('', className)}>
            {children}
        </p>
    );
};
