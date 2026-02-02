const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINTS = {
  TOBB_OLDAL: import.meta.env.VITE_API_TOBB_OLDAL,
  EGY_OLDAL: import.meta.env.VITE_API_EGY_OLDAL,
};

/**
 * Általános API hívás kezelő függvény
 * @param {string} endpoint - Az API végpont (pl. '/telefonok', '/gyartok')
 * @param {object} options - Fetch opciók (method, body, stb.)
 * @returns {Promise} - A válasz JSON formátumban
 */
export async function apiCall(endpoint, options = {}) {
  const { method = 'GET', body, headers = {} } = options;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API hívás hiba:', error);
    throw error;
  }
}

// Specifikus API hívások
export const tobbOldalAPI = {
  getAll: () => apiCall(ENDPOINTS.TOBB_OLDAL),
  
  getById: (id) => apiCall(`${ENDPOINTS.TOBB_OLDAL}/${id}`),
  
  create: (data) => apiCall(ENDPOINTS.TOBB_OLDAL, {
    method: 'POST',
    body: data,
  }),
  
  update: (id, data) => apiCall(`${ENDPOINTS.TOBB_OLDAL}/${id}`, {
    method: 'PATCH',
    body: data,
  }),
  
  delete: (id) => apiCall(`${ENDPOINTS.TOBB_OLDAL}/${id}`, {
    method: 'DELETE',
  }),
};

export const egyOldalAPI = {
  getAll: () => apiCall(ENDPOINTS.EGY_OLDAL),
  
  getById: (id) => apiCall(`${ENDPOINTS.EGY_OLDAL}/${id}`),
  
  create: (data) => apiCall(ENDPOINTS.EGY_OLDAL, {
    method: 'POST',
    body: data,
  }),
  
  update: (id, data) => apiCall(`${ENDPOINTS.EGY_OLDAL}/${id}`, {
    method: 'PATCH',
    body: data,
  }),
  
  delete: (id) => apiCall(`${ENDPOINTS.EGY_OLDAL}/${id}`, {
    method: 'DELETE',
  }),
};
