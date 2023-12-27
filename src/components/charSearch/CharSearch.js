import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelServices from "../../services/MarvelService";

import "./charSearch.scss";

const CharSearch = () => {
  const [name, setName] = useState(null);
  const [nameForReques, setNameForReques] = useState(null);
  const [char, setChar] = useState(null);

  const charaster = useMarvelServices();
  const { getCharacterForName } = charaster;

  const changeCharaster = (name) => {
    getCharacterForName(name).then((resp) => setChar(resp));
  };

  useEffect(() => {
    if (name != null) {
      let nameRes = name.replace(/"/g, "").replace(/\s/g, "%20");
      setNameForReques(nameRes);
      changeCharaster(nameRes);
    }
  }, [name]);

  return (
    <div className="char__search">
      <p className="char__text">Or find a character by name:</p>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("This field is required"),
        })}
        onSubmit={(values) => {
          setName(JSON.stringify(values.name, null, 2));
        }}
      >
        <Form className="char__flex">
          <div>
            <Field
              id="name"
              name="name"
              type="text"
              className="char__input"
              placeholder="Enter name"
            />
            <ErrorMessage name="name" component="div" className="char__error" />
          </div>
          <button className="button button__main" type="submit">
            <div className="inner">find</div>
          </button>
        </Form>
      </Formik>
      {char == null ? null : char == false ? (
        <div className="char__error">
          The charaster was not found.Check the name and try again
        </div>
      ) : (
        <div className="char__page">
          <div className="char__resp">There is! Visit {char.name} page?</div>
          <Link to={`/${nameForReques}`}>
            <button className="button button__secondary">
              <div className="inner">to page</div>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CharSearch;
