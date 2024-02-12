import React, { useState } from 'react'
// import { useGetAllCurrencyDataQuery } from '../currencyApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { useGetActiveCurrencyPairListQuery, useLivePriceGetInCoinGeckoMutation, useNewPairAddMutation } from './pairApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const pairAddSchema = Yup.object().shape({
    receiveCurrencySymbol: Yup.string().required('receive currency is required').trim()
    ,
    spendCurrencySymbol: Yup.string().required('spend currency is required').trim()
    ,
    marketPriceGetMethod: Yup.string().required('market price get method is required').trim(),
    makerFee: Yup.string().required('maker fee is required').matches(/^[0-9.]+$/, 'positive number only allowed').trim()
    ,
    takerFee: Yup.string().required('taker fee is required').matches(/^[0-9.]+$/, 'positive number only allowed').trim()
    ,
    // minimumQuantity: Yup.string().required('minimum quantity is required').matches(/^[0-9.]+$/, 'positive number only allowed').trim(),
    // mini
    minimumTradeQuantity: Yup.string().required('minimum trade quantity is required').matches(/^[0-9.]+$/, 'positive number only allowed').trim(),
    decimal: Yup.string().required('decimal is required').matches(/^[0-9]+$/, 'positive number only allowed').trim(),
    minimumTradeAmount: Yup.string().required('minimum trade amount is required').matches(/^[0-9.]+$/, 'positive number only allowed').trim(),

    // minimum trade amount vanthu spend Currecny base solrathu minimum ivalo coin vanganum nu 
    status: Yup.string().required('status is required'),
    pairIcon: Yup
    .mixed()
    .test("fileRequired", "currency icon is Required", (value) => {
        return value && value.length > 0;
    })
    .test("fileSize", "File size is too large", (value) => {
        return value && value[0] && value[0].size <= 1024000;
        // bytes calutate size  1024000bytes=1mb
    })
    .test("fileFormat", "Invalid file format", (value) => {
        return (
            value &&
            value.length > 0 &&
            ["image/jpeg", "image/jpg", "image/png"].includes(value[0].type)
        );
    }),
})

