import React, {useState} from "react";
import DatePick from "../DatePick/DatePick"
import API from "../../utils/API"
import "./style.css";


export function Card(props) {
    const [name, setName] = useState(props.name)
    const [item_id, setID] = useState(props.id);
    const [price, setPrice] = useState(props.price);
    const [description, setDescription] = useState(props.description);
    let [available, setAvailable] = useState(props.available);
    const [rented_from, setrented_from] = useState(null);
    const [rented_to, setrented_to] = useState(null);

    const handleRentItem = (item_id) => {
        let rentObject = {
            item_id: item_id,
            rented_from: {rented_from},
            rented_to: {rented_to},
            user_id: ""
        }

        API.rentItem(rentObject)
        .then(res => {
            console.log(res)
            setAvailable(available = false)
            console.log("available val", {available})
        })
        .catch(err => {
            console.log(err)
        })
    };

    const handleReturnItem = (item_id) => {

        API.returnItem(item_id)
        .then(res => {
            console.log(res)
            setAvailable(available = true)
            console.log("available val", {available})
        })
        .catch(err => {
            console.log(err)
        })
    };

    return (
        <div className="card">
            <img src={props.url} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="">{description}</p>
                    <p className="">{price}</p>
                    <p>Rent Duration</p>
                    <DatePick setrented_from={setrented_from} setrented_to={setrented_to}
                    rented_to={rented_to} rented_from={rented_from}/>
                    {available ?
                    <button className="btn btn-sm  btn-primary"
                        onClick={() => {handleRentItem(item_id) }}>Rent
                    </button>
                    :
                    <button className="btn btn-sm btn-primary"
                        onClick={() => {handleReturnItem({item_id}) }}>Return
                    </button>
                }
                </div>
        </div>

            );
}
            
export default Card;