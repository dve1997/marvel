class MarvelServices {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=efbf41042c1dee2ef1c1383a25064e0c";

  getData = async (url) => {
    let res = await fetch(url);

    return await res.json();
  };

  getAllCharacters = async () => {
    const char = await this.getData(
      `${this._apiBase}characters?limit=9&offset=215&${this._apiKey}`
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
    };
  };
}

export default MarvelServices;
