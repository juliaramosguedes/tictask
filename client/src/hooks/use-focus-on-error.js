import { useRef, useEffect } from 'react';
import { map, cond, constant, stubTrue, concat, get } from 'lodash';

const useFocusOnError = (formik, fields = {}) => {
  const submitCountRef = useRef(formik.submitCount);

  useEffect(() => {
    const firstInputErrorRef = cond(
      concat(
        map(fields, (fieldRef, fieldName) => [
          constant(
            get(formik.errors, fieldName) && get(formik.touched, fieldName)
          ),
          constant(fieldRef),
        ]),
        [[stubTrue, constant({})]]
      )
    )();

    if (
      firstInputErrorRef.current &&
      formik.submitCount !== submitCountRef.current
    ) {
      firstInputErrorRef.current.focus();
    }

    submitCountRef.current = formik.submitCount;
  }, [formik.touched, formik.error, formik.submitCount, fields, formik.errors]);
};

export default useFocusOnError;
