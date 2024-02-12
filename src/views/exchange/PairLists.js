import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { useDeletePairListMutation, useGetAllCurrencyPairDataQuery } from './pairApi';
import DataTable from 'react-data-table-component';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const PairLists = () => {

    // const { data: currencyPairDatas, isLoading, isSuccess, isError } = useGetAllCurrencyPairDataQuery()
    // const [deletePairListData] = useDeletePairListMutation()
    const navigate = useNavigate()

    const columns = [
        {
            id: 0,
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
            reorder: true
        },
        {
            id: 1,
            name: "RECEIVE CURRENCY",
            selector: (row) => row.receiveCurrencySymbol,
            sortable: true,
            reorder: true
        },
        {
            id: 2,
            name: "SPEND CURRENCY",
            selector: (row) => row.spendCurrencySymbol,
            sortable: true,
            reorder: true
        },
        {
            id: 3,
            name: "CURRENCY PAIR",
            selector: (row) => `${row.currencyPair}`,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 4,
            name: "MAKER FEE",
            selector: (row) => `${row.makerFee}%`,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 5,
            name: "TAKER FEE",
            selector: (row) => `${row.takerFee}%`,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 6,
            name: "STATUS",
            cell: (row) => <p>{row.status === 'active' ? <span className='badge p-1 bg-success'>{row.status.toUpperCase()}</span> : <span className='badge bg-danger'>{row.status.toUpperCase()}</span>}</p>,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 7,
            name: 'ACTION',
            cell: (row) => <p className='d-flex'>
                {/* <button className='btn text-primary' onClick={() => navigate(`/pair/pairLists/${row._id}`)} type="button"><FaEdit /></button>
                <button className='btn text-danger' onClick={() => handlePairDelete(row._id)} type="button"><FaRegTrashAlt /></button> */}
            </p>,
            sortable: true,
            right: true,
            reorder: true
        }
    ];
    // const handlePairDelete = async (pairId) => {
    //     try {
    //         Swal.fire({
    //             title: "Are you sure delete currency?",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonColor: "#d33",
    //             cancelButtonColor: "#3085d6",
    //             confirmButtonText: "delete it!"
    //         }).then(async (result) => {
    //             if (result.isConfirmed) {
    //                 const response = await deletePairListData({ pairId })
    //                 if (response.error) {
    //                     return toast.error(response.error.data.message, {
    //                         position: toast.POSITION.TOP_CENTER
    //                     })
    //                 }
    //                 Swal.fire({
    //                     title: "Deleted!",
    //                     text: "Your Currency has been deleted.",
    //                     icon: "success"
    //                 });
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    let currencyPairingAllDatas
    // if (isLoading) {
    //     currencyPairingAllDatas = <p className='text-center'> Currency Data Fetching </p>
    // } else if (isSuccess) {
    //     const allPairListsData = currencyPairDatas.allPairLists
    //     currencyPairingAllDatas = <>
    //         <DataTable
    //             className='dataTable'
    //             title="PAIR LISTS"
    //             columns={columns}
    //             data={allPairListsData}
    //             defaultSortFieldId={1}
    //             pagination
    //         />
    //     </>

    // } else {
    //     currencyPairingAllDatas = <p className='text-danger text-center'> Currency Data Fetching Error</p>
    // }

    return (

        <div>
            <h1>Currency Pairs</h1>
            <p className='float-end'>
                <button type='button' className=' btn btn-primary' onClick={() => navigate('/admin/exchange/addpair')}>Add Pairs</button>
            </p>
            {currencyPairingAllDatas}
        </div>
    )
}

export default PairLists