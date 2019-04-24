import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import jsonData from "./NameOfCountry.json"

class Search extends Component {
  state = {
    trackTitle: '',
    countryName: ''
  };
  findTrack = (dispatch, e) => {
    e.preventDefault();
    if(this.state.trackTitle.length !== 0){
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        dispatch({
          type: 'SEARCH_SONG',
          payload: res.data.message.body.track_list
        });
        this.setState({ trackTitle: '' });
      })
      .catch(err => console.log(err));
    }
    if(this.state.countryName.length !== 0){
      for(var key in jsonData){  
        if(this.state.countryName === key){
          this.setState({
            countryName: jsonData[key]
          }, () => {
            axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=20&country=${this.state.countryName}&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        console.log(this.state.countryName)
        dispatch({
          type: 'SEARCH_COUNTRY',
          payload: res.data.message.body.track_list,
          countryName: this.state.countryName
        });

        this.setState({ countryName: '' });
      })
      .catch(err => console.log(err));
          });
          break;
        }
      }
      console.log(this.state.countryName)
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">

                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Country Name Here..."
                    name="countryName"
                    value={this.state.countryName}
                    onChange={this.onChange}
                  />
                  <br />
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;