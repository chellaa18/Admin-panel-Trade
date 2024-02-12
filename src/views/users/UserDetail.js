// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { faClone, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
// } from "@mui/material";
// import Tooltip from "@mui/material/Tooltip";
// import moment from "moment";
// import { axiosApiCall } from "../../helper/axiosApiCall";
// import { stableSort, getComparator } from "../../utils/MuiTable";
// import { copyToClipboard } from "../../utils/Clipboard";
// import DatesPicker from "../../utils/DatePicker";
// import SearchInput from "../../utils/SearchInput";
// import "./UserDetails.css";
// import SkeletonCard from "../../utils/SkeletonCard";

// const UserDetail = () => {
//   const [loading, setLoading] = useState(false);
//   const [copiedCells, setCopiedCells] = useState(new Set());
//   const [orderBy, setOrderBy] = useState("id");
//   const [order, setOrder] = useState("desc");
//   const [page, setPage] = useState(0);
//   const [searchVal, setSearchVal] = useState("");
//   const [tableData, setTableData] = useState({
//     rows: [],
//     rowsCount: 0,
//     rowPerPage: 10,
//     pageNo: 0,
//   });
//   const [searchData, setSearchData] = useState({
//     rangeStart: null,
//     endDate: null,
//   });

//   const navigate = useNavigate();

//   //DatePicker DateHanlder
//   const changeHandler = (name, date) => {
//     // console.log(name, date);
//     setSearchData({ ...searchData, [name]: date });
//   };

//   //SearchBar handler
//   const handleSearchVal = (e) => {
//     setSearchVal(e.target.value);
//   };

//   //user Data rendering
//   useEffect(() => {
//     setLoading(true);
//     const getsearchData = async () => {
//       const startDateObj =
//         new Date(searchData.rangeStart).getTime() + 24 * 60 * 60 * 1000;
//       const correctformattedstartDateObj = moment
//         .utc(startDateObj)
//         .format("YYYY-MM-DD");
//       // console.log(correctformattedstartDateObj);
//       const endDateObj =
//         new Date(searchData.endDate).getTime() + 24 * 60 * 60 * 1000;
//       const correctformattedEndDateObj = moment
//         .utc(endDateObj)
//         .format("YYYY-MM-DD");

//       try {
//         const param = {
//           pageSize: tableData.rowPerPage,
//           pageNo: tableData.pageNo,
//           search_by: searchVal !== "" ? searchVal : "",
//           order_by: "",
//           order_position: "descending",
//           start_date:
//             searchData.rangeStart === null ? "" : correctformattedstartDateObj,
//           end_date:
//             searchData.endDate === null ? "" : correctformattedEndDateObj,
//           status_type: "all",
//         };

//         const res = await axiosApiCall.Post(
//           "https://knprkadmnbknd.koinpark.com/admin/user_list",
//           param,
//           "post"
//         );
//         // console.log(res);
//         const timer = setTimeout(() => {
//           setTableData({
//             rows: res?.data,
//             rowsCount: res?.total_count,
//             rowPerPage: tableData.rowPerPage,
//             pageNo: tableData.pageNo,
//           });
//           setLoading(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getsearchData();
//   }, [searchData, searchVal, tableData.rowPerPage, order]);

//   // Copied to Clipboard functions
//   const isCellCopied = (rowIndex, columnId) =>
//     copiedCells.has(`${rowIndex}-${columnId}`);

//   const handleCopyText = (rowIndex, columnId) => {
//     const cellValue = tableData.rows[rowIndex][columnId];
//     copyToClipboard(cellValue);
//     setCopiedCells(() => new Set([`${rowIndex}-${columnId}`]));
//   };

//   useEffect(() => {
//     const timeoutID = setTimeout(() => setCopiedCells(new Set()), 1000);
//     return () => {
//       clearTimeout(timeoutID);
//     };
//   }, [copiedCells]);
//   // Copied to Clipboard functions  End

//   const columns = [
//     { id: "id", name: "Id" },
//     { id: "first_name", name: "Name" },
//     { id: "email", name: "Email" },
//     { id: "mobile", name: "Phone" },
//     { id: "created_at", name: "Created_At" },
//     { id: "action", name: "action" },
//   ];

//   const handleSort = (columnId) => {
//     const isAsc = orderBy === columnId && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(columnId);
//   };

