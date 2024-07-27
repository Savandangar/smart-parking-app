const crypto = require('crypto')
const { bookSlotValidator } = require('../validators/joi-validator')
const User = require('../models/User')
const dayjs = require('dayjs')
const BookedTimeSlot = require('../models/BookedTimeSlot')
const mongoose = require('mongoose')
const Payment = require('../models/Payment')
const ParkingLot = require('../models/ParkingLot')
const sendEmail2 = require('../Utils/sendEmail2')


//tested
/*create the order of payment of the booking of slot*/
exports.checkoutBookSlot = async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ msg: "Unauthorized" })
    }
    const { error } = bookSlotValidator.validate(req.body)
    
    if(error){
        if(error.details[0].path[0]==='vehicleNo' && error.details[0].type==="string.pattern.base"){
            return res.status(400).json({ msg: "Please enter a valid Vehicle Number"})
        }
    }
    
    try {
        if (error) {
            return res.status(400).json({ msg: error.details[0].message })
        }
        const { lotId, slotId, startTime, endTime, vehicleType, carImg, vehicleNo, cancellable, charges,type,currTime } = req.body
        console.log(lotId, slotId, startTime, endTime, vehicleType, vehicleNo, cancellable, charges,type,currTime)

        //get timeStamp
        const storebookingStart = new Date(startTime).getTime()
        const storebookingEnd = new Date(endTime).getTime()
        const currTimeStamp = new Date(currTime).getTime()

        //get active bookings by the user for the vehicleType
        //i.e. whose endTime is greater than equal to currTimeStamp
        const futureBookedParkingSlots = await BookedTimeSlot.find({
            endTime: {
                $gte: currTimeStamp
            },
            vehicleType: vehicleType,
            booker: req.userId,
            cancelled: false,
            paid: true
        })
        //if any active bookings found
        if (futureBookedParkingSlots.length > 0) {
            return res.status(400).json({ msg: `You have already have booked a slot for a ${vehicleType}` })
        }
        console.log("already booked slot checked")

        //get all of active booked slot for this vehicleNo
       
        const vehicleBookedSlots = await BookedTimeSlot.find({
            vehicleNo: vehicleNo,
            cancelled: false,
            paid: true,
            vehcileType:vehicleType,
            endTime:{
                $gte:currTimeStamp
            }
        })

        //if this vehicleNo has an active slot then isn't allowed to book
        if (vehicleBookedSlots.length > 0) {
            return res.status(400).json({ msg: `This vehicle Number ${vehicleNo} already has an active slot booked` })
        }

        console.log("vehicle no slot checked")

        const bookedSlot = await BookedTimeSlot.create({
            startTime: storebookingStart, endTime: storebookingEnd, parkingSlot: mongoose.Types.ObjectId(slotId),
            parkingLot: mongoose.Types.ObjectId(lotId), booker: req.userId, vehicleType: vehicleType,
            carImage: carImg, vehicleNo: vehicleNo, cancellable: cancellable, paid: true
        })
        console.log("bookedSlot")
        return res.status(200).json({ msg: "Slot Booking Successful" })
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong" })
    }
}