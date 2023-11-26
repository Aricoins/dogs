import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import colores from '../vistas/colores';
import { getTemperaments, applyFilters, getDogs } from '../redux/actions/dogsActions';

const FiltrosContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colores.verde};
  border-radius: 8px;
   margin-top: 10px;
  width: 100%;
  height: 40px;
  color: ${colores.amarillo};
  font-size: 15px;
  font-weight: bold;
  align-items: center;
  `;

const BotonFiltro = styled.button`
  padding: 10px;
  background-color: ${colores.amarillo};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin:4px;
  &:hover {
    background-color: ${colores.gris};
  }
`;

const SelectTemperamentos = styled.select`
  margin-left: 10px;
  justify-content: center;
`;
const Filtros = () => {
  const dogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [selectedTemperament, setSelectedTemperament] = useState("");
  const [filterType, setFilterType] = useState('all');
  const [sortType, setSortType] = useState('asc');
  const [sortTypeW, setSortTypeW] = useState('asc');
  
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleTemperamentChange = (e) => {
    setSelectedTemperament(e.target.value);
  };


  const handleSortByWeight = () => {
    // Lógica actualizada para ordenar por peso y actualizar el estado
    const sortedDogs = [...dogs].sort((a, b) => {
      const parseWeight = (weight) => {
        const [minA, maxA] = a.peso.split('-').map((value) => parseFloat(value.trim()));
        const [minB, maxB] = b.peso.split('-').map((value) => parseFloat(value.trim()));
  
        const averageA = (minA + maxA) / 2;
        const averageB = (minB + maxB) / 2;
  
        const orderFactor = sortTypeW === 'asc' ? 1 : -1;
  
        return orderFactor * (averageA - averageB);
      };
  
      return parseWeight(a.peso) - parseWeight(b.peso);
    });
  
    dispatch(applyFilters(sortedDogs));
    setSortTypeW((prevSortType) => (prevSortType === 'asc' ? 'desc' : 'asc'));
  };
  

  


  const handleApplyFilters = (e) => {
    if (!selectedTemperament) {
      dispatch(getDogs(dogs));
      return;
    }

    let filteredDogs = dogs.filter((dog) => {
      return dog.temperament && dog.temperament.includes(selectedTemperament);
    });
  
    if (sortType === 'asc') {
      filteredDogs.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else {
      filteredDogs.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
  
    dispatch(applyFilters(filteredDogs));
  };
  const handleSortAZ = () => {
    const newSortType = sortType === 'asc' ? 'desc' : 'asc';
    setSortType(newSortType);

    // Obtén la lista de perros actualmente filtrada
    let filteredDogs = [...dogs];

    // Ordena la lista según el tipo de orden actual
    filteredDogs.sort((a, b) => (newSortType === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)));

    // Aplica los filtros
    dispatch(applyFilters(filteredDogs));
  };
    const handleOrigen = () => {
      let filteredDogs = [];
      if (filterType === 'all') {
        // Filtrar todos los perros
       dispatch(getDogs(dogs))
      } else if (filterType === 'api') {
        // Filtrar perros de la API
        filteredDogs = dogs.filter((dog) => dog.id < 300);
      } else if (filterType === 'uuid') {
        // Filtrar perros de la DB
            filteredDogs = dogs.filter((dog) => dog.id.length > 6 )
      }
  
      dispatch(applyFilters(filteredDogs));
    };
   


  return (
    <FiltrosContainer>
      <h5>Temperamento:</h5>
      <div>
        <SelectTemperamentos value={selectedTemperament} onChange={handleTemperamentChange}>
          <option value="">Todos</option>
          console.log(document.option.value)
          {temperaments.map((temperamento) => (
            <option key={temperamento.ID} value={temperamento.name}>
              {temperamento.name}
            </option>
          ))}
        </SelectTemperamentos>
          <BotonFiltro onClick={handleApplyFilters
          }>Aplicar Filtros</BotonFiltro>
  
      
      </div>
      <hr />
      <h5>Alfabético:</h5>
      <BotonFiltro onClick={handleSortAZ}>
        {sortType === 'asc' ? 'Z-A' : 'A-Z'}
      </BotonFiltro>

            <h5>Orden por Peso:</h5>
      
        <BotonFiltro onClick={handleSortByWeight}>
          {sortTypeW === 'asc' ? 'Menor a Mayor' : 'Mayor a Menor'}
        </BotonFiltro>

      <h5> Origen: </h5>
           <SelectTemperamentos value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">Todos</option>
          <option value="api">Dogs API</option>
          <option value="uuid">Dogs DB</option>
        </SelectTemperamentos>
        
        <BotonFiltro onClick={handleOrigen}>Aplicar Filtros</BotonFiltro>
  
    </FiltrosContainer>
 
  );
};

export default Filtros;