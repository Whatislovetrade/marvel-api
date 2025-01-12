import { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {

    state = {
        char: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    updateChar = () => {

        this.setState({
            loading: true,
            error: false
        })


        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    showItems = (arr) => {
        return arr.map((item, index) => {
            const { name, thumbnail } = item

            return (
            <li className="char__item" key={index}>
                <img src={thumbnail} alt="abyss"/>
                <div className="char__name">{ name }</div>
            </li>
            )  
        })

      
    }

  
        
    render() {

        const { char, error, loading } = this.state
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading? <Spinner /> : null
  
        const content = !(loading || error) ? this.showItems(char): null
        
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;