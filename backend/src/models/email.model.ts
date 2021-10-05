function emailModel(model = <any>{}) {
	return {
            emailTo: model.emailTo,
            message: model.message
      
	};
}

class EmailModel {
    emailTo: string;
    message: string;
    

}


  export { EmailModel, emailModel };
