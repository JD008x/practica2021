function userModel(model = <any>{}) {
	return {
        id : model.id,
        userName : model.userName,
        email : model.email,
        password : model.password,
        realName : model.realName,
        creationDate : model.creationDate,
        role : model.role
	};
}

class UserModel {
    id: number;
    userName: string;
    email: string;
    password: string;
    realName: string;
    creationDate = new Date();
    role: UserRole;


}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
  }
  export { UserModel, userModel };