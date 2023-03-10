import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import AboutMe from "./pages/AboutMe"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import Skills from "./pages/Skills"
import Error from "./pages/Error"

export default function Router() {
  return(
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/aboutme" element={ <AboutMe/> }/>
      <Route path="/skills" element={ <Skills/> }/>
      <Route path="/projects" element={ <Projects/> }/>
      <Route path="/contact" element={ <Contact/> }/>
      <Route path="*" element={ <Error/> }/>
    </Routes>
  )
}