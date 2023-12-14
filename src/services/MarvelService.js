import { useHttp } from "../hooks/http.hook";

const useMarvelServices = () => {
  const { loading, error, setLoading, request } = useHttp();

  const _apiKey = "apikey=efbf41042c1dee2ef1c1383a25064e0c";
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _baseOffSet = 215;
  const _baseLimit = 9;

  const getAllCharacters = async (offSet = _baseOffSet, limit = _baseLimit) => {
    const char = await request(
      `${_apiBase}characters?limit=${limit}&offset=${offSet}&${_apiKey}`
    );
    return char.data.results.map((item) => {
      return _transformChar(item);
    });
  };

  const getCharacter = async (id) => {
    const char = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformChar(char.data.results[0]);
  };

  const _transformChar = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      detail: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  return { loading, error, setLoading, getAllCharacters, getCharacter };
};

export default useMarvelServices;
