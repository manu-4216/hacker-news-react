import React, { Component } from "react";
import "./App.css";

const list = [
    {
        title: "React",
        url: "https://facebook.github.io/react/",
        author: "Jordan Walke",
        num_comments: 3,
        points: 4,
        objectID: 0
    },
    {
        title: "Redux",
        url: "https://github.com/reactjs/redux",
        author: "Dan Abramov, Andrew Clark",
        num_comments: 2,
        points: 5,
        objectID: 1
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,
            searchTerm: ""
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    render() {
        const { searchTerm, list } = this.state;
        return (
            <div className="App">
                <Search value={searchTerm} onChange={this.onSearchChange}>
                    Search
                </Search>

                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
    }

    onDismiss(id) {
        const isNotId = item => item.objectID !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({ list: updatedList });
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }
}

export default App;

function Search(props) {
    const { value, onChange, children } = props;

    return (
        <form>
            {children}
            <input type="text" value={value} onChange={onChange} />
        </form>
    );
}

function Button(props) {
    const { onClick, className = "", children } = props;

    return (
        <button className={className} onClick={onClick} type="button">
            {children}
        </button>
    );
}

function Table(props) {
    const { list, pattern, onDismiss } = props;

    return (
        <div>
            {list
                .filter(item =>
                    item.title.toLowerCase().includes(pattern.toLowerCase())
                )
                .map(item =>
                    <div key={item.objectID}>
                        <span>
                            <a href={item.url}>
                                {item.title}
                            </a>
                        </span>
                        <span>
                            {item.author}
                        </span>
                        <span>
                            {item.num_comments}
                        </span>
                        <span>
                            {item.points}
                        </span>
                        <span>
                            <Button onClick={() => onDismiss(item.objectID)}>
                                Dismiss
                            </Button>
                        </span>
                    </div>
                )}
        </div>
    );
}
