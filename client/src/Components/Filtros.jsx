import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import colores from '../vistas/colores';
import { getTemperaments, applyFilters, getDogs } from '../redux/actions/dogsActions';
import { translateTemperaments } from '../utils/temperamentTranslations';

const FiltrosContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: ${colores.white};
  border-radius: 12px;
  margin: 20px 0;
  padding: 20px;
  width: 100%;
  min-height: 60px;
  color: ${colores.primary};
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${colores.mediumShadow};
  border: 1px solid ${colores.lightGrey};
  gap: 20px;
  
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    align-items: stretch;
  }
  
  h5 {
    margin: 0 8px 0 0;
    color: ${colores.primary};
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    
    @media only screen and (max-width: 768px) {
      margin: 0 0 8px 0;
      text-align: center;
    }
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const BotonFiltro = styled.button`
  padding: 10px 16px;
  background: ${colores.primaryGradient};
  color: ${colores.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 120px;
  box-shadow: ${colores.softShadow};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colores.mediumShadow};
    background: linear-gradient(135deg, #5a67d8 0%, #667eea 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media only screen and (max-width: 768px) {
    min-width: auto;
    width: 100%;
    padding: 12px 16px;
  }
`;

const SelectTemperamentos = styled.select`
  padding: 10px 12px;
  border: 2px solid ${colores.lightGrey};
  border-radius: 8px;
  background-color: ${colores.white};
  color: ${colores.primary};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  outline: none;
  
  &:focus {
    border-color: ${colores.secondary};
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
  
  &:hover {
    border-color: ${colores.secondary};
  }
  
  option {
    padding: 8px;
    color: ${colores.primary};
  }
  
  @media only screen and (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid ${colores.lightGrey};
  border-radius: 50%;
  border-top-color: ${colores.secondary};
  animation: spin 1s ease-in-out infinite;
  margin: 0 8px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 30px;
  background-color: ${colores.lightGrey};
  margin: 0 8px;
  
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 1px;
    margin: 8px 0;
  }
`;
const Filtros = () => {
  const dogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [selectedTemperament, setSelectedTemperament] = useState("");
  const [filterType, setFilterType] = useState('all');
  const [sortType, setSortType] = useState('asc');
  const [sortTypeW, setSortTypeW] = useState('asc');
  const [loading, setLoading] = useState(true);
          
          useEffect(() => {
            dispatch(getTemperaments());
            setLoading(false);
          }, [dispatch]);

          const handleTemperamentChange = (e) => {
            setSelectedTemperament(e.target.value);
          };


            const handleSortByWeight = () => {
              // Lógica actualizada para ordenar por peso y actualizar el estado
              const sortedDogs = [...dogs].sort((a, b) => {
                const parseWeight = (weight) => {
                  if (typeof weight !== 'string') {
                    return 0;
                  }

                  const [minA, maxA] = weight.split('-').map((value) => parseFloat(value.trim()));
                  if (isNaN(minA) || isNaN(maxA)) {
                    return 0;
                  }

                  const averageA = (minA + maxA) / 2;

                  return averageA;
                };

                // Cambia el orden según el estado actual
                const orderMultiplier = sortTypeW === 'Mayor a Menor' ? 1 : -1;

                return (parseWeight(a.peso) - parseWeight(b.peso)) * orderMultiplier;
              });

              dispatch(applyFilters(sortedDogs));
              setSortTypeW((prevSortType) => (prevSortType === 'Mayor a Menor' ? 'Menor a Mayor' : 'Mayor a Menor'));
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
      <FilterGroup>
        <h5>Temperamento:</h5>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <SelectTemperamentos value={selectedTemperament} onChange={handleTemperamentChange}>
              <option value="">Todos los temperamentos</option>
              {temperaments.map((temperamento, index) => (
                <option key={index} value={temperamento.name}>
                  {translateTemperaments(temperamento.name)}
                </option>
              ))}
            </SelectTemperamentos>
            <BotonFiltro onClick={handleApplyFilters}>
              Aplicar
            </BotonFiltro>
          </>
        )}
      </FilterGroup>

      <Divider />

      <FilterGroup>
        <h5>Alfabético:</h5>
        <BotonFiltro onClick={handleSortAZ}>
          {sortType === 'asc' ? 'Z → A' : 'A → Z'}
        </BotonFiltro>
      </FilterGroup>

      <Divider />

      <FilterGroup>
        <h5>Por Peso:</h5>
        <BotonFiltro onClick={handleSortByWeight}>
          {sortTypeW === 'Mayor a Menor' ? 'Menor → Mayor' : 'Mayor → Menor'}
        </BotonFiltro>
      </FilterGroup>

      <Divider />

      <FilterGroup>
        <h5>Origen:</h5>
        <SelectTemperamentos value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">Todos los orígenes</option>
          <option value="api">API Externa</option>
          <option value="uuid">Base de Datos</option>
        </SelectTemperamentos>
        <BotonFiltro onClick={handleOrigen}>
          Aplicar
        </BotonFiltro>
      </FilterGroup>
    </FiltrosContainer>
  );
};

export default Filtros;
