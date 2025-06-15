import React from 'react';
import { Input } from '../atoms/Input';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ label, ...rest }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label htmlFor={rest.name}>{label}</label>
    <Input {...rest} />
  </div>
);
