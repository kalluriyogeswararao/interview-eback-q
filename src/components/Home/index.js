import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo"
        />
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="data-container">
        <h1 className="main-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card"
        />
      </div>
    </div>
  )
}

export default Home
