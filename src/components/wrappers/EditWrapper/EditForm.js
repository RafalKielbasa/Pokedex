import { FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import { Input, Label } from "./EditWrapper.style";
import { Button } from "@mui/material";
import { useEditMutation } from "../../../hooks/useEdit";

const editSchema = Yup.object().shape({
  height: Yup.number(),
  weight: Yup.number(),
  base_experience: Yup.number(),
  abilities: Yup.string(),
});

export const EditForm = ({ data, setCurrentButton, currentButton }) => {
  const { mutate } = useEditMutation(currentButton, data?.data[0]?.id);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: `${data?.data[0]?.name}(Edited)`,
      image: data?.data[0]?.image,
      height: data?.data[0]?.height,
      weight: data?.data[0]?.weight,
      baseExperience: data?.data[0]?.baseExperience,
      abilities: [data?.data[0]?.abilities[0]],
    },
    validationSchema: editSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <Label htmlFor="height">Height</Label>
      <Input
        name="height"
        type="number"
        value={formik.values.height}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Height"
      />
      <Label htmlFor="height">Base Experience</Label>
      <Input
        name="baseExperience"
        type="number"
        value={formik.values.baseExperience}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Base Experience"
      />
      <Label htmlFor="height">Weight</Label>
      <Input
        name="weight"
        type="number"
        value={formik.values.weight}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Weight"
      />
      <Label htmlFor="height">Abilities</Label>
      <Input
        name="abilities"
        type="text"
        value={[formik.values.abilities]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Abilities"
      />

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
        Save as new!
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
    </>
  );
};
