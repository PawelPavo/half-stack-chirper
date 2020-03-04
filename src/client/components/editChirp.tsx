import React from 'react'
import { FaUser, FaFeather, FaPaperPlane, FaTrashAlt } from 'react-icons/fa'
import Animate from 'react-smooth'
import { RouteComponentProps } from 'react-router';


export interface IEditProps extends RouteComponentProps<{ id: string }> {

}
export interface IEditState {
    chirp: {
        user: string,
        text: string,
    }[],
    user: string,
    text: string
};

class editChirp extends React.Component<IEditProps, IEditState> {

    constructor(props: IEditProps) {
        super(props)
        this.state = {
            chirp: [],
            user: '',
            text: '',
        };
    }

    async componentDidMount() {
        let id = this.props.match.params.id;

        try {
            let res = await fetch(`/api/chirps/${id}`);
            let chirp = await res.json();
            this.setState({ user: chirp.user, text: chirp.text });

        } catch (error) {
            console.log(error);
        };
    };

    async updateChirp(e: React.MouseEvent<HTMLButtonElement>) {
        let id = this.props.match.params.id;
        e.preventDefault();
        try {
            await fetch(`/api/chirps/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: this.state.user, text: this.state.text })
            })

        } catch (error) {
            console.log(error);
        }
        this.props.history.push('/');
    }

    async deleteChirp(e: React.MouseEvent<HTMLButtonElement>) {
        let id = this.props.match.params.id;
        e.preventDefault();
        try {
            await fetch(`/api/chirps/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })

        } catch (error) {
            console.log(error);
        }
        this.props.history.replace('/');
    }

    render() {
        return (
            <>
                <Animate to="5" from="0" attributeName="opacity">
                    <main className="container">
                        <div className="jumbotron text-center shadow-lg mt-3 sticky-top bg-special">
                            <h3 className="card-header text-monospace text-success bg-success text-white-50">EDIT YOUR CHIRP</h3>
                            <hr className="my-4" />
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-success text-white"><FaUser /></span>
                                </div>
                                <input id="nameInput" type="text" className="form-control" placeholder="Enter a Chirp Handle"
                                    value={this.state.user}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ user: e.target.value })}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-success text-white"><FaFeather /></span>
                                </div>
                                <input id="chirpInput" type="text" className="form-control" placeholder="Enter Your Chirp"
                                    value={this.state.text}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: e.target.value })}
                                />
                            </div>
                            <hr className="my-4" />
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-warning btn-lg" onClick={(e) => this.deleteChirp(e)}><FaTrashAlt /> Delete Chirp</button>
                                <button className="btn btn-outline-success btn-lg" onClick={(id) => this.updateChirp(id)}><FaPaperPlane /> Re - Post Chirp</button>
                            </div>
                        </div>

                    </main>
                </Animate>
            </>
        );
    }
}

export default editChirp;