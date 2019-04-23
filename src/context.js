import React , {Component} from 'react'
import axios from 'axios'

const Context = React.createContext();
//we create a reducer function as  shown in the state below 
const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_SONG":
            return {
                ...state,
                track_list: action.payload,
                heading:"Searching Songs"
            }           
        case "SEARCH_COUNTRY":
            return {
                ...state,
                track_list: action.payload,
                heading: "Searched Country",
                country: action.country
            }
        default:
            return state;
    }
}


export class Provider extends Component  {
    state = {
        track_list: [],
        heading: '20 Top Rated Songs',
        country: 'us',
        dispatch: action => this.setState(state => reducer(state, action))
    }
    //using this we have a reducer from which we can easily called a dispatch function from any consumer component
    //normally we get data using  dispatch from any consumer component
    componentDidMount() {
        axios.get(`
        https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=20&country=${this.state.country}&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
        )
        .then(res => {
            this.setState({
                track_list: res.data.message.body.track_list
            })
        })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
