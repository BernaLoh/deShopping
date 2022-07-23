import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import FormGroupCustom from '../Components/Forms/FormGroupCustom'
import ButtonCustom from '../Components/Forms/ButtonCustom'
import firebase from '../Config/firebase'
import { useNavigate } from 'react-router-dom'
import { FirebaseErrorsTranslations } from '../Util/FirebaseErrors'
import AlertCustom from '../Components/Forms/AlertCustom'
import ModalCustom from '../Components/Forms/ModalCustom'
import AuthContext from '../Context/AuthContext'
import { useContext } from 'react'

function SignUpPage() {
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  const { register, getValues, handleSubmit, formState: { errors } } = useForm()
  const [alert, setAlert] = useState('')
  const [showLogInModal, setShowLogInModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [addUser, setAddUser] = useState({})

  const style = {
    macro: {
      margin: '15px 15px',
      padding: '20px 30px',
      backgroundColor: 'white',
      borderRadius: '40px'
    },
    title: {
      fontFamily: '"Segoe IU", sans-serif',
      margin: '5px 0px',
      color: '#4f4f79',
      fontSize: '24px',
      fontWeight: 'bold',
      letterSpacing: '0.3px',
      textAlign: 'center'
    },
    divButtonRight: {
      display: 'block'
    }
  }

  const onSubmit = async data => {
    try {
      setLoading(true)
      const userValidation = await firebase.auth().createUserWithEmailAndPassword(data.email, data.pass)
      
      if (userValidation?.user?.uid) {
        const userDoc = await firebase.firestore().collection('users')
          .add({
                userId: userValidation.user.uid,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone
              })
        
        if (userDoc.id) {
          setAddUser({
                      userId: userValidation.user.uid,
                      firstName: data.firstName,
                      lastName: data.lastName,
                      phone: data.phone
                    })
          setAlert('')
          setLoading(false)
          setShowLogInModal(true)
        } else {
          setLoading(false)
          setAlert('Ha ocurrido un error')
        }
      }

    } catch (error) {
      setLoading(false)
      if (alert) {
        setAlert(' ')
        setTimeout(function () {
          setAlert(FirebaseErrorsTranslations(error.code, error.message))
        }, 200)
      } else {
        setAlert(FirebaseErrorsTranslations(error.code, error.message))
      }
    }
  }

  const handleLogIn = () => {
    setShowLogInModal(false)
    context.loginUser(addUser)
    navigate('/')
  }

  return (
    <>
      <div className="App-header">
        <Form style={style.macro} name="userSignUp" onSubmit={handleSubmit(onSubmit)}>
          <p style={style.title}>Formulario de alta de usuario</p>
          <AlertCustom alert={alert} />
          <FormGroupCustom label="Nombre" name="firstName" type="text"
                          register={{
                                      ...register("firstName", {
                                        required: "Campo obligatorio",
                                        maxLength: { value: 100, message: "El tamaño máximo es 100" },
                                        pattern: { value: /^[a-zA-Z]+$/, message: "Ingrese un formato válido" }
                                      })
                                    }}
                          regError={errors.firstName?.message} />

          <FormGroupCustom label="Apellido" name="lastName" type="text"
                          register={{
                                      ...register("lastName", {
                                        required: "Campo obligatorio",
                                        maxLength: { value: 100, message: "El tamaño máximo es 100" },
                                        pattern: { value: /^[a-zA-Z]+$/, message: "Ingrese un formato válido" }
                                      })
                                    }}
                          regError={errors.lastName?.message} />

          <FormGroupCustom label="Email" name="email" type="text"
                          register={{
                                      ...register("email", {
                                        required: "Campo obligatorio",
                                        pattern: { value: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Ingrese un mail válido" }
                                      })
                                    }}
                          regError={errors.email?.message} />

          <FormGroupCustom label="Teléfono" name="phone" type="text"
                          register={{
                                      ...register("phone", {
                                        required: "Campo obligatorio",
                                        minLength: { value: 6, message: "Tamaño mínimo 6" },
                                        maxLength: { value: 20, message: "Tamaño máximo 20" },
                                        pattern: { value: /^[0-9+-]+$/, message: "Ingrese un teléfono válido" }
                                      })
                                    }}
                          regError={errors.phone?.message} />

          <FormGroupCustom label="Contraseña" name="pass" type="password"
                          register={{
                                      ...register("pass", {
                                        required: "Campo obligatorio",
                                        minLength: { value: 6, message: "Tamaño mínimo 6" }
                                      })
                                    }}
                          regError={errors.pass?.message} />

          <FormGroupCustom label="Confirmar contraseña" name="passCheck" type="password"
                          register={{
                                      ...register("passCheck", {
                                        required: "Campo obligatorio",
                                        validate: (value) => {
                                          const { pass } = getValues();
                                          return pass === value || "Las contraseñas deben coincidir"
                                        }
                                      })
                                    }}
                          regError={errors.passCheck?.message} />

          <div style={style.divButtonRight}>
            <ButtonCustom label="Enviar" name="SignUn" type="submit" reqStyle="uxButtonWide" loading={loading} />
          </div>
        </Form>
      </div>

      <ModalCustom 
                  show={showLogInModal} 
                  onHide={handleLogIn} 
                  title='Registro de usuario satisfactorio'
                  button1={{label:'Continuar', func: handleLogIn}}
                  >
        <p>Ya puede utilizar nuesra web!</p>
        <p>Presione Continuar para acceder al sitio.</p> 
      </ModalCustom>
    </>
  )
}
export default SignUpPage