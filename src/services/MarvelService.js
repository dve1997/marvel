import { useHttp } from "../hooks/http.hook";

const useMarvelServices = () => {
  const { process, setProcess, request, changeError } = useHttp();

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

  const getComics = async (offSet = _baseOffSet, limit = _baseLimit) => {
    const comics = await request(
      `${_apiBase}comics?orderBy=-onsaleDate&limit=${limit}&offset=${offSet}&${_apiKey}`
    );
    return comics.data.results.map((item) => {
      return _transformComics(item);
    });
  };

  const getComic = async (id) => {
    const comics = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(comics.data.results[0]);
  };

  const getCharacterForName = async (name) => {
    const char = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    if (char.data.results.length === 0) {
      return false;
    } else {
      return _transformChar(char.data.results[0]);
    }
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

  const _transformComics = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description,
      pages: comic.pageCount,
      price: comic.prices[0].price,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    };
  };

  return {
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    getComics,
    getComic,
    getCharacterForName,
  };
};

export default useMarvelServices;
