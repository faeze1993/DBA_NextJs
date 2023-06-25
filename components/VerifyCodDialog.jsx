import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import 'highlight.js/styles/atom-one-light.css';
import { errorMessage, successMessage } from "../utils/message"
import SimpleReactValidator from "simple-react-validator";
import { CheckVerifyCode, ResendVerifyCode } from "../services/userService";
import useCountdown from "../hooks/useCountdown";
import _ from "lodash";
import BarLoader from "react-spinners/BarLoader";


const VerifyCodDialog = ({ showDialog, closeDialog, cancelDialog, useName }) => {

    //https://blog.greenroots.info/how-to-create-a-countdown-timer-using-react-hooks
    const [RemindTime, setRemindTime] = useState();
    const [minutes, seconds, isFinished] = useCountdown(RemindTime);
    const [IsCodeSend, setIsCodeSend] = useState(false);
    const [Loading, setLoading] = useState(false);

    const inputElement1 = useRef(null);
    const inputElement2 = useRef(null);
    const inputElement3 = useRef(null);
    const inputElement4 = useRef(null);
    const inputElement5 = useRef(null);

    useEffect(() => {

        inputElement1.current?.focus();
        var twentyMinutesLater = new Date();
        twentyMinutesLater.setSeconds(twentyMinutesLater.getSeconds() + 120);
        setRemindTime(twentyMinutesLater)
    }, [IsCodeSend])


    const handleSubmit = async () => {
        setLoading(true);
        try {
            const codeNumber = [
                inputElement1.current?.value.toString(),
                inputElement2.current?.value.toString(),
                inputElement3.current?.value.toString(),
                inputElement4.current?.value.toString(),
                inputElement5.current?.value.toString()
            ].join('');

            const { data } = await CheckVerifyCode(codeNumber, useName);
            setLoading(false);
            if (data.Status == "success") {
                successMessage("عملیات با موفقیت انجام شد")
                closeDialog();
            } else {
                errorMessage(data.Message)
            }


        }
        catch (ex) {
            setLoading(false);
            // console.log(ex)
        }
    }

    const handleResendVerifyCode = () => {
        ResendVerifyCode(useName);
        setIsCodeSend(true);
        inputElement1.current.value = null;
        inputElement2.current.value = null;
        inputElement3.current.value = null;
        inputElement4.current.value = null;
        inputElement5.current.value = null;
        setTimeout(() => {
            setIsCodeSend(false);
        }, 2000);
    }

    const validation = useRef(
        new SimpleReactValidator(
            {
                messages: {
                    required: "پر کردن این فیلد الزامی می باشد",
                    string: "این فیلد باید با حروف پر شود",
                    min: "حداقل تعداد کاراکتر رعایت نشده است",
                    max: "حداکثر تعداد کاراکتر رعایت نشده است",
                    email: "الگوی وارد شده صحیح نمی باشد"
                },
                element: message => <span style={{ color: 'red' }}>{message}</span>
            }
        )
    )

    function handleTextChange1(e) {
        if (e.length === 1) {
            console.info("handleTextChange1");
            inputElement2.current?.focus();
        }
    }
    function handleTextChange2(e) {
        if (e.length === 1) {
            console.info("handleTextChange2");
            inputElement3.current?.focus();
        }
    }
    function handleTextChange3(e) {
        if (e.length === 1) {
            console.info("handleTextChange3");
            inputElement4.current?.focus();
        }
    }
    function handleTextChange4(e) {
        if (e.length === 1) {
            console.info("handleTextChange4");
            inputElement5.current?.focus();
        }
    }
    function handleTextChange5(e) {
        if (e.length === 1) {
            handleSubmit();
        }
    }
    const ShowCounter = ({ minutes, seconds }) => {
        if (minutes <= 0 && seconds <= 0 && (!IsCodeSend || isFinished)) {
            return (
                <div className="show-counter justify-content-center d-flex py-3">
                    <div className="col-md-6">
                        <button className="col btn btn-sm btn-secondary text-white w-100 mb-1 mx-2" onClick={handleResendVerifyCode}> ارسال مجدد کد</button>
                    </div>

                </div>
            );
        } else {
            return (
                <div className="show-counter justify-content-center d-flex py-3">

                    <span>{seconds}</span>
                    <p>:</p>
                    <span className="pe-2">{minutes}</span>
                    تا درخواست مجدد کد
                </div>
            );
        }

    };

    return (
        <Modal
            show={showDialog}
            onHide={cancelDialog}
            backdrop="static"
            keyboard={false}
            size="xs"
        >
            <Modal.Header closeButton>
            </Modal.Header>

            <Modal.Body>
                <div className="inner form-layer">

                    <div className="row text-center pb-4">
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>کد تایید را وارد نمایید</span>
                        <span className="pt-2">کد تایید پنج رقمی به شماره شما ارسال شد.
                        </span>
                    </div>

                    <form>
                        <div className="form-group row pb-2">
                            <div className="d-flex justify-content-center">
                                <input
                                    type="text"
                                    name="Code5"
                                    className="form-control m-2 text-center verifycode_input"
                                    id="inputCode5"
                                    maxLength={1}
                                    ref={inputElement5}
                                    onChange={e => { handleTextChange5(e.target.value) }}
                                />

                                <input
                                    type="text"
                                    name="Code4"
                                    className="form-control m-2 text-center verifycode_input"
                                    id="inputCode4"
                                    maxLength={1}
                                    ref={inputElement4}
                                    onChange={e => { handleTextChange4(e.target.value) }}
                                />

                                <input
                                    type="text"
                                    name="Code3"
                                    className="form-control m-2 text-center verifycode_input"
                                    id="inputCode3"
                                    maxLength={1}
                                    ref={inputElement3}
                                    onChange={e => { handleTextChange3(e.target.value) }}
                                />
                                <input
                                    type="text"
                                    name="Code2"
                                    className="form-control m-2 text-center verifycode_input"
                                    id="inputCode2"
                                    maxLength={1}
                                    ref={inputElement2}
                                    onChange={e => { handleTextChange2(e.target.value) }}
                                />

                                <input
                                    type="text"
                                    name="Code1"
                                    className="form-control m-2 text-center verifycode_input"
                                    id="inputCode1"
                                    maxLength={1}
                                    ref={inputElement1}
                                    onChange={e => { handleTextChange1(e.target.value) }}
                                />

                            </div>
                        </div>
                    </form>

                    <div className="row">
                        <ShowCounter
                            minutes={minutes}
                            seconds={seconds}
                        />
                    </div>

                    <div className="row justify-content-center pb-3">

                    </div>

                </div>
            </Modal.Body>
            {Loading && <div className="preloader"><BarLoader color="rgb(39 103 169);" width={"100%"} loading={Loading} speedMultiplier={0.5} /></div>}
        </Modal>
    );
}

export default VerifyCodDialog;
