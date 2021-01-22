import React, {Component} from 'react';
import './App.css';
import Home from './components/Home';
import Button from './components/Button';

var arr = [];

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      searchTerm: ''                       
    }    

  }   

  handleSearchChange = (event) => { //change variable as it is entered
    this.setState({
        searchTerm: event.target.value
      }
    )
  }  

  displayResults = resLength => { //get area to inject search results dynamically and add html to describe every search result
    const container = document.getElementById('results');
    container.innerHTML = '';

    for (var itmNo = 0; itmNo < resLength; itmNo++) {        
      
      const content = `
      <div class="container">
        <div class="card">
          <div class="front">            
            <h2>${arr[itmNo].name}</h2>
            <h3>${arr[itmNo].owner.login}</h3>
            <p>URL : <a href=${arr[itmNo].html_url}>${arr[itmNo].html_url}</a> </p>
            <p>Description:${'  ' + arr[itmNo].description}</p>
            <p>Forks:${'        ' + arr[itmNo].forks_count}</p>
            <p>Stargazers:${'   ' + arr[itmNo].stargazers_count}</p>
            <p>Open Issues:${'  ' + arr[itmNo].open_issues}</p>
          </div>          
        </div>
      </div>        
      `;

      container.innerHTML += content;            
    }
  }   
  
  searchGit = () => { //retrieve data, convert to json and store items in array for easy access   
    fetch(`https://api.github.com/search/repositories?q=${this.state.searchTerm}`)
      .then(res => res.json())
      .then(data => {
        arr = data.items;        
        this.displayResults(arr.length);               
      }
    ) 
  }  

  render () { //render homescreen, search button and result area to display data to be injected later
    return (      
      <div className="App">        
        <Home name="gitoSearch" />
        <form> 
            <div>
                <input 
                type='text' 
                value={this.state.searchTerm} 
                onChange={this.handleSearchChange.bind(this)}                 
                />                             
            </div>
        </form>         
        <Button id="SearchBtn" btnName="Search Github" btnFunk={this.searchGit.bind(this)} />  
        <div id="results">                                         
        </div>                                                    
      </div>       
    )
  }    
}

export default App
