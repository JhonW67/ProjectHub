import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access:", location.pathname);
  }, [location.pathname]);

  // Define mensagens diferentes com base na URL
  const getUserTypeMessage = () => {
    if (location.pathname.includes("/admin")) return "Administrador";
    if (location.pathname.includes("/student")) return "Estudante";
    if (location.pathname.includes("/professor")) return "Professor";
    return "Usuário";
  };

  const userType = getUserTypeMessage();

  return (
    <>
      <Helmet>
        <title>Página não encontrada | ProjectHub UNIVAG</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* SVG ilustrativo */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <svg
              className="mx-auto h-40 w-40 text-univag-navy"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 21L24 5.25 38.25 21v15.75A3.75 3.75 0 0134.5 40.5H13.5A3.75 3.75 0 019.75 36.75V21z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M24 32.25v0.008v.008M24 26.25v3"
              />
            </svg>
          </motion.div>

          <h1 className="text-6xl font-bold text-univag-navy mb-2">404</h1>
          <p className="text-lg text-gray-600 mb-4">
            Olá, {userType}. A página que você tentou acessar não existe ou foi movida.
          </p>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/"
              className="inline-block bg-univag-navy text-white px-6 py-2 rounded-lg hover:bg-univag-darknavy transition"
            >
              Voltar para a Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
