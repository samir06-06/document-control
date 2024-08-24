import React, { useState } from "react"
import "./style.scss"
import logo1 from "../../assets/logo1.png"
import logo1_edited from "../../assets/logo1 edited.png"
import { Link } from "react-router-dom"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleDropdownToggle = (e) => {
    e.preventDefault()
    const dropdown = e.currentTarget.nextElementSibling
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block"
  }

  const handleClickOutside = (e) => {
    if (!e.target.closest("nav")) {
      document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
        dropdown.style.display = "none"
      })
    }
  }

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <section className="navigation">
      <div className="container">
        <div className="brand">
          <a href="#!" className="logo"><img src={logo1_edited} alt="" /> Document Control</a>
        </div>
        <nav>
          <div className="nav-mobile">
            <a id="nav-toggle" href="#!" onClick={handleToggle}>
              <span></span>
            </a>
          </div>
          <ul className="nav-list">
            <li>
              <Link to="/"><i class="fa-solid fa-house"></i>&nbsp;&nbsp;Home</Link>
            </li>
            <li>
              <Link to="/history"><i class="fa-solid fa-clock-rotate-left"></i>&nbsp;&nbsp;Logs</Link>
            </li>
            <li>
              <Link to="/login"><i class="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;&nbsp;LogOut</Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default Navbar
