import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import Filtros from '../Filtros';
import reducer from '../../redux/reducers/reducer';
import * as dogsActions from '../../redux/actions/dogsActions';

// Mock the actions
jest.mock('../../redux/actions/dogsActions');

const mockStore = (initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunk));
};

const mockDogs = [
  {
    id: 1,
    nombre: 'Bulldog',
    peso: '20 - 25',
    temperament: 'Calm, Courageous, Friendly',
    imagen: 'test-image.jpg'
  },
  {
    id: 2,
    nombre: 'Labrador',
    peso: '25 - 36',
    temperament: 'Friendly, Active, Outgoing',
    imagen: 'test-image2.jpg'
  },
  {
    id: 'uuid-123',
    nombre: 'Custom Dog',
    peso: '15 - 20',
    temperament: 'Calm, Friendly',
    imagen: 'test-image3.jpg'
  }
];

const mockTemperaments = [
  { name: 'Calm' },
  { name: 'Friendly' },
  { name: 'Active' },
  { name: 'Courageous' },
  { name: 'Outgoing' }
];

const initialState = {
  dogs: mockDogs,
  temperaments: mockTemperaments,
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 10,
  totalItems: 0,
  filteredTemperaments: [],
  filteredDogs: []
};

describe('Filtros Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    dogsActions.getTemperaments.mockReturnValue({ type: 'GET_TEMPERAMENTS' });
    dogsActions.applyFilters.mockReturnValue({ type: 'APPLY_FILTERS' });
    dogsActions.getDogs.mockReturnValue({ type: 'GET_DOGS' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (storeState = initialState) => {
    const testStore = mockStore(storeState);
    return render(
      <Provider store={testStore}>
        <Filtros />
      </Provider>
    );
  };

  test('renders filter component with all filter options', () => {
    renderComponent();

    expect(screen.getByText('Temperamento:')).toBeInTheDocument();
    expect(screen.getByText('Alfabético:')).toBeInTheDocument();
    expect(screen.getByText('Por Peso:')).toBeInTheDocument();
    expect(screen.getByText('Origen:')).toBeInTheDocument();
  });

  test('displays temperament options in select', async () => {
    renderComponent();

    const temperamentSelect = screen.getByDisplayValue('');
    expect(temperamentSelect).toBeInTheDocument();

    // Check if "Todos" option is present
    expect(screen.getByText('Todos')).toBeInTheDocument();
  });

  test('temperament filter works correctly', async () => {
    renderComponent();

    const temperamentSelect = screen.getByDisplayValue('');
    const applyButton = screen.getByText('Aplicar Filtro');

    // Select a temperament
    fireEvent.change(temperamentSelect, { target: { value: 'Calm' } });
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(dogsActions.applyFilters).toHaveBeenCalled();
    });
  });

  test('alphabetical sorting A-Z works', async () => {
    renderComponent();

    const alphabeticalButton = screen.getByText('Z-A');
    fireEvent.click(alphabeticalButton);

    await waitFor(() => {
      expect(dogsActions.applyFilters).toHaveBeenCalled();
    });
  });

  test('alphabetical sorting Z-A works', async () => {
    renderComponent();

    const alphabeticalButton = screen.getByText('Z-A');
    fireEvent.click(alphabeticalButton);
    
    // Click again to toggle to A-Z
    const newAlphabeticalButton = screen.getByText('A-Z');
    fireEvent.click(newAlphabeticalButton);

    await waitFor(() => {
      expect(dogsActions.applyFilters).toHaveBeenCalledTimes(2);
    });
  });

  test('weight sorting works correctly', async () => {
    renderComponent();

    const weightButton = screen.getByText('Mayor a Menor');
    fireEvent.click(weightButton);

    await waitFor(() => {
      expect(dogsActions.applyFilters).toHaveBeenCalled();
    });
  });

  test('weight sorting toggles between Mayor a Menor and Menor a Mayor', async () => {
    renderComponent();

    const weightButton = screen.getByText('Mayor a Menor');
    fireEvent.click(weightButton);

    await waitFor(() => {
      expect(screen.getByText('Menor a Mayor')).toBeInTheDocument();
    });
  });

  test('origin filter shows correct options', () => {
    renderComponent();

    const originSelect = screen.getAllByDisplayValue('all')[0];
    expect(originSelect).toBeInTheDocument();

    // Check if origin options are present
    expect(screen.getByText('Dogs API')).toBeInTheDocument();
    expect(screen.getByText('Dogs DB')).toBeInTheDocument();
  });

  test('origin filter API works correctly', async () => {
    renderComponent();

    const originSelect = screen.getAllByDisplayValue('all')[0];
    const originApplyButton = screen.getAllByText('Aplicar Filtro')[1];

    fireEvent.change(originSelect, { target: { value: 'api' } });
    fireEvent.click(originApplyButton);

    await waitFor(() => {
      expect(dogsActions.applyFilters).toHaveBeenCalled();
    });
  });

  test('origin filter DB works correctly', async () => {
    renderComponent();

    const originSelect = screen.getAllByDisplayValue('all')[0];
    const originApplyButton = screen.getAllByText('Aplicar Filtro')[1];

    fireEvent.change(originSelect, { target: { value: 'uuid' } });
    fireEvent.click(originApplyButton);

    await waitFor(() => {
      expect(dogsActions.applyFilters).toHaveBeenCalled();
    });
  });

  test('handles loading state correctly', () => {
    const loadingState = {
      ...initialState,
      temperaments: []
    };

    renderComponent(loadingState);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('filters by temperament correctly with no selection', async () => {
    renderComponent();

    const applyButton = screen.getByText('Aplicar Filtro');
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(dogsActions.getDogs).toHaveBeenCalled();
    });
  });

  test('weight parsing handles different formats correctly', () => {
    // This test verifies the weight parsing logic indirectly
    // by ensuring the component renders without errors with various weight formats
    const dogsWithDifferentWeights = [
      { id: 1, nombre: 'Dog1', peso: '20 - 25', temperament: 'Calm' },
      { id: 2, nombre: 'Dog2', peso: '30', temperament: 'Active' },
      { id: 3, nombre: 'Dog3', peso: 'Unknown', temperament: 'Friendly' }
    ];

    const stateWithDifferentWeights = {
      ...initialState,
      dogs: dogsWithDifferentWeights
    };

    renderComponent(stateWithDifferentWeights);
    
    const weightButton = screen.getByText('Mayor a Menor');
    expect(weightButton).toBeInTheDocument();
    
    // Should not throw error when clicking
    expect(() => fireEvent.click(weightButton)).not.toThrow();
  });

  test('handles empty dogs array', () => {
    const emptyDogsState = {
      ...initialState,
      dogs: []
    };

    renderComponent(emptyDogsState);
    
    expect(screen.getByText('Temperamento:')).toBeInTheDocument();
    expect(screen.getByText('Alfabético:')).toBeInTheDocument();
    expect(screen.getByText('Por Peso:')).toBeInTheDocument();
    expect(screen.getByText('Origen:')).toBeInTheDocument();
  });

  test('multiple filters can be applied in sequence', async () => {
    renderComponent();

    // Apply temperament filter
    const temperamentSelect = screen.getByDisplayValue('');
    fireEvent.change(temperamentSelect, { target: { value: 'Calm' } });
    fireEvent.click(screen.getByText('Aplicar Filtro'));

    // Apply alphabetical sort
    const alphabeticalButton = screen.getByText('Z-A');
    fireEvent.click(alphabeticalButton);

    // Apply weight sort
    const weightButton = screen.getByText('Mayor a Menor');
    fireEvent.click(weightButton);

    await waitFor(() => {
      expect(dogsActions.applyFilters).toHaveBeenCalledTimes(3);
    });
  });
});