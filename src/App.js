import React, { Component } from "react";

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: []
    }
  }

  //ideally here we would store the api urls somewhere like a param file rather than just expose them
  async callAPIs(sites) {
    try {
      let data = await Promise.all(
        sites.map((site) => {
          return fetch(`http://localhost:9000/v1/${site}-status`).then(
            (response) => response.json()
          )
        })
      )
      return data
    } catch (err) {
      console.log(err)
      throw (err)
    }
  }

  handleUpdate(az, g, a) {
    this.setState({
      sites: [
        az, g, a
      ]
    })
    this.render()
  }

  async componentDidMount() {
    try {
      await this.fetchProcess();

      setInterval(async () => {
        await this.fetchProcess();
      }, 60000)
    } catch (err) {
      console.log(err)
    }
  }

  async fetchProcess() {
    let data = await this.callAPIs(['amazon', 'google', 'all'])
    this.handleUpdate(data[0], data[1], data[2])
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Status Checker
          </h1>
          <div className="container">
            {
              this.state.sites.map(function (site) {
                if (site.length > 1) {
                } else {
                  return (
                    <div className="card">
                      <div className="status">
                        <h4>
                          {site.url}
                        </h4>
                        <p>
                          status: {site.status}
                        </p>
                        <p>
                          duration: {site.duration}
                        </p>

                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
        </header>
      </div>
    )

  }
}



export default App;
