export type AppStackParams = {
    Open :  undefined,
    Login : undefined,
    SignUp : undefined,
    Home : UserDetails,
    Details : {
        name : string,
        index : number,
        color : string,
        imgUrl : string
    }
  }

export type UserDetails = {
    name : string,
    email : string,
    password : string
}