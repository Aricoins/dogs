import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions/dogsActions';
import Cards from '../../Components/Cards';
import Nav from '../../Components/Nav';
import SearchBar from '../../Components/SearchBar';
import styled from 'styled-components';
import imagen from "../Landing/icono.png";
import colores from "../../vistas/colores";
import gif from "../../assets/gif3.gif";

const H2 = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: ${colores.verde};
  font-size: 40px;
  padding: 0%;
  width: 40%;
  margin-left: 0%;
  @media only screen and (max-width: 700px) {
    font-size: 20px;
    width: 20%;
    margin-left: 0%;
    height: 20%;
    font-size: small;
  }
`;

const Barra = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colores.amarillo};
  height: 8rem;
  align-items: right;
`;

const Home = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Ajusta el tamaño de la página según sea necesario

  // Guarda los datos paginados, el número total de perros y el estado de carga
  const [paginatedDogs, setPaginatedDogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  // Solicita datos de la página actual
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await dispatch(getDogs(currentPage, pageSize));
        setPaginatedDogs(response.dogs);
        setTotalPages(response.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dogs:', error);
        setLoading(false);
      }
    };
    fetchDogs();
  }, [dispatch, currentPage, pageSize]);

  // Maneja el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Barra>
        <H2><img style={{ width: "30%", height: "140%" }} src={imagen} alt="hueso" /> Dogs App</H2>
        <SearchBar />
      </Barra>

      <Nav />

      {loading ? (
        <>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <img style={{ padding: "1%", width: "25%", borderRadius: "50%" }} src={gif} alt="cargando" />
          </div>
          <span style={{ padding: "1%", display: "flex", flexDirection: "row", justifyContent: "center", color: "white" }}>Loading...</span>
        </>
      ) : (
        <Cards
          paginatedDogs={paginatedDogs}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Home;
