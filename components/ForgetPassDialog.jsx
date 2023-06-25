import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import 'highlight.js/styles/atom-one-light.css';
import { errorMessage } from "../utils/message"
import SimpleReactValidator from "simple-react-validator";
import { CheckMobileNumber } from "../services/userService";

const ForgetPassDialog = ({ showDialog, closeDialog, cancelDialog }) => {

    const [, forceUpdate] = useState();
    const [Mobile, setMobile] = useState();

    useEffect(() => {

    }, [])

  
    const handleSubmit = async event => {
        event.preventDefault();

        try {

            if (validation.current.allValid()) {
                const { data } = await CheckMobileNumber(Mobile);
                // console.info("mobile data", data);
                if (data.Status == "success") {
                    closeDialog(data.Data, true);
                } else {
                    errorMessage(data.Message)
                }

            } else {
                validation.current.showMessages();
                forceUpdate(1);
            }
        }
        catch (ex) {
            // console.log(ex)
        }
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

    return (
        <Modal
            show={showDialog}
            onHide={closeDialog}
            backdrop="static"
            keyboard={false}
            size="xs"
        >

            <Modal.Body>
                <div className="inner form-layer">

                    <form onSubmit={handleSubmit}>
                        <div className="form-group row pb-2">
                            <div className="col-sm-12">
                                <input
                                    type="text"
                                    name="Mobile"
                                    placeholder="شماره موبایل را وارد نمایید"
                                    className="form-control"
                                    id="inputMobile"
                                    value={Mobile}
                                    onChange={e => { setMobile(e.target.value); validation.current.showMessageFor('Mobile') }}
                                />
                                {validation.current.message("Mobile", Mobile, 'required')}
                            </div>
                        </div>


                        <div className="row">
                            <button className="col btn btn-sm text-white main-background-color-btn w-100 mb-1 mx-2" type="submit"> ثبت</button>
                            <button className="col btn btn-sm btn-secondary text-white w-100 mb-1 mx-2" onClick={cancelDialog}> انصراف</button>
                        </div>
                    </form>


                </div>
            </Modal.Body>

        </Modal>
    );
}

export default ForgetPassDialog;
