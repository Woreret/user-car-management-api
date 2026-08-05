import { createCar, deleteCarById, getUserCars, updateCarById } from "../services/car.service.js";

const addCar = async(req,res,next)=>{
    try {
        const {brand, model, year} = req.body;
        const userId = req.user.id;

        if(!brand || !model || !year) return res.status(400).json({
            message:"All field are important"
        })

        await createCar(brand,model,year,userId)
        res.status(201).send(`Car ${brand} ${model} added`);

    } catch (error) {
        next(error);
    }
}

const getCars = async(req,res,next)=>{
    try {
        const userId = req.user.id;

        const cars = await getUserCars(userId);

        if(cars.length === 0){
            return res.status(404).json({ message: "Cars not found" });
        }
        
        res.status(200).json(cars);

    } catch (error) {
        next(error)
    }
}

const deleteCar = async(req, res, next)=>{
    try {
        const carId = req.params.id;
        const userId = req.user.id;

        await deleteCarById(carId, userId);

        res.status(200).json("Car was deleted");

    } catch (error) {
        if (error.message === 'Car not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Access denied') {
            return res.status(403).json({ message: error.message });
        }
        next(error);
    }
}

const updateCar = async(req,res,next)=>{
    try {
        const {brand,model,year} = req.body;
        const carId = req.params.id;
        const userId = req.user.id;

        await updateCarById(carId,userId,brand,model,year);

        res.status(200).json("Car was updated");

    } catch (error) {
        if (error.message === 'Car not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Access denied') {
            return res.status(403).json({ message: error.message });
        }
        next(error);
    }
}
export{
    addCar,
    getCars,
    deleteCar,
    updateCar
}