import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { useNewCurrencyAddMutation } from './currencyApi';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const currencySchema = Yup.object().shape({
  currencyName: Yup.string()
    .required("currency name is required")
    .min(3, "Currency Name Mininum Add 3 Characters")
    .trim(),
  currencySymbol: Yup.string()
    .required("currency name is required")
    .min(3, "Currency Symbol Mininum Add 3 Characters")
    .trim(),
  usdtPrice: Yup.string()
    .required("usdt price is required")
    .matches(/^[0-9.]+$/, "positive number only allowed")
    .trim(),
  cryptoType: Yup.string().required("crypto type is required").trim(),
  decimal: Yup.string()
    .required("decimal is required")
    .matches(/^[0-9]+$/, "positive number only allowed")
    .trim(),
  depositStatus: Yup.string().required("deposit status is required"),
  minimumWithdrawLimit: Yup.string()
    .required("Minimum Withdraw Limit status is required")
    .matches(/^[0-9.]+$/, "positive number only allowed")
    .trim(),
  maxWithdrawLimit: Yup.string()
    .required("Max Withdraw Limit status is required")
    .matches(/^[0-9.]+$/, "positive number only allowed")
    .trim(),
  withdrawStatus: Yup.string().required("withdraw status is required"),
  feeType: Yup.string().required("fee type is required"),
  withdrawFee: Yup.string()
    .required("withdraw status is required")
    .matches(/^[0-9.]+$/, "positive number only allowed")
    .trim(),
  status: Yup.string().required(" status is required"),
  currencyIcon: Yup.mixed()
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
});

