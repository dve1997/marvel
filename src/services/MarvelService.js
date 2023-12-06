class MarvelServices {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=efbf41042c1dee2ef1c1383a25064e0c";
  _baseOffSet = 215;
  _baseLimit = 9;

  getData = async (url) => {
    let res = await fetch(url);

    return await res.json();
  };

  getAllCharacters = async (
    offSet = this._baseOffSet,
    limit = this._baseLimit
  ) => {
    const char = await this.getData(
      `${this._apiBase}characters?limit=${limit}&offset=${offSet}&${this._apiKey}`
    );
    return char.data.results.map((item) => {
      return this._transformChar(item);
    });
  };

  getCharacter = async (id) => {
    const char = await this.getData(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformChar(char.data.results[0]);
  };

  _transformChar = (char) => {
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
}

export default MarvelServices;
