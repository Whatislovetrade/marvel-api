

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=9af7c2d2be2a1e33321a19377ccad3b1'



    getResourse = async (url) => {
       const res = await fetch(url)
       
       if (!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`)
       }

       return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
            const transformed = {
                name: char.name,
                description: char.description || 'Нет описания персонажа',
                thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
                homepage: char.urls[0]?.url || '#',
                wiki: char.urls[1]?.url || '#'
            };
        
            if (transformed.description.length > 210) {
                transformed.description = transformed.description.slice(0, 210) + '...';
            }
        
            return transformed;
   
    }
}

export default MarvelService