//   const fetchNxtPage = async () => {
//     const param = {
//       pageSize: tableData.rowPerPage,
//       pageNo: tableData.pageNo + 1,
//       search_by: "",
//       order_by: order === "asc" ? "" : "descending",
//       order_position: "",
//       start_date: "",
//       end_date: "",
//       status_type: "all",
//     };
//     try {
//       const res = await axiosApiCall.Post(
//         "https://knprkadmnbknd.koinpark.com/admin/user_list",
//         param,
//         "post"
//       );
//       // setrowchange(res?.data);
//       // setPageNo(pageNo + 1);

//       setTableData({
//         ...tableData,
//         rows: res?.data,
//         pageNo: tableData.pageNo + 1,
//       });
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   const fetchPrevPage = async () => {
//     if (tableData.pageNo >= 0) {
//       const param = {
//         pageSize: tableData.rowPerPage,
//         pageNo: tableData.pageNo - 1,
//         search_by: "",
//         order_by: order === "asc" ? "" : "descending",
//         order_position: "",
//         start_date: "",
//         end_date: "",
//         status_type: "all",
//       };

//       try {
//         const res = await axiosApiCall.Post(
//           "https://knprkadmnbknd.koinpark.com/admin/user_list",
//           param,
//           "post"
//         );
//         // setrowchange(res?.data);
//         // setPageNo(pageNo - 1);
//         setTableData({
//           ...tableData,
//           rows: res?.data,
//           pageNo: tableData.pageNo - 1,
//         });
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     }
//   };

//   const handlechangepage = (event, newpage) => {
//     if (newpage > page) {
//       fetchNxtPage();
//     } else if (newpage < page) {
//       fetchPrevPage();
//     }
//     setPage(newpage);
//   };

//   const handleRowsPerPage = (event) => {
//     setTableData({
//       rows: tableData.rows,
//       rowsCount: tableData.rowsCount,
//       rowPerPage: +event.target.value,
//       pageNo: tableData.pageNo,
//     });
//   };

//   const handleUserNavigation = (id) => {
//     navigate(`/admin/userview/${id}`);
//   };

//   return (
//     <div id="UserDetail" className="mb-4" style={{ textAlign: "center" }}>
//       <h1 className="mt-2">User Details</h1>
//       <Paper className="border" sx={{ width: "90%", marginLeft: "5%" }}>
//         <div id="inputs-row" className="d-flex justify-content-evenly p-4">
//           <div className="col-lg-3">
//             <DatesPicker
//               selected={searchData.rangeStart}
//               name="rangeStart"
//               minDate={searchData.rangeStart}
//               onDateChange={changeHandler}
//             />
//           </div>

//           <div className="col-lg-3">
//             <DatesPicker
//               selected={searchData.endDate}
//               name="endDate"
//               minDate={searchData.rangeStart}
//               onDateChange={changeHandler}
//             />
//           </div>

//           <div className="col-lg-3">
//             <SearchInput
//               id="SearchData"
//               value={searchVal}
//               name="searchVal"
//               type="text"
//               onChangesearchVal={handleSearchVal}
//               placeholder="Search"
//             />
//           </div>

//           {/* <button
//             className="btn btn-sm btn-secondary m-1"
//             onClick={() => getsearchData()}
//           >
//             Search
//           </button> */}
//         </div>
//         <TableContainer sx={{ maxHeight: 750 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {columns?.map((column) => (
//                   <TableCell
//                     style={{
//                       backgroundColor: "",
//                       color: "black",
//                       borderTop: "2px solid black",
//                       zIndex: "0",
//                     }}
//                     key={column.id}
//                     onClick={() => handleSort(column.id)}
//                     sortDirection={orderBy === column.id ? order : false}
//                   >
//                     {column?.name}
//                     <Tooltip title="Sort" placement="bottom" arrow>
//                       <span
//                         style={{ top: "50%", transform: "translateY(-50%)" }}
//                       >
//                         {order === "desc" ? (
//                           <ArrowDropDownIcon />
//                         ) : (
//                           <ArrowDropUpIcon />
//                         )}
//                       </span>
//                     </Tooltip>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             {loading && <SkeletonCard />}

