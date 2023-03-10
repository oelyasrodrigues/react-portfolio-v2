import { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import emailjs from "@emailjs/browser"
import { toast } from "react-toastify"
import { FaWhatsapp, FaAngleDoubleRight, FaAngleDoubleDown } from "react-icons/fa"

import "./contact.css"


export default function Contact() {
  const { t, i18n: {language} } = useTranslation()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "" 
  })
  const inputsRef = {
    inputN: useRef(null),
    inputE: useRef(null),
    inputM: useRef(null),
  }
  const [messageWpp, setMessageWpp] = useState("")

  function handleChange (ev) {

    const {name, value} = ev.target

    setFormData((prev) => {
      const newData = {...prev, [name]: value}
      return newData
    })

  }

  document.title = `Elyas Rodrigues | ${language === "pt" ? 'Contato' : 'Contact'}`


  
  function handleSubmit(ev) {
    ev.preventDefault()
    
    if(formData.name === ""){
      
      toast.error(t("contact.1"));
      inputsRef.inputN.current.focus()
      return
    }
    if(formData.email === ""){
      toast.error(t("contact.2"));
      inputsRef.inputE.current.focus()
      return
    }
    if(formData.message === ""){
      toast.error(t("contact.4"));
      inputsRef.inputM.current.focus() 
      return
    }

    const emailTemplate = "service_3oue9nk"
    const templateId = "template_8ivprki"
    const publicKey = "kN3xYmPuWvs61QbsK"

    const templateParams = {
      from_name: formData.name,
      message: formData.message,
      email: formData.email
    }

    emailjs.send(emailTemplate, templateId, templateParams, publicKey)
    .then(() => {
      toast.success("Email enviado");
      toast.warning(`Logo, logo, entrarei em contato com você, ${formData.name} :)`);
      setFormData({
        name: "",
        email: "",
        message: "" 
      })
    })
    .catch((err) => console.log(err))

  }


  return (
    <div className="container">
      <h1>{t("titles.3")}</h1>
      <div className="form-contact">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">{t("contact.0")}:</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder={t("contact.1")}
            value={formData.name}
            onChange={handleChange}
            ref={inputsRef.inputN}

          />

          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder={t("contact.2")}
            value={formData.email}
            onChange={handleChange}
            ref={inputsRef.inputE}

          />

          <label htmlFor="message">{t("contact.3")}:</label>
          <textarea 
            name="message" 
            id="message" 
            cols="30" 
            rows="10" 
            placeholder={t("contact.4")}
            value={formData.message}
            onChange={handleChange}
            ref={inputsRef.inputM}
          ></textarea>

          <button type="submit">{t("contact.5")}</button>
        </form>
        <div className="icon">
          <span className="rigth"><FaAngleDoubleRight size={40}/></span>
          <span className="down"><FaAngleDoubleDown size={40}/></span>
        </div>
        <div className="whatsapp">
          <p>{t("contact.6")} <FaWhatsapp title="Whatsapp"/></p>
          <textarea 
            name="wpp" 
            id="wpp" 
            value={messageWpp}
            onChange={(e) => setMessageWpp(e.target.value)}
            placeholder={t("contact.4")}
            >  
          </textarea>

          <a 
            href={`https://wa.me/98988149744?text=${messageWpp}`}
            target="_blank"
            rel="noreferrer" 
          >{t("contact.7")} <FaWhatsapp size={20}/></a>
        </div>
      </div>
    </div>
  )
}