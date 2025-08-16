import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  currentFamily: null,
  families: [],
  loading: false,
  error: null
};

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  SET_FAMILIES: 'SET_FAMILIES',
  SET_CURRENT_FAMILY: 'SET_CURRENT_FAMILY',
  ADD_FAMILY_MEMBER: 'ADD_FAMILY_MEMBER',
  UPDATE_FAMILY_MEMBER: 'UPDATE_FAMILY_MEMBER',
  REMOVE_FAMILY_MEMBER: 'REMOVE_FAMILY_MEMBER'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.SET_USER:
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload,
        loading: false 
      };
    
    case ACTIONS.LOGOUT:
      localStorage.removeItem('token');
      return { 
        ...initialState
      };
    
    case ACTIONS.SET_FAMILIES:
      return { ...state, families: action.payload, loading: false };
    
    case ACTIONS.SET_CURRENT_FAMILY:
      return { ...state, currentFamily: action.payload };
    
    case ACTIONS.ADD_FAMILY_MEMBER:
      if (state.currentFamily) {
        return {
          ...state,
          currentFamily: {
            ...state.currentFamily,
            members: [...(state.currentFamily.members || []), action.payload]
          }
        };
      }
      return state;
    
    case ACTIONS.UPDATE_FAMILY_MEMBER:
      if (state.currentFamily) {
        return {
          ...state,
          currentFamily: {
            ...state.currentFamily,
            members: state.currentFamily.members.map(member =>
              member.id === action.payload.id ? action.payload : member
            )
          }
        };
      }
      return state;
    
    case ACTIONS.REMOVE_FAMILY_MEMBER:
      if (state.currentFamily) {
        return {
          ...state,
          currentFamily: {
            ...state.currentFamily,
            members: state.currentFamily.members.filter(
              member => member.id !== action.payload
            )
          }
        };
      }
      return state;
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check for existing token on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Verify token with backend
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      // For now, just set loading to false
      setTimeout(() => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }, 1000);
    }
  }, []);

  // Action creators
  const actions = {
    setLoading: (loading) => dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
    setUser: (user) => dispatch({ type: ACTIONS.SET_USER, payload: user }),
    logout: () => dispatch({ type: ACTIONS.LOGOUT }),
    setFamilies: (families) => dispatch({ type: ACTIONS.SET_FAMILIES, payload: families }),
    setCurrentFamily: (family) => dispatch({ type: ACTIONS.SET_CURRENT_FAMILY, payload: family }),
    addFamilyMember: (member) => dispatch({ type: ACTIONS.ADD_FAMILY_MEMBER, payload: member }),
    updateFamilyMember: (member) => dispatch({ type: ACTIONS.UPDATE_FAMILY_MEMBER, payload: member }),
    removeFamilyMember: (memberId) => dispatch({ type: ACTIONS.REMOVE_FAMILY_MEMBER, payload: memberId })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};