const CurrencyAdd = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(currencySchema),
    mode: "all",
  });

  // const [newCurrencyAdd] = useNewCurrencyAddMutation()

  const addCurrency = async (currencyData) => {
    console.log(currencyData);
    const currencyIcon = currencyData.currencyIcon;
    console.log(currencyIcon);
    try {
      const formData = new FormData();
      formData.append("currencyName", currencyData.currencyName);
      formData.append("currencySymbol", currencyData.currencySymbol);
      formData.append("usdtPrice", Number(currencyData.usdtPrice));
      formData.append("cryptoType", currencyData.cryptoType);
      formData.append("depositStatus", currencyData.depositStatus);
      formData.append("decimal", Number(currencyData.decimal));
      formData.append(
        "minimumWithdrawLimit",
        Number(currencyData.minimumWithdrawLimit)
      );
      formData.append(
        "maxWithdrawLimit",
        Number(currencyData.maxWithdrawLimit)
      );
      formData.append("withdrawStatus", currencyData.withdrawStatus);
      formData.append("withdrawFee", Number(currencyData.withdrawFee));
      formData.append("feeType", currencyData.feeType);
      formData.append("status", currencyData.status);
      formData.append("currencyIcon", currencyData.currencyIcon[0]);
      // const response = await newCurrencyAdd(formData)
      // if (response.error) {
      //     toast.error(response.error.data.message)
      // }
      // toast.success(response.data.message)
      // navigate('/currency/currenyLists')
      console.log(currencyData);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="col-8 mx-auto">
        <div className="d-flex justify-content-between my-3">
          <h3 className="fw-bold">ADD CURRENCY</h3>
          <p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/admin/exchange/currency")}
            >
              BACK
            </button>
          </p>
        </div>
        <form onSubmit={handleSubmit(addCurrency)}>
          <div>
            <div className="mb-3">
              <label htmlFor="currencyName" className="form-label fw-bold">
                Currency Name:
              </label>
              <input
                type="text"
                className={`form-control  ${
                  errors?.currencyName ? "is-invalid" : ""
                }`}
                id="currencyName"
                placeholder="Bitcoin"
                name="currencyName"
                {...register("currencyName")}
              />
              <div className="invalid-feedback ">
                <span>{errors?.currencyName?.message}</span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="currencySymbol" className="form-label fw-bold">
                Currency Symbol:
              </label>
              <input
                type="text"
                className={`form-control  ${
                  errors?.currencySymbol ? "is-invalid" : ""
                }`}
                id="currencySymbol"
                placeholder="BTC"
                name="currencySymbol"
                {...register("currencySymbol")}
              />
              <div className="invalid-feedback ">
                <span>{errors?.currencySymbol?.message}</span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="cryptoType" className="form-label fw-bold">
                Crypto Type
              </label>
              <select
                name="cryptoType"
                id="cryptoType"
                className={`form-select  ${
                  errors?.cryptoType ? "is-invalid" : ""
                }`}
                {...register("cryptoType")}
              >
                <option value="">select crytpo type</option>
                <option value="coin">Coin</option>
                <option value="token">Token</option>
              </select>
              <div className="invalid-feedback ">
                <span>{errors?.cryptoType?.message}</span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="decimal" className="form-label fw-bold">
                Decimal
              </label>
              <input
                type="text"
                className={`form-control  ${
                  errors?.decimal ? "is-invalid" : ""
                }`}
                id="decimal"
                name="decimal"
                {...register("decimal")}
              />
              <div className="invalid-feedback ">
                <span>{errors?.decimal?.message}</span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="depositStatus" className="form-label fw-bold">
                Deposit Status
              </label>
              <select
                name="depositStatus"
                id="depositStatus"
                className={`form-select  ${
                  errors?.depositStatus ? "is-invalid" : ""
                }`}
                {...register("depositStatus")}
              >
                <option value="">select status</option>
                <option value="active">ACTIVE</option>
                <option value="deactive">DEACTIVE</option>
              </select>
              <div className="invalid-feedback ">
                <span>{errors?.depositStatus?.message}</span>
              </div>
            </div>
            {/* minimumWithdrawLimit */}
            <div className="mb-3">
              <label
                htmlFor="minimumWithdrawLimit"
                className="form-label fw-bold"
              >
                Minimum Withdraw Limit
              </label>
              <input
                type="text"
                className={`form-control  ${
                  errors?.minimumWithdrawLimit ? "is-invalid" : ""
                }`}
                id="minimumWithdrawLimit"
                name="minimumWithdrawLimit"
                {...register("minimumWithdrawLimit")}
              />
              <div className="invalid-feedback ">
                <span>{errors?.minimumWithdrawLimit?.message}</span>
              </div>
            </div>
            {/* maxWithdrawLimit */}
            <div className="mb-3">
              <label htmlFor="maxWithdrawLimit" className="form-label fw-bold">
                Max Withdraw Limit
              </label>
              <input
                type="text"
                className={`form-control  ${
                  errors?.maxWithdrawLimit ? "is-invalid" : ""
                }`}
                id="maxWithdrawLimit"
                name="maxWithdrawLimit"
                {...register("maxWithdrawLimit")}
              />
              <div className="invalid-feedback ">
                <span>{errors?.maxWithdrawLimit?.message}</span>
              </div>
            </div>
            {/* withdrawStatus */}
            <div className="mb-3">
              <label htmlFor="withdrawStatus" className="form-label fw-bold">
                Withdraw Status
              </label>
              <select
                name="withdrawStatus"
                id="withdrawStatus"
                className={`form-select  ${
                  errors?.withdrawStatus ? "is-invalid" : ""
                }`}
                {...register("withdrawStatus")}
              >
                <option value="">select status</option>
                <option value="active">ACTIVE</option>
                <option value="deactive">DEACTIVE</option>
              </select>
              <div className="invalid-feedback ">
                <span>{errors?.withdrawStatus?.message}</span>
              </div>
            </div>
            {/* withdrawFee */}
            <div className="mb-3">
              <label htmlFor="withdrawFee" className="form-label fw-bold">
                Withdraw Fee
              </label>
              <input
                type="text"
                className={`form-control  ${
                  errors?.withdrawFee ? "is-invalid" : ""
                }`}
                id="withdrawFee"
                name="withdrawFee"
                {...register("withdrawFee")}
              />
              <div className="invalid-feedback ">
                <span>{errors?.withdrawFee?.message}</span>
              </div>
            </div>
            {/* feeType */}
            <div className="mb-3">
              <label htmlFor="feeType" className="form-label fw-bold">
                Fee Type
              </label>
              <select
                name="feeType"
                id="feeType"
                className={`form-select  ${
                  errors?.feeType ? "is-invalid" : ""
                }`}
                {...register("feeType")}
              >
                <option value="">select fee type</option>
                <option value="fixed">Fixed</option>
                <option value="percentage">Percentage</option>
              </select>
              <div className="invalid-feedback ">
                <span>{errors?.feeType?.message}</span>
              </div>
            </div>
            {/* usdtPrice */}
            <div className="mb-3">
              <label htmlFor="usdtPrice" className="form-label fw-bold">
                USDT Price
              </label>
              <input
                type="text"
                className={`form-control  ${
                  errors?.usdtPrice ? "is-invalid" : ""
                }`}
                id="usdtPrice"
                placeholder=""
                name="usdtPrice"
                {...register("usdtPrice")}
              />
              <div className="invalid-feedback ">
                <span>{errors?.usdtPrice?.message}</span>
              </div>
            </div>
            {/* status */}
            <div className="mb-3">
              <label htmlFor="status" className="form-label fw-bold">
                {" "}
                Status
              </label>
              <select
                name="status"
                id="status"
                className={`form-select  ${errors?.status ? "is-invalid" : ""}`}
                {...register("status")}
              >
                <option value="">select status</option>
                <option value="active">ACTIVE</option>
                <option value="deactive">DEACTIVE</option>
              </select>
              <div className="invalid-feedback ">
                <span>{errors?.status?.message}</span>
              </div>
            </div>
            {/* currencyIcon */}
            <div className="mb-3">
              <label
                htmlFor="currencyIcon"
                className="form-label fw-bold"
              ></label>
              <input
                type="file"
                accept="image/*"
                className={`form-control  ${
                  errors?.currencyIcon ? "is-invalid" : ""
                }`}
                id="currencyIcon"
                name="currencyIcon"
                {...register("currencyIcon")}
              />
              <div className="invalid-feedback ">
                <span>{errors?.currencyIcon?.message}</span>
              </div>
            </div>
            <div className="d-grid">
              <button className="btn btn-success mb-5">ADD CURRENCY</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrencyAdd;
