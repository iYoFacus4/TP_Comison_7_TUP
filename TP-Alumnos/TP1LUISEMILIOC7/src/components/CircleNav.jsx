import React, { useState } from 'react'
import Modal from './Modal'
import Estudios from './Estudios'
import SoftSkills from './SoftSkills'
import Proyectos from './Proyectos'
import Experiencia from './Experiencia'
import Idiomas from './Idiomas'
import { estudios, softSkills, proyectos, experiencia, idiomas } from '../data/data'

const CircleNav = () => {
  const [open, setOpen] = useState(null) // 'estudios' | 'soft' | 'proy' | 'exp' | 'idiomas'
  const [idiomaKey, setIdiomaKey] = useState(0) // para re-animar cada vez que se abre

  const openModal = (key) => {
    setOpen(key)
    if (key === 'idiomas') setIdiomaKey(k => k + 1)
  }
  const closeModal = () => setOpen(null)

  const titleMap = {
    estudios: 'Estudios',
    soft: 'Soft Skills',
    proy: 'Proyectos',
    exp: 'Experiencia',
    idiomas: 'Idiomas'
  }

  return (
    <>
      <div className="circle-nav">
        <div className="circle circle--estudios" onClick={()=>openModal('estudios')} tabIndex={0}>Estudios</div>
        <div className="circle circle--soft"     onClick={()=>openModal('soft')}     tabIndex={0}>Soft<br/>Skills</div>
        <div className="circle circle--proy"     onClick={()=>openModal('proy')}     tabIndex={0}>Proyectos</div>
        <div className="circle circle--exp"      onClick={()=>openModal('exp')}      tabIndex={0}>Experiencia</div>
        <div className="circle circle--idiomas"  onClick={()=>openModal('idiomas')}  tabIndex={0}>Idiomas</div>
      </div>

      <Modal isOpen={!!open} title={titleMap[open]} onClose={closeModal}>
        {open === 'estudios' && <Estudios data={estudios} />}
        {open === 'soft'     && <SoftSkills data={softSkills} />}
        {open === 'proy'     && <Proyectos data={proyectos} />}
        {open === 'exp'      && <Experiencia data={experiencia} />}
        {open === 'idiomas'  && <Idiomas key={idiomaKey} data={idiomas} animate />}
      </Modal>
    </>
  )
}

export default CircleNav
