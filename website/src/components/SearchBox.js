/**
 * Papers search Box
 *
 * @author Harry Laws w19024957
 */
import React from "react";

class SearchBox extends React.Component {

    render() {
        return (
            <label>
                Search
                <input type='text' placeholder='Team Name' value={this.props.search} onChange={this.props.handleSearch} />
            </label>
        )
    }
}

export default SearchBox;