//             {!loading && tableData.rows ? (
//               <TableBody>
//                 {stableSort(tableData.rows, getComparator(order, orderBy)).map(
//                   (row, rowIndex) => (
//                     <TableRow key={rowIndex}>
//                       {columns?.map((column) => (
//                         <TableCell key={column.id}>
//                           {column.id === "created_at"
//                             ? moment
//                                 .utc(row[column.id])
//                                 .format("YYYY-MM-DD HH:mm:ss")
//                             : row[column.id]}
//                           {column.id === "email" ? (
//                             <FontAwesomeIcon
//                               className={
//                                 isCellCopied(rowIndex, column.id)
//                                   ? "text-success ms-3 fs-5"
//                                   : "ms-3"
//                               }
//                               onClick={() =>
//                                 handleCopyText(rowIndex, column.id)
//                               }
//                               icon={
//                                 isCellCopied(rowIndex, column.id)
//                                   ? faSquareCheck
//                                   : faClone
//                               }
//                               style={{ cursor: "pointer", color: "green" }}
//                             />
//                           ) : (
//                             ""
//                           )}
//                           {column.id === "action" ? (
//                             <button
//                               onClick={() => handleUserNavigation(row.id)}
//                             >
//                               View
//                             </button>
//                           ) : (
//                             ""
//                           )}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   )
//                 )}
//               </TableBody>
//             ) : (
//               ""
//             )}
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           rowsPerPage={tableData.rowPerPage}
//           page={page}
//           count={tableData.rowsCount}
//           component="div"
//           onPageChange={handlechangepage}
//           onRowsPerPageChange={handleRowsPerPage}
//         ></TablePagination>
//       </Paper>
//     </div>
//   );
// };

// export default UserDetail;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faClone, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import { axiosApiCall } from "../../helper/axiosApiCall";
import { stableSort, getComparator } from "../../utils/MuiTable";
import { copyToClipboard } from "../../utils/Clipboard";
import DatesPicker from "../../utils/DatePicker";
import SearchInput from "../../utils/SearchInput";
import "./UserDetails.css";
import SkeletonCard from "../../utils/SkeletonCard";

