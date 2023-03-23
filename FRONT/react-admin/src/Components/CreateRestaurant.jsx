import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";




function createRestaurant() {
    const dispatch = useDispatch();

    const [restaurants, setRestaurants] = useState({
        id: "",
        Info: "",
        Info: "",
        Info: "",

    })

    const [errors, setErrors] = useState({
        Info: "",
        Info: "",
        Info: "",
        Info: "",

    })





    const handlerChange = (e) => {
        const infos = e.target.name
        const value = e.target.value

        setRestaurants({ ...createRestaurant, [infos]: value })

    }


    const validate = (restaurants) => {
       if( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(restaurants.email)) {

       } else{
        console.log("You have entered an invalid email address!")
       }

    }


    useEffect(() => {





    })






    return (
        <form>
            <div>
                <label>Info: </label>
                <input type="text" value={restaurants.Info} onChange={handlerChange} name="Info" />
            </div>

            <div>
                <label>Info: </label>
                <input type="text" value={restaurants.Info} onChange={handlerChange} name="Info" />
            </div>

            <div>
                <label>Info: </label>
                <input type="text" value={restaurants.Info} onChange={handlerChange} name="Info" />
            </div>

            <div>
                <label>Info</label>
                <input type="text" value={restaurants.Info} onChange={handlerChange} name="Info" />
            </div>






        </form>



    )















}