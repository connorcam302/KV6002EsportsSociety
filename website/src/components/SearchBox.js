/**
 * Teams search Box
 *
 * @author Harry Laws w19024957
 * 
 * 
 */
import React from "react";

class SearchBox extends React.Component {
/**
 * 
 * Search teams by team name on the teams page.
 * 
 */
    render() {
        return (
            <label>
                <label>Search</label>
                <div>
                <input type='text' placeholder='Team Name' value={this.props.search} onChange={this.props.handleSearch} />
                </div>
            </label>
        )
    }
}

export default SearchBox;