const UserDetail = () => {
  const [loading, setLoading] = useState(false);
  const [copiedCells, setCopiedCells] = useState(new Set());
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [tableData, setTableData] = useState({
    rows: [],
    rowsCount: 0,
    rowPerPage: 10,
    pageNo: 0,
  });
  const [searchData, setSearchData] = useState({
    rangeStart: null,
    endDate: null,
  });
  const [apiParams, setApiParams] = useState({});

  const navigate = useNavigate();

  //DatePicker DateHanlder
  const changeHandler = (name, date) => {
    setSearchData({ ...searchData, [name]: date });
  };

  //fetch data
  useEffect(() => {
    setLoading(true);
    const startDateObj =
      new Date(searchData.rangeStart).getTime() + 24 * 60 * 60 * 1000;
    const correctformattedstartDateObj = moment
      .utc(startDateObj)
      .format("YYYY-MM-DD");
    const endDateObj =
      new Date(searchData.endDate).getTime() + 24 * 60 * 60 * 1000;
    const correctformattedEndDateObj = moment
      .utc(endDateObj)
      .format("YYYY-MM-DD");
    const params = {
      pageSize: tableData.rowPerPage,
      pageNo: tableData.pageNo,
      search_by: searchVal !== "" ? searchVal : "",
      order_by: orderBy,
      order_position: order,
      start_date:
        searchData.rangeStart === null ? "" : correctformattedstartDateObj,
      end_date:
        searchData.endDate === null ? "" : correctformattedEndDateObj,
      status_type: "all",
    };

    setApiParams(params); 

    const fetchData = async () => {
      try {
        const res = await axiosApiCall.Post(
          "https://knprkadmnbknd.koinpark.com/admin/user_list",
          params,
          "post"
        );
        const timer = setTimeout(() => {
          setTableData({
            rows: res?.data,
            rowsCount: res?.total_count,
            rowPerPage: tableData.rowPerPage,
            pageNo: tableData.pageNo,
          });
          setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.log(error);
      }
    };

      fetchData();
  }, [searchData, searchVal, tableData.rowPerPage, orderBy, order]);

  // Copied to Clipboard functions
  const isCellCopied = (rowIndex, columnId) =>
    copiedCells.has(`${rowIndex}-${columnId}`);

  const handleCopyText = (rowIndex, columnId) => {
    const cellValue = tableData.rows[rowIndex][columnId];
    copyToClipboard(cellValue);
    setCopiedCells(() => new Set([`${rowIndex}-${columnId}`]));
  };

  useEffect(() => {
    const timeoutID = setTimeout(() => setCopiedCells(new Set()), 1000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [copiedCells]);
  // Copied to Clipboard functions  End

  const columns = [
    { id: "id", name: "Id" },
    { id: "first_name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "mobile", name: "Phone" },
    { id: "created_at", name: "Created_At" },
    { id: "action", name: "action" },
  ];

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
  };

  // Fetch next page
  const fetchNxtPage = async () => {
    const params = {
      ...apiParams,
      pageNo: tableData.pageNo + 1,
    };
    try {
      const res = await axiosApiCall.Post(
        "https://knprkadmnbknd.koinpark.com/admin/user_list",
        params,
        "post"
      );
      setTableData({
        ...tableData,
        rows: res?.data,
        pageNo: tableData.pageNo + 1,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetch previous page
  const fetchPrevPage = async () => {
    if (tableData.pageNo >= 0) {
      const params = {
        ...apiParams,
        pageNo: tableData.pageNo - 1,
      };
      try {
        const res = await axiosApiCall.Post(
          "https://knprkadmnbknd.koinpark.com/admin/user_list",
          params,
          "post"
        );
        setTableData({
          ...tableData,
          rows: res?.data,
          pageNo: tableData.pageNo - 1,
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  const handlechangepage = (event, newpage) => {
    if (newpage > page) {
      fetchNxtPage();
    } else if (newpage < page) {
      fetchPrevPage();
    }
    setPage(newpage);
  };

  const handleRowsPerPage = (event) => {
    setTableData({
      rows: tableData.rows,
      rowsCount: tableData.rowsCount,
      rowPerPage: +event.target.value,
      pageNo: tableData.pageNo,
    });
  };

  const handleUserNavigation = (id) => {
    navigate(`/admin/userview/${id}`);
  };

  return (
    <div id="UserDetail" className="mb-4" style={{ textAlign: "center" }}>
      <h1 className="mt-2">User Details</h1>
      <Paper className="border" sx={{ width: "90%", marginLeft: "5%" }}>
        <div id="inputs-row" className="d-flex justify-content-evenly p-4">
          <div className="col-lg-3">
            <DatesPicker
              selected={searchData.rangeStart}
              name="startDate"
              minDate={searchData.rangeStart}
              onDateChange={changeHandler}
            />
          </div>
          <div className="col-lg-3">
            <DatesPicker
              selected={searchData.endDate}
              name="endDate"
              minDate={searchData.rangeStart}
              onDateChange={changeHandler}
            />
          </div>
          <div className="col-lg-3">
            <SearchInput
              id="SearchData"
              value={searchVal}
              name="searchVal"
              type="text"
              onChangesearchVal={(e)=>setSearchVal(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>
        <TableContainer sx={{ maxHeight: tableData.rowPerPage === 25 ? "auto" : 750 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    style={{
                      backgroundColor: "",
                      color: "black",
                      borderTop: "2px solid black",
                      zIndex: "0",
                    }}
                    key={column.id}
                    onClick={() => handleSort(column.id)}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    {column?.name}
                    <Tooltip title="Sort" placement="bottom" arrow>
                      <span
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                      >
                        {order === "desc" ? (
                          <ArrowDropDownIcon />
                        ) : (
                          <ArrowDropUpIcon />
                        )}
                      </span>
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {loading && <SkeletonCard />}
            {!loading && tableData.rows ? (
              <TableBody>
                {stableSort(tableData.rows, getComparator(order, orderBy)).map(
                  (row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns?.map((column) => (
                        <TableCell key={column.id}>
                          {column.id === "created_at"
                            ? moment
                                .utc(row[column.id])
                                .format("YYYY-MM-DD HH:mm:ss")
                            : row[column.id]}
                          {column.id === "email" ? (
                            <FontAwesomeIcon
                              className={
                                isCellCopied(rowIndex, column.id)
                                  ? "text-success ms-3 fs-5"
                                  : "ms-3"
                              }
                              onClick={() =>
                                handleCopyText(rowIndex, column.id)
                              }
                              icon={
                                isCellCopied(rowIndex, column.id)
                                  ? faSquareCheck
                                  : faClone
                              }
                              style={{ cursor: "pointer", color: "green" }}
                            />
                          ) : (
                            ""
                          )}
                          {column.id === "action" ? (
                            <button
                              onClick={() => handleUserNavigation(row.id)}
                            >
                              View
                            </button>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                )}
              </TableBody>
            ) : (
              ""
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={tableData.rowPerPage}
          page={page}
          count={tableData.rowsCount}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination>
      </Paper>
    </div>
  );
};

export default UserDetail;
