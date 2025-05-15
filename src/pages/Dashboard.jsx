import { useEffect, useState } from "react";
import BtnOption from "../components/BtnOption";
import "../stylesheets/Panel.css";
import { useNavigate } from "react-router-dom";
import RegisterUser from "../components/RegisterUser";
import Deliver from "../components/Deliver";
import Inventory from "../components/Inventory.jsx";
import Patients from "../components/Patients.jsx";
import Statistics from "../components/Statistics.jsx";
import { LocalStorage } from "../utils/LocalStorage.js";
import { RiMenuFold2Fill, RiMenuFold3Fill } from "react-icons/ri";
import Button from '../components/Button';
import { useTheme } from '../utils/ThemeContext';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

export default function Dashboard() {
  const [selectedOption, setSelectedOption] = useState("deliver");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Usa el contexto del tema

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    if (option === "password") {
      navigate("/actualizar");
    }

    if (option === "logout") {
      LocalStorage.Delete("token");
      navigate("/");
    }
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const jwt = LocalStorage.Get("token");
      if (!jwt) {
        navigate("/");
        return;
      }

      setIsAuthorized(true);
    };

    fetchData();
  }, [navigate]);

  if (!isAuthorized) {
    return null;
  }

  return (
      <div className="dashboard-container">
        <button className="toggle-button" onClick={togglePanel}>
          {isPanelOpen ? <RiMenuFold3Fill /> : <RiMenuFold2Fill />}
        </button>
        <aside className={`panel ${isPanelOpen ? "open" : "closed"}`}>
          <div className="panel-title">
            <img
                src="https://cdn-icons-png.flaticon.com/128/3655/3655581.png"
                alt=""
            />
            <h3>CCCD</h3>
            <Button
                variant={"secondary"}
                onClick={toggleTheme}
            >
              {theme === 'dark' ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
            </Button>
          </div>
          <BtnOption
              text="Entregar medicamentos"
              iconName="deliver"
              selected={selectedOption === "deliver"}
              handleClick={handleOptionClick}
          />
          <BtnOption
              text="Registrar usuario"
              iconName="user"
              selected={selectedOption === "user"}
              handleClick={handleOptionClick}
          />
          <BtnOption
              text="Pacientes"
              iconName="patient"
              selected={selectedOption === "patient"}
              handleClick={handleOptionClick}
          />
          <BtnOption
              text="Reportes y estadísticas"
              iconName="report"
              selected={selectedOption === "report"}
              handleClick={handleOptionClick}
          />
          <BtnOption
              text="Inventario"
              iconName="box"
              selected={selectedOption === "box"}
              handleClick={handleOptionClick}
          />
          <BtnOption
              text="Cambiar contraseña"
              iconName="password"
              selected={selectedOption === "password"}
              handleClick={handleOptionClick}
          />
          <BtnOption
              text="Cerrar sesión"
              iconName="logout"
              selected={selectedOption === "logout"}
              handleClick={handleOptionClick}
          />
        </aside>

        <article className="article-content">
          {selectedOption === "deliver" ? <Deliver /> : null}
          {selectedOption === "user" ? <RegisterUser /> : null}
          {selectedOption === "patient" ? <Patients /> : null}
          {selectedOption === "report" ? <Statistics /> : null}
          {selectedOption === "box" ? <Inventory /> : null}
          {selectedOption === "question" ? <DashFAQ /> : null}
          {selectedOption === "item" ? <Items /> : null}
        </article>
      </div>
  );
}

