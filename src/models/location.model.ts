function locationModel(model = <any>{}) {
	return {
        id : model.id,
        name : model.name,
        address : model.address,
        telNumber : model.telNumber
	};
}

class LocationModel {
    id: number;
    name: string;
    address: string;
    telNumber: string;

}


  export { LocationModel, locationModel };
