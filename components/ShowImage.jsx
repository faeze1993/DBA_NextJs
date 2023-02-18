import React from "react";
import {Img} from 'react-image'
import { ScaleLoader } from "react-spinners";


const ShowImage = ({ image }) => {
    return (
        <Img className="card-img-top"
            src={[
                image,
                 // `file://///Desktop-e63k26o/mssqlserver/DIRECTORY_MegaServer/DIRECTORY_MegaServer/${image}`,
                // `http://localhost:3000/${image}`
                "https://via.placeholder.com/150x100"
            ]}
        loader={
            <div className="text-center mx-auto">
                <ScaleLoader loading={true} color={"green"}/>
            </div>
        } 
        />
    );
}
export default ShowImage;