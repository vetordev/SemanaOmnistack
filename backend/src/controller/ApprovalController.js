const Booking = require('../models/Booking');
module.exports = {
  async store (req, res){
    
    const { booking_id } = req.params;
    const { user_id } = req.headers;
  
    const booking = await Booking.findById(booking_id).populate('spot');
    const userCreatorSpot = booking.spot.user;
    if (user_id == userCreatorSpot && booking.approved == null){
      booking.approved = true;

      await booking.save();

      const bookingUserSocket = req.connectedUsers[booking.user];

      if(bookingUserSocket){
          req.io.to(bookingUserSocket).emit('booking_response', booking);
          //to => só um socket
      }

      return res.json(booking);
    }else{
      return res.json({accepted : false});
    }
    
    

  }
}