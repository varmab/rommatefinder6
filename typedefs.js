let typedefs=`
    type User {
        id:ID!
        name:String
        email:String
        phone:String
        password:String
        auth:Boolean,
        token:String
    }

    input UserInput {
        name:String
        email:String
        phone:String
        password:String
    }

    type RoommateRequest {
        id:ID!
        area:String
        city:String
        gender:String
        rent:Int
        numberOfRoommates:Int
        photo:String
        userId:ID
    }

    input RoommateRequestInput {
        area:String
        city:String
        gender:String
        rent:Int
        numberOfRoommates:Int
        photo:String
        userId:ID
    }

    type Query {
        allRequests:[RoommateRequest]
    }

    type Mutation {
        login(email:String,password:String):User
        register(user:UserInput):User
        createRequest(request:RoommateRequestInput):RoommateRequest
    }
`

module.exports=typedefs;