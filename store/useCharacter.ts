import axios from 'axios';
import type { Character } from '@/types/character';

export const useCharacters = () => {
  const characters = ref<Character[]>([]);
  const character = ref<Character>();
  const totalCount = ref(0);
  const limit = ref(10);
  const page = ref(1);

  const getAllCharacters = async (
      page?: number,
      limit?: number,
      name?: string,
      status?: string,
      species?: string,
      type?: string,
      gender?: string) => {
    try {
      const { data } = await axios.get(`https://rickandmortyapi.com/api/character/`, {
        params: {
          page: page,
          limit: limit,
          name: name,
          status: status,
          species: species,
          type: type,
          gender: gender,
        },
      });
      const charactersArray = data.results;
      const slicedCharacters = charactersArray.slice(0, limit);

      totalCount.value = data.info.count;
      characters.value = slicedCharacters;

    } catch {
      return null;
    }
  };

  const getCharacterById = async (id: string | string[]) => {
    try {
      const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      character.value = data;
    } catch {
      return null;
    }
  };

  return {
    characters,
    getAllCharacters,
    character,
    getCharacterById,
    totalCount,
    limit,
    page,
  };
};

