import React from "react";
import Header_css from "./Header.module.css";
import Logos from "../../distm/img/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png";
import TypeNav from "./TypeNav/TypeNav";
import TypeNavItem from "./TypeNav/TypeNavItem";
import TypeNav_css from "./TypeNav/TypeNav.module.css";
import { Field, reduxForm, formValueSelector, Form } from "redux-form";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import Pokemon_body_css from "../Pokemon_body/Pokemon_body.module.css";

const renderField = ({ input, type }) => (
  <div className="input-row">
    <input {...input} type={type} />
  </div>
);


let Header = ({ type, setValType, setNamefil, handleSubmit,filterObj,setFilterObj }) => {
  const valuez = useSelector((state) => state.form?.contact?.values);
  const handleFilterPokemons = (filterName) => {
    if (valuez !== undefined) {
      for (const [key, value] of Object.entries(valuez)) {
        if (type.includes(key)) {
          setValType([key]);
        }
        if (value === false) {
          setValType([]);
        }
      }
      setNamefil(valuez?.filterName);
    } else {
      setNamefil("");
    }

  //   props.setFilterObj({
  //   attack: props.attack,
  //   defence: props.defence,
  //   hp: props.hp,
  //   specAttack: props.specAttack,
  //   specDefense: props.specDefense,
    
  // })
  };

  

  return (
    <header className={Header_css.Header}>
      <div className={Header_css.Logo}>
        <img src={Logos} alt="Logo" />
      </div>
      <Field
        className={Pokemon_body_css.input_search}
        type="text"
        name={"filterName"}
        component="input"
        placeholder="Search pokemon"
      />
      <button
        onClick={handleFilterPokemons}
        className={Pokemon_body_css.filter_button}
      >
        Search
      </button>
      <TypeNav>
        <TypeNavItem icon="Types Filter" className={TypeNav_css.Types}>
          <ul className={TypeNav_css.Checkbox}>
            <div className={TypeNav_css.FilterOptions}>
              <div className={TypeNav_css.CheckboxOptions}>
                <Form onSubmit={handleSubmit}>
                  {type &&
                    type.map((type) => (
                      <li key={Math.random()}>
                        <Field
                          key={Math.random()}
                          component="input"
                          name={type}
                          type="checkbox"
                          id={type}
                          className={TypeNav_css.custom_checkbox}
                        />

                        <label
                          key={Math.random()}
                          className={TypeNav_css.buttonItems}
                          htmlFor={type}
                        >
                          {type}
                        </label>
                      </li>
                    ))}
                </Form>
              </div>

              <div className={TypeNav_css.FilterStats}>
                <div className={TypeNav_css.attackStats}>
                  <Field
                    key={Math.random()}
                    component={renderField}
                    type="text"
                    name="valFrom"
                    placeholder="attack from"
                    className={TypeNav_css.StatsInput}
                  />
                </div>
              </div>
            </div>
          </ul>
        </TypeNavItem>
      </TypeNav>
    </header>
  );
};

Header = reduxForm({
  form: "contact",
})(Header);
const selector = formValueSelector("contact");

export default connect((state) => {
  const attack = {
    from: Number(selector(state, "valAtFrom")),
    to: Number(selector(state, "valAtTo")),
  };
  const defence = {
    from: Number(selector(state, "valDefFrom")),
    to: Number(selector(state, "valDefTo")),
  };
  const hp = {
    from: Number(selector(state, "valHpFrom")),
    to: Number(selector(state, "valHpTo")),
  };
  const specAttack = {
    from: Number(selector(state, "valSpaFrom")),
    to: Number(selector(state, "valSpaTo")),
  };
  const specDefense = {
    from: Number(selector(state, "valSpdFrom")),
    to: Number(selector(state, "valSpdTo")),
  };
  return {
    attack,
    defence,
    hp,
    specAttack,
    specDefense
  };
})(Header);
