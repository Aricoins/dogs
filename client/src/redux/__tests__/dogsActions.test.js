import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../actions/dogsActions';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Dogs Actions', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('getDogs', () => {
    it('creates GET_DOGS action with fetched data on successful API call', async () => {
      const mockData = [
        { id: 1, nombre: 'Bulldog', peso: '20-25' },
        { id: 2, nombre: 'Labrador', peso: '25-36' }
      ];

      mockedAxios.get.mockResolvedValue({ data: mockData });

      const expectedActions = [
        { type: actions.GET_DOGS, payload: mockData }
      ];

      const store = mockStore({});

      await store.dispatch(actions.getDogs());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockedAxios.get).toHaveBeenCalledWith('https://server-dogs-lr41.onrender.com/dogs');
    });

    it('creates GET_DOGS action with empty array on API error when no cache', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      const expectedActions = [
        { type: actions.GET_DOGS, payload: [] }
      ];

      const store = mockStore({});
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      await store.dispatch(actions.getDogs());

      expect(store.getActions()).toEqual(expectedActions);
      expect(consoleSpy).toHaveBeenCalledWith('Error al obtener los dogs', expect.any(Error));
      
      consoleSpy.mockRestore();
      consoleLogSpy.mockRestore();
    });

    it('uses cache when available and within duration', async () => {
      const cachedData = [{ id: 1, nombre: 'Cached Dog' }];
      
      // Set up cache
      localStorage.setItem('dogs-cache', JSON.stringify(cachedData));
      localStorage.setItem('dogs-cache-timestamp', Date.now().toString());

      const expectedActions = [
        { type: actions.GET_DOGS, payload: cachedData }
      ];

      const store = mockStore({});
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      await store.dispatch(actions.getDogs());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockedAxios.get).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith('Usando datos del cache');
      
      consoleLogSpy.mockRestore();
    });
  });

  describe('getTemperaments', () => {
    it('creates GET_TEMPERAMENTS action with fetched data on successful API call', async () => {
      const mockTemperaments = [
        { name: 'Calm' },
        { name: 'Friendly' },
        { name: 'Active' }
      ];

      mockedAxios.get.mockResolvedValue({ data: mockTemperaments });

      const expectedActions = [
        { type: actions.GET_TEMPERAMENTS, payload: mockTemperaments }
      ];

      const store = mockStore({});

      await store.dispatch(actions.getTemperaments());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockedAxios.get).toHaveBeenCalledWith('https://server-dogs-lr41.onrender.com/temps');
    });

    it('creates GET_TEMPERAMENTS action with empty array on API error when no cache', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      const expectedActions = [
        { type: actions.GET_TEMPERAMENTS, payload: [] }
      ];

      const store = mockStore({});
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      await store.dispatch(actions.getTemperaments());

      expect(store.getActions()).toEqual(expectedActions);
      expect(consoleSpy).toHaveBeenCalledWith('Error al obtener temperamentos:', expect.any(Error));
      
      consoleSpy.mockRestore();
      consoleLogSpy.mockRestore();
    });

    it('uses cache when available and within duration for temperaments', async () => {
      const cachedData = [{ name: 'Cached Temperament' }];
      
      // Set up cache
      localStorage.setItem('temperaments-cache', JSON.stringify(cachedData));
      localStorage.setItem('temperaments-cache-timestamp', Date.now().toString());

      const expectedActions = [
        { type: actions.GET_TEMPERAMENTS, payload: cachedData }
      ];

      const store = mockStore({});
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      await store.dispatch(actions.getTemperaments());

      expect(store.getActions()).toEqual(expectedActions);
      expect(mockedAxios.get).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith('Usando temperamentos del cache');
      
      consoleLogSpy.mockRestore();
    });
  });

  describe('applyFilters', () => {
    it('creates APPLY_FILTERS action with provided dogs data', () => {
      const filteredDogs = [
        { id: 1, nombre: 'Bulldog', temperament: 'Calm' },
        { id: 2, nombre: 'Poodle', temperament: 'Friendly' }
      ];

      const store = mockStore({});
      const expectedActions = [
        { type: actions.APPLY_FILTERS, payload: filteredDogs }
      ];

      store.dispatch(actions.applyFilters(filteredDogs));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates APPLY_FILTERS action with empty array', () => {
      const store = mockStore({});
      const expectedActions = [
        { type: actions.APPLY_FILTERS, payload: [] }
      ];

      store.dispatch(actions.applyFilters([]));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('works correctly with thunk middleware', () => {
      const filteredDogs = [{ id: 1, nombre: 'Test Dog' }];
      const store = mockStore({});

      const expectedActions = [
        { type: actions.APPLY_FILTERS, payload: filteredDogs }
      ];

      store.dispatch(actions.applyFilters(filteredDogs));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Action Types', () => {
    it('exports correct action types', () => {
      expect(actions.GET_DOGS).toBe('GET_DOGS');
      expect(actions.GET_TEMPERAMENTS).toBe('GET_TEMPERAMENTS');
      expect(actions.APPLY_FILTERS).toBe('APPLY_FILTERS');
    });
  });
});