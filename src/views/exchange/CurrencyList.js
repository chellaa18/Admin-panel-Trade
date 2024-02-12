import React from 'react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom';
// import { useDeleteCurrencyMutation, useGetAllCurrencyDataQuery } from './currencyApi';
// import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const CurencyList = () => {

    const navigate = useNavigate()
    // const { data: currencyDatas, isLoading, isSuccess, isError } = useGetAllCurrencyDataQuery()
    // const [deleteCurrency] = useDeleteCurrencyMutation()

    // const currencyDelete = async (currencyId) => {

    //     try {
    //         Swal.fire({
    //             title: "Are you sure delete pair ?",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonColor: "#d33",
    //             cancelButtonColor: "#3085d6",
    //             confirmButtonText: "delete it!"
    //         }).then(async (result) => {
    //             if (result.isConfirmed) {
    //                 const response = await deleteCurrency({ currencyId })
    //                 if (response.error) {
    //                     return toast.error(response.error.data.message)
    //                 }
    //                 Swal.fire({
    //                     title: "Deleted!",
    //                     text: "Your pair has been deleted.",
    //                     icon: "success"
    //                 });
    //             }
    //         });

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

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
            name: "CURRENCY NAME",
            selector: (row) => row.currencyName,
            sortable: true,
            reorder: true
        },
        {
            id: 2,
            name: "CURRENCY SYMBOL",
            selector: (row) => row.currencySymbol,
            sortable: true,
            reorder: true
        },
        {
            id: 3,
            name: "USDT PRICE",
            selector: (row) => row.usdtPrice,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 4,
            name: "DEPOSIT STATUS",
            cell: (row) => <p>{row.depositStatus === 'active' ? <span className='badge p-1 bg-success'>{row.depositStatus.toUpperCase()}</span> : <span className='badge bg-danger'>{row.depositStatus.toUpperCase()}</span>}</p>,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 5,
            name: "MINIMUM WITHDRAW LIMIT",
            selector: (row) => row.minimumWithdrawLimit,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 6,
            name: "MAX WITHDRAW LIMIT",
            selector: (row) => row.maxWithdrawLimit,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 7,
            name: "withdrawStatus PRICE",
            cell: (row) => <p>{row.withdrawStatus === 'active' ? <span className='badge p-1 bg-success'>{row.withdrawStatus.toUpperCase()}</span> : <span className='badge bg-danger'>{row.withdrawStatus.toUpperCase()}</span>}</p>,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 8,
            name: "COIN STATUS",
            cell: (row) => <p>{row.status === 'active' ? <span className='badge p-1 bg-success'>{row.status.toUpperCase()}</span> : <span className='badge bg-danger'>{row.status.toUpperCase()}</span>}</p>,
            sortable: true,
            right: true,
            reorder: true
        },
        // withdrawFee
        {
            id: 9,
            name: " WITHDRAW FEE",
            selector: (row) => <p>
                <span>{row.feeType === "fixed" ? row.withdrawFee : `${row.withdrawFee}%`}</span>
            </p>,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 4,
            name: 'ACTION',
            cell: (row) => <p className='d-flex'>
                {/* <button className='btn text-primary' onClick={() => navigate(`/currency/${row._id}`)} type="button"><FaEdit /></button>
                <button className='btn text-danger' onClick={() => currencyDelete(row._id)} type="button"><FaRegTrashAlt /></button> */}
            </p>,
            sortable: true,
            right: true,
            reorder: true
        }

    ];

    let allCurrencyLists
    // if (isLoading) {
    //     allCurrencyLists = <p className='text-center'> Currency Data Fetching </p>
    // } else if (isSuccess) {
    //     const CurencyLists = currencyDatas.allCurrencyLists

    //     allCurrencyLists = <>
    //         <DataTable
    //             className='dataTable'
    //             title="Currency Lists"
    //             columns={columns}
    //             data={CurencyLists}
    //             defaultSortFieldId={1}
    //             pagination
    //         />
    //     </>

    // } else {
    //     allCurrencyLists = <p className='text-danger text-center'> Currency Data Fetching Error</p>

    // }


    return (
        <div>
            <p className='float-end'>
                <button type='button' className=' btn btn-primary' onClick={() => navigate('/admin/exchange/currencyAdd')}>Add Currency</button>
            </p>
            {allCurrencyLists}
        </div>
    )
}

export default CurencyList

