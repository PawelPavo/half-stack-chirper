import React from 'react'
import { Link } from 'react-router-dom'
import { FaAt, FaUserCog } from 'react-icons/fa'
import Animate from 'react-smooth'
import { bounce } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

export interface IChirpCardProps {
    chirp: {
        id: string,
        user: string,
        text: string,
    }
};

const ChirpCard: React.SFC<IChirpCardProps> = (props) => {
    let id = props.chirp.id;
    return (
        <>
            <section className="container">
                <Animate to="5" from="0" attributeName="opacity">
                    <div className="col">
                        <StyleRoot>
                            <div className="test" style={styles.bounce}>
                                <div className="card my-4 shadow border-success mb-3">
                                    <h5 className="card-header text-center bg-success shadow text-white-50">< FaAt /> {props.chirp.user}</h5>
                                    <div className="card-body text-center">
                                        <h4 className="card-text">{props.chirp.text}</h4>
                                    </div>
                                    <div className="card-footer text-right m-2 bg-special" >
                                        <Link to={`${id}`}><button className="btn btn-outline-success mr-3 shadow align-top" type="button"><FaUserCog/> View Options</button></Link>
                                    </div>
                                </div>
                            </div>
                        </StyleRoot>
                    </div>
                </Animate>
            </section>
        </>
    );
}

const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounce, 'bounce')
    }
}

export default ChirpCard;