import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const inputVariants = cva(
  'flex w-full transition-colors shadow-sm outline-none border bg-white disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-[#D0D5DD]  focus:border-primary focus:ring-1 focus:ring-[var(--primary-ring)]',
        error:
          'border-red-500  focus:border-red-600 focus:ring-4 focus:ring-red-100',
        success:
          'border-green-500  focus:border-green-600 focus:ring-4 focus:ring-green-100',
      },
      size: {
        default: 'px-4 py-3 h-11 rounded-[8px] text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type InputProps = Omit<
  React.ComponentProps<'input'>,
  'size' | 'suffix'
> & {
  prefixIconSrc?: string;
  suffix?: React.ReactNode | string;
} & VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      prefixIconSrc,
      size,
      variant,
      suffix,
      ...props
    },
    ref
  ) => {
    const style = {
      backgroundImage: prefixIconSrc ? `url(${prefixIconSrc})` : 'none',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left 1rem center',
      paddingLeft: prefixIconSrc ? '2.5rem' : undefined,
    } as React.CSSProperties;

    return (
      <div className='relative flex items-center w-full'>
        <input
          type={type}
          className={cn(inputVariants({ variant, size }), className)}
          ref={ref}
          data-prefixiconsrc={prefixIconSrc}
          style={style}
          {...props}
        />
        {suffix && <span className='absolute right-3'>{suffix}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
