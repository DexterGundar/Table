import React, { useState, useMemo, useEffect } from "react";
import "../index.css";
import "../App.css";
import "../pagination.css";
import Pagination from "./Pagination";
import Caret from "./Icon/Caret";
import { headers, data } from "./tableData.js";
import Loading from "./Loading";

let count = data.length;

export default function Tabula() {
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(data);
  const [filteredData, setFilteredData] = useState();
  const [searchVal, setSearchVal] = useState();
  const [pageSize, setPageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({
    keyToSort: "name",
    direction: "asc",
  });
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhoneNr, setNewPhoneNr] = useState("");

  const onChangeInput = (e, employeeId) => {
    setSort({});
    const { name, value } = e.target;
    const editData = employeeData.map((item) =>
      item.employeeId === employeeId && name ? { ...item, [name]: value } : item
    );
    setEmployeeData(editData);
  };

  function handleHeaderClick(header) {
    setSort({
      keyToSort: header.KEY,
      direction:
        header.KEY === sort.keyToSort
          ? sort.direction === "asc"
            ? "desc"
            : "asc"
          : "desc",
    });
  }
  function handleNewRow(event) {
    event.preventDefault();
    count += 1;

    const newRowToAdd = {
      employeeId: count,
      name: newName,
      lastName: newLastName,
      phoneNumber: newPhoneNr,
    };
    setEmployeeData((currentData) => {
      return [newRowToAdd, ...currentData];
    });
    setNewName("");
    setNewLastName("");
    setNewPhoneNr("");
  }

  function addNewRow() {
    count += 1;

    const newRow = {
      employeeId: count,
      name: "",
      lastName: "",
      phoneNumber: "",
    };

    setEmployeeData((currentData) => {
      return [newRow, ...currentData];
    });
    setSort({ direction: "desc" });
    setCurrentPage(1);
  }

  function deleteRow(employeeId) {
    const newList = employeeData.filter(
      (list) => list.employeeId !== employeeId
    );
    setEmployeeData(newList);
  }
  function getSortedArray(arrayToSort) {
    if (sort.direction === "asc") {
      return arrayToSort.sort((a, b) =>
        a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1
      );
    }
    return arrayToSort.sort((a, b) =>
      a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1
    );
  }

  const newEmployeeData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = Number(firstPageIndex) + Number(pageSize);

    if (filteredData) {
      return getSortedArray(filteredData).slice(firstPageIndex, lastPageIndex);
    } else
      return getSortedArray(employeeData).slice(firstPageIndex, lastPageIndex);
  }, [currentPage, employeeData, pageSize, sort, filteredData, searchVal]);

  useEffect(() => {
    if (searchVal) {
      const filterData = employeeData.filter((item) =>
        Object.values(item)
          .toString()
          .toLowerCase()
          .includes(searchVal.toString().toLowerCase())
      );
      setFilteredData(filterData);
    } else setFilteredData();
    setLoading(false);
  }, [searchVal, employeeData]);

  const onSearchInput = (e) => {
    e.preventDefault();
    const filterData = employeeData.filter((item) =>
      Object.values(item)
        .toString()
        .toLowerCase()
        .includes(e.target.value.toString().toLowerCase())
    );
    setFilteredData(filterData);
  };

  if (loading) return <Loading />;
  return (
    <>
      <div className="centra">
        <h2>Tabula</h2>
        <div id="form-div">
          <form onSubmit={handleNewRow}>
            {/* <label htmlFor="Vārds">Vārds:</label> */}
            <input
              required
              id="form-div-input"
              type="text"
              name="name"
              onChange={(event) => setNewName(event.target.value)}
              // onChange={(event) => setNewName({...new, name:event.target.value})}
              value={newName}
              placeholder="Name"
            />
            {/* <label htmlFor="Uzvārds">Uzvārds:</label> */}
            <input
              required
              id="form-div-input"
              type="text"
              name="lastName"
              onChange={(event) => setNewLastName(event.target.value)}
              value={newLastName}
              placeholder="Lastname"
            />
            {/* <label htmlFor="Tel nr"> ☎️ </label> */}
            <input
              required
              id="form-div-input"
              type="tel"
              name="phoneNumber"
              onChange={(event) => setNewPhoneNr(event.target.value)}
              value={newPhoneNr}
              placeholder="☎"
            />
            <button type="submit">✅</button>
          </form>
        </div>
        <div>
          {/* <form>
            <label htmlFor="Cik">Lapā rādīt:</label>
            <input
              id="form-div-input-small"
              type="number"
              name="cik"
              onChange={(event) => {
                setPageSize(event.target.value);
                setCurrentPage(1);
              }}
              value={pageSize}
            />
          </form> */}
          <form>
            <label htmlFor="meklēt">Meklēt tabulā:</label>
            <input
              // name="search"
              type="text"
              id="search"
              // style={{ position: "sticky", top: "0", left: "0" }}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search"
            />
          </form>
          <div className="pagination-set">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={
                filteredData ? filteredData.length : employeeData.length
              }
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
            <div className="pagination-show">
              <form>
                <label htmlFor="Cik">Lapā rādīt:</label>
                <select
                  id="form-div-input-small"
                  name="cik"
                  onChange={(event) => {
                    setPageSize(event.target.value);
                    setCurrentPage(1);
                  }}
                  value={pageSize}
                >
                  <option value="2">2</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </form>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.KEY} onClick={() => handleHeaderClick(header)}>
                  <div className="header-container">
                    <span>{header.LABEL}</span>

                    {header.KEY === sort.keyToSort && (
                      <Caret
                        direction={
                          sort.keyToSort === header.KEY ? sort.direction : "asc"
                        }
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {newEmployeeData.map(
              ({ employeeId, name, lastName, phoneNumber }) => (
                <tr key={employeeId}>
                  <td>
                    <input
                      name="name"
                      value={name}
                      type="text"
                      disabled={searchVal}
                      onChange={(e) => onChangeInput(e, employeeId)}
                      placeholder="Vārds"
                    />
                  </td>
                  <td>
                    <input
                      name="lastName"
                      value={lastName}
                      type="text"
                      disabled={searchVal}
                      onChange={(e) => onChangeInput(e, employeeId)}
                      placeholder="Uzvārds"
                    />
                  </td>
                  <td>
                    <input
                      name="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      // disabled={searchVal}
                      onChange={(e) => onChangeInput(e, employeeId)}
                      placeholder="Telefona numurs"
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => deleteRow(employeeId)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <button type="button" disabled={searchVal} onClick={() => addNewRow()}>
        Pievienot rindu
      </button>
    </>
  );
}
