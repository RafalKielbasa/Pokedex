import { useField } from 'formik';
import { Input, Label } from './EditWrapper.style';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

export const FormField = ({ label, name, placeholder, type = 'text' }) => {
  const [field] = useField(name);
  const { currentTheme, changeTheme } = useContext(ThemeContext);

  return (
    <Label theme={currentTheme}>
      {label}
      <Input
        theme={currentTheme}
        {...field}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </Label>
  );
};
