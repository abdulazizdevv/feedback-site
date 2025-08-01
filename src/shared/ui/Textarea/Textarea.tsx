import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'border-[#D0D5DD] placeholder:text-muted-foreground text-sm text-foreground bg-transparent rounded-md border px-3 py-2 shadow-xs transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-16 w-full resize-y',
        'focus:border-primary focus:ring-2 focus:ring-[var(--primary-ring)]',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
