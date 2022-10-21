import imagem from "assets/img/image9.jpg";
import { GrLogout } from "react-icons/gr";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/authHook";
const Menu = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate();
  async function logout() {
    await signOut()
    navigate('/login')
  }
  return (
    <S.Cabecalho>
      <picture>
        <Link to="/">
         <img src={imagem} alt="logo" />
        </Link>
      </picture>
      <nav>
        {
          user ? (
            <ul>
              <li>
                <Link to="/adm/Planeta">Universo</Link>
              </li>
              <li>
                <button onClick={logout}>{user.name} <GrLogout /></button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/cadastrar">Cadastrar</Link>
              </li>
            </ul>
          )
        }
      </nav>
    </S.Cabecalho >
  