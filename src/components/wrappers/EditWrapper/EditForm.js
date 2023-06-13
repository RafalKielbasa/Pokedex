import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { useEditMutation } from '../../../hooks/useEdit';
import { FormField } from './FormField';
import { ButtonsWrapper } from './EditWrapper.style';

const editSchema = Yup.object().shape({
  name: Yup?.string().required('Name required'),
  height: Yup.number().notRequired(),
  weight: Yup.number().notRequired(),
  base_experience: Yup.number().notRequired(),
  abilities: Yup.string().notRequired(),
});

export const EditForm = ({
  pokemon,
  setCurrentButton,
  currentButton,
  length,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: pokemon?.name,
      image: pokemon?.image,
      height: pokemon?.height || '',
      weight: pokemon?.weight || '',
      baseExperience: pokemon?.baseExperience || '',
      abilities: pokemon?.abilities[0] || '',
      id: length + 1,
    },
    validationSchema: editSchema,
    onSubmit: (values) => {
      mutate({ ...values, abilities: [values.abilities] });
    },
  });

  const { mutate } = useEditMutation(currentButton, pokemon, formik);

  return (
    <FormikProvider value={formik}>
      <FormField name="name" label="Name" placeholder="Name" />

      <FormField
        name="height"
        label="Height"
        placeholder="Height"
        type="number"
      />

      <FormField
        name="weight"
        label="Weight"
        placeholder="Weight"
        type="number"
      />

      <FormField
        name="baseExperience"
        label="Base Experience"
        placeholder="Base Experience"
        type="number"
      />

      <FormField name="abilities" label="Abilities" placeholder="Abilities" />

      <ButtonsWrapper>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ marginTop: 12 }}
          onClick={(btn) => {
            setCurrentButton(btn.target.innerText);
            formik.handleSubmit();
          }}
        >
          Save as new
        </Button>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ marginTop: 12 }}
          onClick={(btn) => {
            setCurrentButton(btn.target.innerText);
            formik.handleSubmit();
          }}
        >
          Edit
        </Button>
      </ButtonsWrapper>
    </FormikProvider>
  );
};
