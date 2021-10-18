import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../providers/auth";
import { useLanguage } from "../../providers/language";
import Logger from "../../util/logger";
import Input from "../common/input";
import Button from "../common/button";

const logger = Logger("components/forms/loginForm");

function LoginForm({}) {
  const { login } = useAuth();
  const {
    text: { login: text },
  } = useLanguage();

  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required("required"),
          password: Yup.string().required("required"),
        })}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          login()
            .then((response) => {
              setSubmitting(false);
              logger.debug("Login response: ", response);
            })
            .catch((err) => {
              logger.error("login error", err);
              setFieldError("general", "error");
              setSubmitting(false);
            });
        }}
        validateOnBlur={true}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => {
          return (
            <form onSubmit={handleSubmit} autoComplete="off">
              <Input
                id="username-input"
                className="w-full"
                name="username"
                value={values.uci}
                error={
                  touched.username && errors.username
                    ? text.username[errors.username]
                    : ""
                }
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
              />

              <Input
                id="password-input"
                className="w-full"
                name="password"
                type="password"
                value={values.password}
                error={
                  touched.password && errors.password
                    ? text.password[errors.password]
                    : ""
                }
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
              />
              <Button
                text={text.loginButton}
                type="submit"
                loading={isSubmitting}
              />
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
