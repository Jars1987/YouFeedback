import * as Yup from 'yup';

export const surveyFormSchema = Yup.object({
  title: Yup.string().required('Required'),
  subject: Yup.string().required('Required'),
  body: Yup.string().required('Required'),
  recipients: Yup.array()
    .transform(function (value, originalValue) {
      if (this.isType(value) && value !== null) {
        return value;
      }
      return originalValue ? originalValue.split(/[\s;]+/) : [];
    })
    .of(Yup.string().email(({ value }) => `${value} is not a valid email`))
    .required('Required')
});
