import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { BsPencil } from 'react-icons/bs';
import { Button, Container, Input, Separator, Subtitle } from '../../ui';

export default ({ color, onEditDuration, ...props }) => {
  const [showEdit, setShowEdit] = useState(false);

  const onEditClick = useCallback(() => {
    setShowEdit(true);
  }, []);

  const onSubmitForm = (values) => {
    onEditDuration(values);
    setShowEdit(false);
  };

  const formik = useFormik({
    initialValues: {
      POMODORO: 25,
      SHORTBREAK: 5,
      LONGBREAK: 15,
    },
    onSubmit: (values) => onSubmitForm(values),
  });

  return (
    <Container display="flex" direction="column">
      {showEdit ? (
        <>
          <Separator transparent size={8} />
          <Subtitle color={color} size={2} center weight="bold">
            Personalizar duração
            <br />
            em minutos
          </Subtitle>
          <Separator transparent size={4} />
          <Input
            id="POMODORO"
            color={color}
            label="Foco"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.POMODORO}
            error={formik.touched.POMODORO && formik.errors.POMODORO}
          />
          <Separator transparent size={4} />
          <Input
            id="SHORTBREAK"
            color={color}
            label="Intervalo curto"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.SHORTBREAK}
            error={formik.touched.SHORTBREAK && formik.errors.SHORTBREAK}
          />
          <Separator transparent size={4} />
          <Input
            id="LONGBREAK"
            color={color}
            label="Intervalo longo"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.LONGBREAK}
            error={formik.touched.LONGBREAK && formik.errors.LONGBREAK}
          />
          <Separator transparent size={8} />
          <Button.Main
            border
            borderColor="#fff"
            onClick={formik.handleSubmit}
            padding="8px 48px"
          >
            <p>SALVAR</p>
          </Button.Main>
        </>
      ) : (
        <Button.Main transparent flex color={color} onClick={onEditClick}>
          <BsPencil color={color} />
          <p>Personalizar duração</p>
        </Button.Main>
      )}
    </Container>
  );
};
