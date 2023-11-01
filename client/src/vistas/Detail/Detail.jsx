import React, { Component } from 'react';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dog: null,
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        // fetch dog data and update state
    }

    render() {
        const { dog, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div>
                <h1>{dog.name}</h1>
                <img src={dog.image} alt={dog.name} />
                <p>{dog.description}</p>
            </div>
        );
    }
}

export default Detail;
