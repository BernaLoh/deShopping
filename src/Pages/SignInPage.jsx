import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import FormGroupCustom from '../Components/Forms/FormGroupCustom'
import ButtonCustom from '../Components/Forms/ButtonCustom'
import firebase from '../Config/firebase'
import { useNavigate, Link } from 'react-router-dom'
import { FirebaseErrorsTranslations } from '../Util/FirebaseErrors'
import AlertCustom from '../Components/Forms/AlertCustom'
import AuthContext from '../Context/AuthContext'
import { useContext } from 'react'

function SignInPage() {
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [alert, setAlert] = useState('')
  const [loading, setLoading] = useState(false)

  const style = {
    macro: {
      margin: '15px 15px',
      padding: '5px 30px',
      backgroundColor: 'white',
      borderRadius: '40px',
      color: 'black',
      width: '400px'
    },
    title: {
      marginBottom: '20px',
      fontFamily: '"Segoe IU", sans-serif',
      margin: '5px 0px',
      color: '#4f4f79',
      fontSize: '24px',
      fontWeight: 'bold',
      letterSpacing: '0.3px',
      textAlign: 'center'
    },
    divButton: {
      display: 'block',
      margin: '7px 0px'
    },
    divLink: {
      display: 'block',
      margin: '15px 0px'
    },
    link: {
      display: 'inline'
    }
  }

  const onSubmit = async data => {
    try {
      setLoading(true)
      const userSignIn = await firebase.auth().signInWithEmailAndPassword(data.email, data.pass)
      console.log("Validacion de usuario: ", userSignIn.user.uid)
      if (userSignIn.user.uid) {
        const user = await firebase.firestore().collection('users')
        .where('userId','==',userSignIn.user.uid).get()
        
        context.loginUser(user.docs[0].data())
        setAlert('')
        navigate('/')
      } else {
        setLoading(false)
        setAlert('Ha ocurrido un error')
      }
      
    } catch (error) {
      console.log(error.code)
      console.log(error.message)
      setLoading(false)
      if (alert) {
        setAlert(' ')
        setTimeout( () => {
          setAlert(FirebaseErrorsTranslations(error.code, error.message))
        }, 200)
      } else {
        setAlert(FirebaseErrorsTranslations(error.code, error.message))
      }
    }
  }

  return (
    <div className="App-header">
      <Form style={style.macro} onSubmit={handleSubmit(onSubmit)}>
        <p style={style.title}>Ingresar</p>
        <AlertCustom alert={alert}/>
        <FormGroupCustom label="Email" name="email" type="text"
                  register={{
                              ...register("email", {
                                required: "Campo obligatorio",
                                pattern: { value: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Ingrese un mail válido" }
                              })
                            }}
                  regError={errors.email?.message} />

        <FormGroupCustom label="Contraseña" name="pass" type="password"
                  register={{
                              ...register("pass", {
                                required: "Campo obligatorio",
                                minLength: { value: 6, message: "Tamaño mínimo 6" }
                              })
                            }}
                  regError={errors.pass?.message} />

        <div style={style.divButton}>
          <ButtonCustom label="Ingresar" name="SignIn" type="submit" reqStyle="uxButtonWide" loading={loading}/>
        </div>
        <div style={style.divLink}>
          <p style={style.link}>¿No esta registrado?  </p>
          <Link to={'/signUp/'} style={style.link} >Registrese ahora</Link>
        </div>
      </Form>
    </div>
  )
}
export default SignInPage