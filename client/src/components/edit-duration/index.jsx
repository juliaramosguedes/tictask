import React, { useState, useCallback, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BsPencil } from 'react-icons/bs';
import {
  Button,
  Container,
  Field,
  FieldBox,
  Fieldset,
  Separator,
  Subtitle,
} from '../../ui';
import { useInitialFocusRef, useFocusOnError } from '../../hooks';

export default ({ color, onEditDuration, ...props }) => {
  const pomodoroInputRef = useInitialFocusRef();
  const shortBreakInputRef = useRef();
  const longBreakInputRef = useRef();

  const [showEdit, setShowEdit] = useState(true);

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
    validationSchema: Yup.object().shape({
      POMODORO: Yup.number()
        .integer()
        .positive()
        .min(1, 'Tempo mínimo: 1 minuto')
        .max(120, 'Tempo máximo: 120 minutos')
        .required('Informe um número positivo.'),
      SHORTBREAK: Yup.number()
        .integer()
        .positive()
        .min(1, 'Tempo mínimo: 1 minuto')
        .max(120, 'Tempo máximo: 120 minutos')
        .required('Informe um número positivo.'),
      LONGBREAK: Yup.number()
        .integer()
        .positive()
        .min(1, 'Tempo mínimo: 1 minuto')
        .max(120, 'Tempo máximo: 120 minutos')
        .required('Informe um número positivo.'),
    }),
    onSubmit: (values) => onSubmitForm(values),
  });

  useFocusOnError(formik, {
    POMODORO: pomodoroInputRef,
    SHORTBREAK: shortBreakInputRef,
    LONGBREAK: longBreakInputRef,
  });

  const setFieldValue = useCallback(formik.setFieldValue);

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
          <Fieldset width="155px">
            <FieldBox>
              <Field
                ref={pomodoroInputRef}
                id="POMODORO"
                label="Foco"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.POMODORO}
                error={formik.touched.POMODORO && formik.errors.POMODORO}
                color={color}
                type="number"
              />
            </FieldBox>
            <FieldBox>
              <Field
                ref={shortBreakInputRef}
                color={color}
                id="SHORTBREAK"
                color={color}
                label="Intervalo curto"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.SHORTBREAK}
                error={formik.touched.SHORTBREAK && formik.errors.SHORTBREAK}
              />
            </FieldBox>
            <FieldBox>
              <Field
                ref={longBreakInputRef}
                id="LONGBREAK"
                color={color}
                label="Intervalo longo"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.LONGBREAK}
                error={formik.touched.LONGBREAK && formik.errors.LONGBREAK}
              />
            </FieldBox>
          </Fieldset>

          <Separator transparent size={8} />
          <Button.Main
            border
            borderColor="#fff"
            onClick={formik.handleSubmit}
            padding="12px 48px"
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
