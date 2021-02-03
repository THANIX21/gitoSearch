import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      searchTerm: ''                             
    }   

    this.arr = [];

    this.handleSearchChange = this.handleSearchChange.bind(this);  
    this.handleEnterPress = this.handleEnterPress.bind(this);  
    this.handleCardPress = this.handleCardPress.bind(this);
    this.searchGit = this.searchGit.bind(this);
    this.displayResults = this.displayResults.bind(this);


  }     

  handleSearchChange = (event) => { //change variable as it is entered
    this.setState({
        searchTerm: event.target.value
      }
    )    
  }
  
  handleEnterPress = (event) => {
    if(event.keyCode === 13){
      this.searchGit();
    }    
  }

  handleCardPress = (event) => {
     const detailCard = document.getElementById(event.target.id);    
     console.log(detailCard.id);
  }

  searchGit = async () => { //retrieve data, convert to json and store items in array for easy access 
    try {

      const res = await fetch(`https://api.github.com/search/repositories?q=${this.state.searchTerm}`)
      let data = await res.json();
      this.arr = data.items;  
      if(data.items < 1) { //make sure results are found by checking the length of the json items array
        const container = document.getElementById('results');
        container.innerHTML = `
          <div class="container">
            <div class="card">          
              No results were found        
            </div>
          </div> 
        `;

      } else {

        this.displayResults(this.arr.length); 
         
      }        
      
    } catch (err) { //make sure that if nothing is searched this message is displayed

      const container = document.getElementById('results');
      container.innerHTML = `
      <div class="container">
        <div class="card">          
          Enter a search term         
        </div>
      </div> 
      `;
      
    }    
  } 

  displayResults = resLength => { //get result area to inject search results dynamically and add html to describe every search result
    const container = document.getElementById('results');
    container.innerHTML = '';

    for (var itmNo = 0; itmNo < resLength; itmNo++) {        
      
      const content = `
      <div class="container">
        <div class="card" id="${itmNo}">  
          <div class="front">            
            <h2>${this.arr[itmNo].name}</h2>
            <h3>${this.arr[itmNo].owner.login}</h3>                        
          </div>  
          <div class="back">
            <p>URL : <a href=${this.arr[itmNo].html_url}>${this.arr[itmNo].html_url}</a> </p>
            <p>Description:${'  ' + this.arr[itmNo].description}</p>
            <p>Forks:${'        ' + this.arr[itmNo].forks_count}</p>
            <p>Stargazers:${'   ' + this.arr[itmNo].stargazers_count}</p>
            <p>Open Issues:${'  ' + this.arr[itmNo].open_issues}</p>   
          </div>        
        </div>
      </div>        
      `;
      

      container.innerHTML += content;            
    }
  }  

  render () { //render title, search button and result area to display data to be injected later
    return (      
      <div className="App">        
        <div>
          <h1>
            gitoSearch
          </h1>
        </div>        
        <div>
          <input
            type='text' 
            id='searchfield'
            value={this.state.searchTerm} 
            onKeyDown={this.handleEnterPress}
            onChange={this.handleSearchChange}                                                       
          />                             
        </div>                
        <Button id="SearchBtn" value="Search Github" onClick={this.searchGit}>Search Github</Button>         
        <div class="resultbox" id="results">                                                                                       
        </div>                                                    
      </div>       
    )
  }    
}

export default App
