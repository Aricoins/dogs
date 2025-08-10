import reducer from '../reducers/reducer';
import { GET_DOGS, GET_TEMPERAMENTS, APPLY_FILTERS } from '../actions/dogsActions';
import { SET_PAGE, SET_TOTAL_PAGES } from '../actions/paginationActions';

describe('Dogs Reducer', () => {
  const initialState = {
    dogs: [],
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 10,
    totalItems: 0,
    temperaments: [],
    filteredTemperaments: [],
    filteredDogs: []
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('GET_DOGS action', () => {
    it('should handle GET_DOGS and update dogs array', () => {
      const mockDogs = [
        { id: 1, nombre: 'Bulldog', peso: '20-25' },
        { id: 2, nombre: 'Labrador', peso: '25-36' }
      ];

      const action = {
        type: GET_DOGS,
        payload: mockDogs
      };

      const expectedState = {
        ...initialState,
        dogs: mockDogs
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DOGS with empty array', () => {
      const action = {
        type: GET_DOGS,
        payload: []
      };

      const expectedState = {
        ...initialState,
        dogs: []
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should replace existing dogs when GET_DOGS is dispatched', () => {
      const existingState = {
        ...initialState,
        dogs: [{ id: 1, nombre: 'Old Dog' }]
      };

      const newDogs = [
        { id: 2, nombre: 'New Dog 1' },
        { id: 3, nombre: 'New Dog 2' }
      ];

      const action = {
        type: GET_DOGS,
        payload: newDogs
      };

      const expectedState = {
        ...existingState,
        dogs: newDogs
      };

      expect(reducer(existingState, action)).toEqual(expectedState);
    });
  });

  describe('GET_TEMPERAMENTS action', () => {
    it('should handle GET_TEMPERAMENTS and update temperaments array', () => {
      const mockTemperaments = [
        { name: 'Calm' },
        { name: 'Friendly' },
        { name: 'Active' }
      ];

      const action = {
        type: GET_TEMPERAMENTS,
        payload: mockTemperaments
      };

      const expectedState = {
        ...initialState,
        temperaments: mockTemperaments
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_TEMPERAMENTS with empty array', () => {
      const action = {
        type: GET_TEMPERAMENTS,
        payload: []
      };

      const expectedState = {
        ...initialState,
        temperaments: []
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should replace existing temperaments when GET_TEMPERAMENTS is dispatched', () => {
      const existingState = {
        ...initialState,
        temperaments: [{ name: 'Old Temperament' }]
      };

      const newTemperaments = [
        { name: 'New Temperament 1' },
        { name: 'New Temperament 2' }
      ];

      const action = {
        type: GET_TEMPERAMENTS,
        payload: newTemperaments
      };

      const expectedState = {
        ...existingState,
        temperaments: newTemperaments
      };

      expect(reducer(existingState, action)).toEqual(expectedState);
    });
  });

  describe('APPLY_FILTERS action', () => {
    it('should handle APPLY_FILTERS and update dogs array with filtered data', () => {
      const existingState = {
        ...initialState,
        dogs: [
          { id: 1, nombre: 'Bulldog' },
          { id: 2, nombre: 'Labrador' },
          { id: 3, nombre: 'Poodle' }
        ]
      };

      const filteredDogs = [
        { id: 1, nombre: 'Bulldog' },
        { id: 3, nombre: 'Poodle' }
      ];

      const action = {
        type: APPLY_FILTERS,
        payload: filteredDogs
      };

      const expectedState = {
        ...existingState,
        dogs: filteredDogs
      };

      expect(reducer(existingState, action)).toEqual(expectedState);
    });

    it('should handle APPLY_FILTERS with empty array', () => {
      const existingState = {
        ...initialState,
        dogs: [{ id: 1, nombre: 'Test Dog' }]
      };

      const action = {
        type: APPLY_FILTERS,
        payload: []
      };

      const expectedState = {
        ...existingState,
        dogs: []
      };

      expect(reducer(existingState, action)).toEqual(expectedState);
    });

    it('should not affect other state properties when applying filters', () => {
      const existingState = {
        ...initialState,
        dogs: [{ id: 1, nombre: 'Original Dog' }],
        temperaments: [{ name: 'Friendly' }],
        currentPage: 2,
        totalPages: 5
      };

      const filteredDogs = [{ id: 2, nombre: 'Filtered Dog' }];

      const action = {
        type: APPLY_FILTERS,
        payload: filteredDogs
      };

      const expectedState = {
        ...existingState,
        dogs: filteredDogs
      };

      expect(reducer(existingState, action)).toEqual(expectedState);
      expect(reducer(existingState, action).temperaments).toEqual(existingState.temperaments);
      expect(reducer(existingState, action).currentPage).toEqual(existingState.currentPage);
      expect(reducer(existingState, action).totalPages).toEqual(existingState.totalPages);
    });
  });

  describe('Pagination actions', () => {
    it('should handle SET_PAGE and update currentPage', () => {
      const action = {
        type: SET_PAGE,
        payload: 3
      };

      const expectedState = {
        ...initialState,
        currentPage: 3
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_TOTAL_PAGES and update totalPages', () => {
      const action = {
        type: SET_TOTAL_PAGES,
        payload: 10
      };

      const expectedState = {
        ...initialState,
        totalPages: 10
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('Unknown actions', () => {
    it('should return current state for unknown action type', () => {
      const currentState = {
        ...initialState,
        dogs: [{ id: 1, nombre: 'Test Dog' }]
      };

      const unknownAction = {
        type: 'UNKNOWN_ACTION',
        payload: 'some data'
      };

      expect(reducer(currentState, unknownAction)).toEqual(currentState);
    });

    it('should not mutate the original state', () => {
      const currentState = {
        ...initialState,
        dogs: [{ id: 1, nombre: 'Test Dog' }]
      };

      const action = {
        type: GET_DOGS,
        payload: [{ id: 2, nombre: 'New Dog' }]
      };

      const newState = reducer(currentState, action);

      expect(newState).not.toBe(currentState);
      expect(newState.dogs).not.toBe(currentState.dogs);
      expect(currentState.dogs).toEqual([{ id: 1, nombre: 'Test Dog' }]);
    });
  });

  describe('State immutability', () => {
    it('should maintain state immutability across all actions', () => {
      let state = initialState;
      
      // Test GET_DOGS immutability
      const dogsAction = {
        type: GET_DOGS,
        payload: [{ id: 1, nombre: 'Dog 1' }]
      };
      
      const newState1 = reducer(state, dogsAction);
      expect(newState1).not.toBe(state);
      
      // Test GET_TEMPERAMENTS immutability
      const temperamentsAction = {
        type: GET_TEMPERAMENTS,
        payload: [{ name: 'Calm' }]
      };
      
      const newState2 = reducer(newState1, temperamentsAction);
      expect(newState2).not.toBe(newState1);
      
      // Test APPLY_FILTERS immutability
      const filtersAction = {
        type: APPLY_FILTERS,
        payload: [{ id: 1, nombre: 'Filtered Dog' }]
      };
      
      const newState3 = reducer(newState2, filtersAction);
      expect(newState3).not.toBe(newState2);
      
      // Original state should remain unchanged
      expect(state).toEqual(initialState);
    });
  });
});