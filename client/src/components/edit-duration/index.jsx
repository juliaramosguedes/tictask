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
  InputNumber,
  Separator,
  Subtitle,
} from '../../ui';
import {
  useInitialFocusRef,
  useFocusOnError,
  useBreakpoint,
} from '../../hooks';

export default ({
  color,
  onEditDuration,
  pomodoroScroller,
  secondaryColor,
  settingsScroller,
  settingsRef,
  ...props
}) => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';

  const pomodoroInputRef = useInitialFocusRef();
  const shortBreakInputRef = useRef();
  const longBreakInputRef = useRef();

  const [showEdit, setShowEdit] = useState(false);

  const onEditClick = useCallback(() => {
    setShowEdit(true);
    setTimeout(() => {
      settingsScroller();
    }, 300);
  }, [settingsScroller]);

  const onSubmitForm = (values) => {
    onEditDuration(values);
    pomodoroScroller();
    setTimeout(() => {
      setShowEdit(false);
    }, 500);
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
    <Container display="flex" direction="column" ref={settingsRef}>
      {showEdit ? (
        <>
          <Separator transparent size={8} />
          <Subtitle color={secondaryColor} size={2} center weight="bold">
            Personalizar duração
            <br />
            em minutos
          </Subtitle>
          <Separator transparent size={4} />
          <Fieldset width="175px">
            <FieldBox>
              <Field
                as={InputNumber}
                ref={pomodoroInputRef}
                id="POMODORO"
                label="Foco"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.POMODORO}
                error={formik.touched.POMODORO && formik.errors.POMODORO}
                color={color}
                secondaryColor={secondaryColor}
                type="number"
                onMinusClick={() =>
                  setFieldValue('POMODORO', formik.values.POMODORO - 1)
                }
                onPlusClick={() =>
                  setFieldValue('POMODORO', formik.values.POMODORO + 1)
                }
              />
            </FieldBox>
            <FieldBox>
              <Field
                as={InputNumber}
                ref={shortBreakInputRef}
                color={color}
                secondaryColor={secondaryColor}
                id="SHORTBREAK"
                label="Intervalo curto"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.SHORTBREAK}
                error={formik.touched.SHORTBREAK && formik.errors.SHORTBREAK}
                onMinusClick={() =>
                  setFieldValue('SHORTBREAK', formik.values.SHORTBREAK - 1)
                }
                onPlusClick={() =>
                  setFieldValue('SHORTBREAK', formik.values.SHORTBREAK + 1)
                }
              />
            </FieldBox>
            <FieldBox>
              <Field
                as={InputNumber}
                ref={longBreakInputRef}
                id="LONGBREAK"
                color={color}
                secondaryColor={secondaryColor}
                label="Intervalo longo"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.LONGBREAK}
                error={formik.touched.LONGBREAK && formik.errors.LONGBREAK}
                onMinusClick={() =>
                  setFieldValue('LONGBREAK', formik.values.LONGBREAK - 1)
                }
                onPlusClick={() =>
                  setFieldValue('LONGBREAK', formik.values.LONGBREAK + 1)
                }
              />
            </FieldBox>
          </Fieldset>

          <Separator transparent size={4} />
          <Button.Main
            border
            transparent
            color={color}
            circle
            onClick={formik.handleSubmit}
            padding="8px"
            small={!isDesktop}
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
