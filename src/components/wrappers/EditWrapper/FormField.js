import { useField } from 'formik';
import { Input, Label } from './EditWrapper.style';

export const FormField = ({ label, name, placeholder, type = 'text' }) => {
  const [field] = useField(name);

  return (
    <Label>
      {label}
      <Input {...field} name={name} placeholder={placeholder} type={type} />
    </Label>
  );
};
