import React from "react";
import { Input } from "semantic-ui-react";

export default class GlobalSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      columnSearch: "",
      searchInput: ""
    };
  }

  handleChange = event => {
    const val = event.target.value;
    this.setState({ searchInput: val }, () => this.globalSearch());
    this.props.handleSetSearchInput(val);
  };

  globalSearch = () => {
    const { searchInput, columnSearch } = this.state;
    let filteredData = this.props.data.filter(value => {
      if (columnSearch) {
        return value[columnSearch]
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      }
      return (
        value.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.id.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.importance
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        value.sentiment_group
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });

    this.props.handleSetFilteredData(filteredData);
  };

  setColumnSearch = e => {
    this.setState({ columnSearch: e.target.value }, () => this.globalSearch());
  };

  render() {
    const { columns } = this.props;
    const { columnSearch } = this.state;

    return (
      <div className="wholeSearchFunctionality">
        <div className="searchInput">
          <input
            className = "searchInputField"
            name="searchInput"
            value={this.state.searchInput || ""}
            onChange={this.handleChange}
            placeholder="Search"
          />
        </div>
        <div><label className="labelFrom">from</label></div>
        <div className="selectColumn">
          <select
          className="selectDropdown"
            onChange={e => {
              e.persist();
              this.setColumnSearch(e);
            }}
            value={columnSearch}
          >
            <option value=""> All columns</option>
            {columns.map(col => {
              return <option value={col.accessor}>{col.Header}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
}
