import React, { useEffect, useState } from "react";
import Header_css from "./Header.module.css";
import Logos from "../../distm/img/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png";
import TypeNav from "./TypeNav/TypeNav";
import TypeNavItem from "./TypeNav/TypeNavItem";
import TypeNav_css from "./TypeNav/TypeNav.module.css";
import { Field, reduxForm, formValueSelector, Form } from "redux-form";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import Pokemon_body_css from "../Pokemon_body/Pokemon_body.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const replacerStats = (e) => e.target.value.replace(/\D/, "");

const replacerName = (e) => e.target.value.replace(/[^A-Za-z0-9-]/, "");
let value;
const blur = (e) => (value = Number(e.target.value));
const blured = (e) =>
  Number(e.target.value) < value
    ? e.target.value.replace(/./g, "")
    : e.target.value.replace(/\D/, "");

const renderFieldStatsFrom = ({ input, type }) => (
  <input
    {...input}
    maxLength="3"
    onBlur={(e) => input.onBlur(blur(e))}
    onChange={(e) => input.onChange(replacerStats(e))}
    type={type}
    className={TypeNav_css.StatsFrom}
  />
);
const renderFieldStatsTo = ({ input, type }) => (
  <input
    {...input}
    maxLength="3"
    onBlur={(e) => input.onBlur(blured(e))}
    onChange={(e) => input.onChange(replacerStats(e))}
    type={type}
    className={TypeNav_css.StatsTo}
  />
);
const renderFieldName = ({ input, type }) => (
  <input
    {...input}
    className={Pokemon_body_css.input_search}
    maxLength="11"
    onChange={(e) => input.onChange(replacerName(e))}
    type={type}
  />
);

const stats = [
  "Attack",
  "Defense",
  "HP",
  "Special Attack",
  "Special Defense",
  "Speed",
];

let Header = (props) => {
  const [pokemons, setPokemons] = useState([]);

  const valuez = useSelector((state) => state.form?.filter?.values);
  const handleFilterPokemons = () => {
    let arr = [];
    if (valuez) {
      for (const [key, value] of Object.entries(valuez)) {
        if (props.type.includes(key) && value) {
          arr.push(key);
          props.setValType([...arr]);
        }
      }
      props.setNamefil(valuez?.filterName);
    } else {
      props.setNamefil("");
    }

    props.setFilterObj({
      attack: props.attack,
      defense: props.defense,
      hp: props.hp,
      speed: props.speed,
      specialAttack: props.specialAttack,
      specialDefense: props.specialDefense,
    });
  };

  useEffect(() => {
    for (let obj in props.filterObj) {
      if (!props.filterObj[obj].from) {
        delete props.filterObj[obj].from;
        if (!props.filterObj[obj].to) {
          delete props.filterObj[obj];
        }
      } else if (!props.filterObj[obj].to) {
        delete props.filterObj[obj].to;
      } else if (props.filterObj[obj].from > props.filterObj[obj].to) {
      }
    }
  }, [props.filterObj]);

  const resetpokemons = () => {
    axios
      .post("https://pokemonapishort.herokuapp.com/PokeApi/getPokemons", {
        filterOptions: [{ nameFilter: "" }, { typeFilter: [""] }],
      })
      .then((result) => {
        setPokemons(result.data.pokemons);
      });
  };

  return (
    <header className={Header_css.Header}>
      <NavLink onSubmit={resetpokemons} to={"/"}>
        <div className={Header_css.Logo}>
          <img onClick={resetpokemons} src={Logos} alt="Logo" />
        </div>
      </NavLink>
      <Field name="filterName" component={renderFieldName} type="text" />
      <button
        onClick={handleFilterPokemons}
        className={Pokemon_body_css.filter_button}
      >
        Search
      </button>
      <TypeNav>
        <TypeNavItem icon="Types Filters" className={TypeNav_css.Types}>
          <Form onSubmit={props.handleSubmit}>
            <ul className={TypeNav_css.Checkbox}>
              <div className={TypeNav_css.FilterOptions}>
                <div className={TypeNav_css.CheckboxOptions}>
                  {props.type &&
                    props.type.map((type) => (
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
                </div>

                <div className={TypeNav_css.FilterStats}>
                  <div className={TypeNav_css.attackStats}>
                    {stats.map((stats, i) => (
                      <li key={i} className={TypeNav_css.allStatsInput}>
                        <label
                          className={TypeNav_css.statsName}
                          htmlFor={stats}
                        >
                          {stats}
                        </label>
                        <Field
                          name={`${stats.replace(" ", "")}From`}
                          component={renderFieldStatsFrom}
                          type="text"
                        />
                        <span className={TypeNav_css.statsFromTo}> -</span>
                        <Field
                          name={`${stats.replace(" ", "")}To`}
                          component={renderFieldStatsTo}
                          type="text"
                        />
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </ul>
          </Form>
        </TypeNavItem>
      </TypeNav>
    </header>
  );
};

Header = reduxForm({
  form: "filter",
})(Header);
const selector = formValueSelector("filter");
export default connect((state) => {
  const attack = {
    from: Number(selector(state, "AttackFrom")),
    to: Number(selector(state, "AttackTo")),
  };
  const defense = {
    from: Number(selector(state, "DefenseFrom")),
    to: Number(selector(state, "DefenseTo")),
  };
  const hp = {
    from: Number(selector(state, "HPFrom")),
    to: Number(selector(state, "HPTo")),
  };
  const specialAttack = {
    from: Number(selector(state, "SpecialAttackFrom")),
    to: Number(selector(state, "SpecialAttackTo")),
  };
  const specialDefense = {
    from: Number(selector(state, "SpecialDefenseFrom")),
    to: Number(selector(state, "SpecialDefenseTo")),
  };
  const speed = {
    from: Number(selector(state, "SpeedFrom")),
    to: Number(selector(state, "SpeedTo")),
  };
  const name = String(selector(state, "name"));

  return {
    attack,
    defense,
    hp,
    specialAttack,
    specialDefense,
    speed,
    name,
  };
})(Header);
