import { createCar } from "../services/car.service.js";

const addCar = async(req,res)=>{
    try {
        const {brand, model, year} = req.body;
        const userId = req.user.id;

        if(!brand || !model || !year) return res.status(400).json({
            message:"All field are important"
        })

        await createCar(brand,model,year,userId)
        res.status(201).send(`Car ${brand} ${model} added`);

    } catch (error) {
        res.status(500).json({message:"Internal server error", error: error.message})

    }
}

export{
    addCar
}