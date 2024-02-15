const { model, models, Schema, default: mongoose } = require("mongoose");

const EventSchema = new Schema({
    title: {
        type: String,
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    reserve: {
        type: String
    },
}
);

const Event = models?.Event || model('Event', EventSchema);
export default Event;
