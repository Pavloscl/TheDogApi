// // Importar el repositorio dog
// const dogRepository = require('../../repositories/dog/dogRepository');

// exports.obtenerDatosCaninos = async () => {
//     try {
//         return await dogRepository.obtenerDatosCaninos();
//     } catch (error) {
//         throw new Error(`Error al obtener datos caninos: ${error.message}`);
//     }
// };


// exports.obtenerImagenPorRaza = async (Id) => {
//     try {
//         if (!Id) {
//             throw new Error('Debe proporcionar un Id');
//         }
//         return await dogRepository.obtenerImagenPorRaza(Id);
//     } catch (error) {
//         throw new Error(`Error al obtener imagen por raza: ${error.message}`);
//     }
// };


const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hora

const API_BASE = 'https://api.thedogapi.com/v1';

exports.getBreeds = async () => {
  const cacheKey = 'breeds';
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  const response = await axios.get(`${API_BASE}/breeds`);
  const data = response.data.map(b => ({
    id: b.id,
    name: b.name,
    origin: b.origin || null,
    temperament: b.temperament,
    breed_group: b.breed_group || null
  }));
  cache.set(cacheKey, data);
  return data;
};

exports.getImageByBreed = async (breedId) => {
  const cacheKey = `image_${breedId}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  // validar existencia de raza
  const breeds = await this.getBreeds();
  const exists = breeds.some(b => b.id === breedId);
  if (!exists) return null;
  const resp = await axios.get(`${API_BASE}/images/search`, { params: { breed_id: breedId } });
  if (!resp.data.length) return null;
  const result = { id: resp.data[0].id, image_url: resp.data[0].url };
  cache.set(cacheKey, result);
  return result;
};


exports.getFullBreedInfoById = async (breedId) => {
  const cacheKey = `breed_${breedId}`;
  
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    return {
      ...cached,
      image_url: cached.image_url || null
    };
  }

  try {
    const resp = await axios.get(`${API_BASE}/breeds/${breedId}`);
    const data = resp.data;

    if (!data || !data.id || !data.name) {
      console.warn(`Raza con ID ${breedId} no encontrada `);
      return null;
    }

    const breedInfo = {
      idBreed: data.id,
      name: data.name,
      origin: data.origin || null,
      temperament: data.temperament || null,
      breed_group: data.breed_group || null
    };

    let image_url = data.image?.url || null;

    if (!image_url) {
      const imageResult = await exports.getImageByBreed(breedId);
      image_url = imageResult?.image_url || null;
    }
    const fullInfo = { ...breedInfo, image_url };

    cache.set(cacheKey, fullInfo);
    return fullInfo;

  } catch (error) {
    console.error(`Error al obtener información de la raza ${breedId}:`, error.message);
    return null;
  }
};
