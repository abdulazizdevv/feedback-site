'use client';

import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

import { cn } from '@/lib/utils';

import { InputProps, inputVariants } from '../Input/Input';

interface IProps<FormNames extends FieldValues> extends InputProps {
  control: Control<FormNames>;
  name: Path<FormNames>;
}

const InputPhoneNumber = <FormNames extends FieldValues>({
  control,
  name,
  disabled,
  className,
  variant,
  ...rest
}: IProps<FormNames> &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >) => {
  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      render={({ field: { ref, ...filedAll } }) => (
        <IMaskInput
          inputRef={ref}
          lazy={false}
          className={cn(inputVariants({ variant }), className)}
          onAccept={filedAll.onChange}
          mask='+998 00 000 00 00'
          placeholderChar='X'
          inputMode='numeric'
          {...rest}
          {...filedAll}
        />
      )}
    />
  );
};

export default InputPhoneNumber;
