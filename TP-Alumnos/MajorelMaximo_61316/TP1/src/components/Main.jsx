import React from "react";
import { Estudios } from "./Estudios";
import { SoftSkills } from "./SoftSkills";
import { Proyectos } from "./Proyectos";
import { Experiencia } from "./Experiencia";
import { Idiomas } from "./Idiomas";
import { Certificados } from "./Certificados";

export const Main = () => {
  return (
    <>
      <Estudios />
      <Experiencia />
      <Proyectos />
      <SoftSkills />
      <Idiomas />
      <Certificados />
    </>
  );
};
