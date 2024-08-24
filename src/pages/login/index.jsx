import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./style.scss";

const SignIn = () => {

  return (
    <div id="login">
      <div className="login" onClick={() => console.log('Container clicked')}>
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="center">
          <h2 className='h2'>Please Sign In</h2>
          <Formik
           initialValues={{ email: '', password: '' }}
           validate={values => {
             const errors = {};
             if (!values.email) {
               errors.email = 'Required';
             } else if (
               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
             ) {
               errors.email = 'Invalid email address';
             }
             return errors;
           }}
           onSubmit={(values, { setSubmitting }) => {
             setTimeout(() => {
               alert(JSON.stringify(values, null, 2));
               setSubmitting(false);
             }, 400);
           }}
          >
            {({ values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting }) => (
              <Form className="form" onSubmit={handleSubmit}>
                <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
                      {errors.password && touched.password && errors.password}
                <button type="submit" className='submit-btn' disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