const AddPair = () => {

    const navigate = useNavigate()
    const [receiveCurrencySymbol, setReceiveCurrencySymbol] = useState('')
    const [receiveCurrencyName, setReceiveCurrencyName] = useState('')
    const [spendCurrencySymbol, setSpendCurrencySymbol] = useState('')
    const [pairMarketPrice, setPairMarketPrice] = useState(0)

    const [currentPairIcon, setCurrentPairIcon] = useState(null)

    const [spendCurrencyAllData, setSpendCurrencyAllData] = useState([])

    // RTK Query
    // const { data: currencyDatas, isLoading, isSuccess, isError } = useGetActiveCurrencyPairListQuery()
    // console.log(currencyDatas);
    // const [currencyPairAdding] = useNewPairAddMutation()
    // const [livePairPriceGet] = useLivePriceGetInCoinGeckoMutation()

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(pairAddSchema),
        mode: 'all'

    });

    let spendCurrencyData

    let currencyDataLists;

    let currencyLists


    // if (isLoading) {
    //     currencyLists = <p className='text-center'>Currency Data Fetching</p>
    // } else if (isSuccess) {

    //     currencyDataLists = currencyDatas.allPairLists
    //     currencyLists = <>
    //         {
    //             currencyDataLists?.map((currency, index) => (
    //                 <option key={currency._id} value={currency.currencyName}>{currency.currencySymbol}</option>
    //             ))
    //         }
    //     </>

    // } else {
    //     currencyLists = <p className='text-danger text-center'> Currency Data Fetching Error</p>

    // }

    function convertExponentialtoDecimalNumber(n) {
        var sign = +n < 0 ? "-" : "",
            toStr = n.toString();
        if (!/e/i.test(toStr)) {
            return n;
        }
        var [lead, decimal, pow] = n.toString()
            .replace(/^-/, "")
            .replace(/^([0-9]+)(e.*)/, "$1.$2")
            .split(/e|\./);
        return +pow < 0 ?
            sign + "0." + "0".repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) + lead + decimal :
            sign + lead + (+pow >= decimal.length ? (decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))) : (decimal.slice(0, +pow) + "." + decimal.slice(+pow)))
    }


    const handleReceiveCurrencyChange = (currencyName) => {
        setReceiveCurrencyName(currencyName)
        spendCurrencyData = currencyDataLists.filter((item) => item.currencyName !== currencyName)
        const receiveCurrencySymbol = currencyDataLists.find((item) => item.currencyName === currencyName)
        setReceiveCurrencySymbol(receiveCurrencySymbol.currencySymbol)
        setSpendCurrencyAllData(spendCurrencyData)
    }


    const handleSpendCurrencyChange = async (currencySymbol) => {
        setSpendCurrencySymbol(currencySymbol)
        try {
            // const pairPriceResponse = await livePairPriceGet({ spendCurrency: currencySymbol, receiveCurrencyName: receiveCurrencyName.toLocaleLowerCase() })
            // if (pairPriceResponse.error) {
            //     return toast.error(pairPriceResponse.error.data.message)
            // }
            // const currencyResposne = pairPriceResponse.data.getCurrencyPrice[0]
            // const marketPrice = convertExponentialtoDecimalNumber(currencyResposne.current_price)
            // setCurrentPairIcon(pairPriceResponse.data.getCurrencyPrice[0].image)
            // setPairMarketPrice(marketPrice)
        } catch (error) {
            console.log(error.message)
        }
    }

    const pairAdding = async (pairsDatas) => {
        console.log(pairsDatas);
        const pairAddingDatas = {
            currencyName: receiveCurrencyName,
            receiveCurrencySymbol,
            spendCurrencySymbol,
            makerFee: pairsDatas.makerFee,
            pairMarketPrice,
            takerFee: pairsDatas.takerFee,
            marketPriceGetMethod: pairsDatas.marketPriceGetMethod,
            minimumTradeQuantity: pairsDatas.minimumTradeQuantity,
            decimal: pairsDatas.decimal,
            status: pairsDatas.status,
            pairIcon: pairsDatas.pairIcon,
            minimumTradeAmount: pairsDatas.minimumTradeAmount
        }
        try {
            // const response = await currencyPairAdding(pairAddingDatas)
            // if (response.error) {
            //     return toast.error(response.error.data.message, {
            //         position: toast.POSITION.TOP_CENTER
            //     })
            // }
            // toast.success(response.data.message, {
            //     position: toast.POSITION.TOP_CENTER
            // })
            // navigate('/pair/pairLists')
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(pairAdding)} className='col-md-8 mx-auto'>
                <div>
                    <div className='d-flex justify-content-between my-3'>
                        <h3 className='fw-bold'>ADDING PAIRS</h3>
                        <p>
                            <button type="button" className='btn btn-primary' onClick={() => navigate('/pair/pairLists')}>BACK</button>
                        </p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="receiveCurrencySymbol"
                            className="form-label fw-bold"
                        >Receive Currency </label>
                        <select
                            name="receiveCurrency"
                            className={`form-select  ${errors?.receiveCurrencySymbol ? 'is-invalid' : ''}`}
                            {...register('receiveCurrencySymbol', {
                                onChange: (e) => handleReceiveCurrencyChange(e.target.value)
                            })}
                            id="receiveCurrencySymbol"
                        >
                            <option value=''>Select Receive Currency</option>
                            {currencyLists}
                        </select>

                        <div className="invalid-feedback ">
                            <span >{errors?.receiveCurrencySymbol?.message}</span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="spendCurrencySymbol" className="form-label fw-bold">Spend Currency </label>
                        <select

                            name="spendCurrencySymbol"
                            className={`form-select  ${errors?.spendCurrencySymbol ? 'is-invalid' : ''}`}
                            {...register('spendCurrencySymbol', {
                                onChange: (e) => handleSpendCurrencyChange(e.target.value)
                            })}
                            id="spendCurrencySymbol"
                        >
                            <option value=''>Select Spend Currency</option>
                          
                            {
                                spendCurrencyAllData.map((currencyData) => (
                                    <option key={currencyData._id} value={currencyData.currencySymbol}>{currencyData.currencySymbol}</option>
                                ))
                            }
                        </select>
                        <div className="invalid-feedback ">
                            <span >{errors?.spendCurrencySymbol?.message}</span>
                        </div>
                    </div>
                    {/* market price get method */}
                    <div className="mb-3">
                        <label htmlFor="marketPriceGetMethod" className="form-label fw-bold">Market Price Get Method</label>
                        <select
                            name="marketPriceGetMethod"
                            className={`form-select  ${errors?.marketPriceGetMethod ? 'is-invalid' : ''}`}
                            {...register('marketPriceGetMethod')}
                            id=""
                        >
                            <option value=''>Select Method</option>
                            <option value='automatic'>Automatic</option>
                            <option value='manual'>Manual</option>

                        </select>
                        <div className="invalid-feedback ">
                            <span >{errors?.marketPriceGetMethod?.message}</span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pairMarketPrice" className="form-label fw-bold">Market Price</label>
                        <input
                            type="text"
                            className={`form-control`}
                            id="pairMarketPrice"
                            name='pairMarketPrice'
                            value={pairMarketPrice}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="makerFee" className="form-label fw-bold">Maker Fee(%)</label>
                        <input
                            type="text"
                            className={`form-control  ${errors?.makerFee ? 'is-invalid' : ''}`}
                            id="makerFee"
                            name='makerFee'
                            {...register('makerFee')}
                        />
                        <div className="invalid-feedback ">
                            <span >{errors?.makerFee?.message}</span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="takerFee" className="form-label fw-bold">Taker Fee(%)</label>
                        <input
                            type="text"
                            name='takerFee'
                            {...register("takerFee")}
                            className={`form-control  ${errors?.takerFee ? 'is-invalid' : ''}`}
                            id="takerFee"
                        />
                        <div className="invalid-feedback ">
                            <span >{errors?.takerFee?.message}</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="takerPrice" className="form-label fw-bold">Status</label>
                        <select name="status" id=""
                            className={`form-select mb-3  ${errors?.status ? 'is-invalid' : ''}`}
                            {...register('status')}
                        >
                            <option value="">select status</option>
                            <option value="active">Active</option>
                            <option value="deactive">Deactive</option>
                        </select>
                        <div className="invalid-feedback mb-2">
                            <span >{errors?.status?.message}</span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="decimal" className="form-label fw-bold">Decimal</label>
                        <input
                            type="text"
                            name='decimal'
                            {...register("decimal")}
                            className={`form-control  ${errors?.decimal ? 'is-invalid' : ''}`}
                            id="decimal"
                        />
                        <div className="invalid-feedback ">
                            <span >{errors?.decimal?.message}</span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="minimumTradeQuantity" className="form-label fw-bold">Minimum Trade Quantity</label>
                        <input
                            type="text"
                            className={`form-control  ${errors?.minimumTradeQuantity ? 'is-invalid' : ''}`}
                            id="minimumTradeQuantity"
                            name='minimumTradeQuantity'
                            {...register('minimumTradeQuantity')}
                        />
                        <div className="invalid-feedback ">
                            <span >{errors?.minimumTradeQuantity?.message}</span>
                        </div>
                    </div>
                    {/* minimum trade amount */}
                    <div className="mb-3">
                        <label htmlFor="minimumTradeAmount" className="form-label fw-bold">Minimum Trade Amount</label>
                        <input
                            type="text"
                            className={`form-control  ${errors?.minimumTradeAmount ? 'is-invalid' : ''}`}
                            id="minimumTradeAmount"
                            name='minimumTradeAmount'
                            {...register('minimumTradeAmount')}
                        />
                        <div className="invalid-feedback ">
                            <span >{errors?.minimumTradeAmount?.message}</span>
                        </div>
                    </div>
                    {/* minimum trade amount */}
                   
                        <div className="mb-3">
                            <label htmlFor="pairIcon" className="form-label fw-bold"></label>
                            <input
                                type="file"
                                accept='image/*'
                                className={`form-control  ${errors?.currencyIcon ? 'is-invalid' : ''}`}
                                id="pairIcon"
                                name="pairIcon"
                                {...register('pairIcon')}
                            />
                            <div className="invalid-feedback ">
                                <span >{errors?.pairIcon?.message}</span>
                            </div>
                        </div>
                    <div className='d-grid'>
                        <button className='btn btn-success mb-5'>ADD PAIR</button>
                    </div>
                </div>
            </form >

        </div >
    )
}

export default AddPair