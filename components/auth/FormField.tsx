type FieldProps = {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
};
const inputClass =
  'border-border placeholder:text-muted hover:border-border-hover focus:border-border-focus focus:ring-border-focus h-10 w-full rounded-md border px-3 text-sm transition-colors focus:ring-1 focus:outline-none';
export function FormField({ id, label, type = 'text' }: FieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="pl-1 text-sm font-medium">
        {label}
      </label>
      <input id={id} className={inputClass} type={type} />
    </div>
  );
}
