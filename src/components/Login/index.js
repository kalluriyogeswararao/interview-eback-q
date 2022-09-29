import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: '', showErrorMsg: false}

  onChangeUserID = event => {
    this.setState({userId: event.target.value})
  }

  onChangePIN = event => {
    this.setState({pin: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureLoginApi = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = `https://apis.ccbp.in/ebank/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLoginApi(data.error_msg)
    }
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="heading">Welcome Back!</h1>

            <div className="label-input-container">
              <label htmlFor="userId" className="label">
                User ID
              </label>
              <input
                id="userId"
                type="text"
                className="input"
                placeholder="Enter User ID"
                onChange={this.onChangeUserID}
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                id="pin"
                type="password"
                className="input"
                placeholder="Enter PIN"
                onChange={this.onChangePIN}
              />
            </div>
            <button type="submit" className="button">
              Login
            </button>
            {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
