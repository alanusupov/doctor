import React from 'react';
import How from './How';
import Top from './Top';
import About from './About';
import Doctors from './Doctors';
import Questions from './Questions';
import Consult from './Consult';
import PicDivider from './PicDivider';

function Main() {
  return (
    <div>
      <Top/>
      <How/>
      <PicDivider/>
      <About/>
      <PicDivider/>
      <Consult/>
      <Doctors/>
      <Questions/>
      <PicDivider/>
    </div>
  )
}

export default Main;
