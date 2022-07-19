export class MissingData extends Error{
    constructor(message, object){
        super(message);
        this.name= "MissingData";
        this.object= object
    }
}