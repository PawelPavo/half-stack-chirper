import React from 'react'
import ChirpCard from './chirpCard'
import { FaUser, FaFeather, FaPaperPlane, FaUndo } from 'react-icons/fa'
import Animate from 'react-smooth'


interface IHomeProps { }

interface IHomeState {
    chirps: {
        id: string,
        user: string,
        text: string,
    }[],
    user: string,
    text: string,
    hasLoaded: boolean;
}

class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            chirps: [],
            user: "",
            text: "",
            hasLoaded: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    async allChirps() {
        try {
            let res = await fetch("/api/chirps");
            let data = await res.json();
            let chirps = Object.keys(data).map(key => {
                return {
                    id: key,
                    user: data[key].user,
                    text: data[key].text
                };
            });
            chirps.pop();
            chirps.reverse();
            this.setState({ chirps });

        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        this.allChirps()
    }

    async handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            await fetch('/api/chirps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: this.state.user, text: this.state.text })
            });
            let res = await fetch('/api/chirps');
            let data = await res.json();
            let chirps = Object.keys(data).map(key => {
                return {
                    id: key,
                    user: data[key].user,
                    text: data[key].text
                }
            });
            chirps.pop();
            chirps.reverse();
            this.setState({ chirps });
        } catch (error) {
            console.log(error);
        };
        this.setState({ user: '', text: '' });
        this.setState({hasLoaded: false})
    }

    ChirpDisplayOn = () => {
        this.setState({ hasLoaded: true })
    }

    ChirpDisplayOff = () => {
        this.setState({ hasLoaded: false })
    }

    render() {
        let chirpList = this.state.chirps.map((chirp) => {
            return <ChirpCard key={chirp.id} chirp={chirp} />
        })
        if (this.state.hasLoaded) {
            return (
                <>
                    <Animate to="5" from="0" attributeName="opacity">
                        <main className="container">
                            <div className="jumbotron text-center shadow-lg mt-3 fixed-top bg-special">
                                <h1 className="text-monospace text-success">Enter Your Chirp Below</h1>
                                <hr className="my-4" />
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-success text-white"><FaUser /></span>
                                    </div>
                                    <input id="nameInput" type="text" className="form-control" placeholder="Enter Your User Name"
                                        value={this.state.user}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ user: e.target.value })}
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-success text-white"><FaFeather /></span>
                                    </div>
                                    <input id="chirpInput" type="text" className="form-control" placeholder="Enter Your Chirp Text"
                                        value={this.state.text}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: e.target.value })}
                                    />
                                </div>
                                <div >
                                    <hr className="my-4" />
                                    <div className="d-flex justify-content-around">
                                    <button className="btn btn-warning btn-lg mr-3 shadow" type="button" onClick={this.ChirpDisplayOff}><FaUndo/> Go Back </button>
                                    <button className="btn btn-outline-success btn-lg" onClick={(e) => this.handleClick(e)}><FaPaperPlane /> Post Chirp</button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </Animate>
                </>
            )
        } else {
            return (
                <>
                    <div className="alert alert-secondary sticky-top d-flex justify-content-around my-3">
                    <h3 className="text-monospace text-success">WELCOME TO CHIRP</h3>
                        <button className="btn btn-outline-success btn-lg mr-3 shadow" type="button" onClick={this.ChirpDisplayOn}>Add New Chirp </button>
                    </div>
                    
                    <div className="container d-flex justify-content-center" >
                        <div className="col-md-8" >{chirpList}</div>
                    </div>
                </>
            )
        }
    }
}


export default Home