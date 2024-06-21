export default class UserDaos {
    constructor(model){
        this.model = model;
    }


    async getById(user){
        const {id} = user
        const userId = await this.model.findById({id})
        if(!userId) return null
            else return userId
    }
    async register(user){
        try {
            const {email} = user;
           const existUser = await this.model.findOne({email})
           if(!existUser) return await this.model.create(user);
           else return null
           
        } catch (error) {
            throw new Error(error)

        }
    }

    async login(email, password){
        try {
            return await this.model.findOne({email});
        } catch (error) {
            throw new Error(error)
        }
    }
    async getByEmail(email) {
        try {
          return await this.model.findOne({ email });
        } catch (error) {
          throw new Error(error);
        }
      }
    
}
