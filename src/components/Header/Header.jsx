import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow ">
      <Container>
      <nav className="flex justify-between">
  <div className="w-1/3">
    <Link to="/">
      <Logo/>
    </Link>
  </div>
  <ul className="flex ">
    {navItems.map((item) =>
      item.active ? (
        <li key={item.name}>
          <button
            onClick={() => navigate(item.slug)}
            className="inline-block px-4 py-2 duration-200 hover:bg-gray-400 rounded-full text-neutral-50"
          >
            {item.name}
          </button>
        </li>
      ) : null
    )}
    {authStatus && (
      <li>
        <LogoutBtn/>
      </li>
    )}
  </ul>
</nav>

      </Container>
    </header>
  );
}

export default Header;
