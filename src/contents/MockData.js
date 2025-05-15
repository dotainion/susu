import { utils } from "../utils/Utils";
import { v4 as uuidv4 } from "uuid";

class MockData{
    user(){
        return{
            id: uuidv4(),
            attributes:{
                foreignId: null,
                firstName: this.randomName(0),
                lastName: this.randomName(1),
                email: 'example@example.com',
                hide: false,
                date: '2024-11-01 12:14:01',
                token: null,
                phoneNumber: '1473 459 8999',
                picture: null,
                addressId: null,
                address: this.address(),
                bio: 'MAS means More in Spanish, so MAS Global’s name reflects our mission to create education opportunities for women and Latinos in tech',
                gender: 'Male',
            }
        }
    }

    randomName(type){
        const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Riley", "Casey", "Jamie", "Cameron", "Drew", "Skyler"];
        const lastNames = ["Smith", "Johnson", "Lee", "Brown", "Davis", "Miller", "Wilson", "Clark", "Lewis", "Young"];
        const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
        if(type === 0) return randomFirst;
        const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
        if(type === 1) return randomLast;
        return `${randomFirst} ${randomLast}`;
    }

    address(){
        return{
            id: uuidv4(),
            attributes: {
                country: 'Grenada',
                state: 'St. Georges',
                address: 'Tempe',
                apt: '2',
                zip: '0000',
            }
        }
    }

    posts(){
        return [
            {
                "id":"7dbc94bd-0cfd-4a00-8778-e9923631f49a",
                "type":"post",
                "attributes":{
                    "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                    "parentId":null,
                    "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                    "contents":"<p>hfgdsa<\/p>",
                    "created":"2025-05-07 07:45:26",
                    "replies":[
                        {
                            "id":"d581a594-dc39-458f-8cc6-8e38c5b08f40",
                            "type":"post",
                            "attributes":{
                                "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                "parentId":"7dbc94bd-0cfd-4a00-8778-e9923631f49a",
                                "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                "contents":"<p>fire on the bow<\/p>",
                                "created":"2025-05-07 08:34:51",
                                "replies":[
                                    {
                                        "id":"e7ea4218-daa0-4cc6-adb9-981bd26e488a",
                                        "type":"post",
                                        "attributes":{
                                            "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                            "parentId":"d581a594-dc39-458f-8cc6-8e38c5b08f40",
                                            "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                            "contents":"<p>what is today<\/p>",
                                            "created":"2025-05-07 08:35:01",
                                            "replies":[
                                                {
                                                    "id":"056b1e13-7240-482f-acc4-32e3f4543a33",
                                                    "type":"post",
                                                    "attributes":{
                                                        "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                        "parentId":"e7ea4218-daa0-4cc6-adb9-981bd26e488a",
                                                        "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                        "contents":"<p>what is the water if<\/p>",
                                                        "created":"2025-05-07 08:38:05",
                                                        "replies":[
                                                            {
                                                                "id":"92b948ab-94cc-4e29-9d6a-427409392434",
                                                                "type":"post",
                                                                "attributes":{
                                                                    "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                    "parentId":"056b1e13-7240-482f-acc4-32e3f4543a33",
                                                                    "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                    "contents":"<p>firing<\/p>",
                                                                    "created":"2025-05-07 09:58:59",
                                                                    "replies":[
                                                                        {
                                                                            "id":"af77d7c5-c7dc-4de1-adb5-01851632bdfc",
                                                                            "type":"post",
                                                                            "attributes":{
                                                                                "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                "parentId":"92b948ab-94cc-4e29-9d6a-427409392434",
                                                                                "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                                "contents":"<p>ggkdg<\/p>",
                                                                                "created":"2025-05-07 10:33:42",
                                                                                "replies":[
                                                                                    {
                                                                                        "id":"bee81888-f23c-4711-b72e-15ae806aac1f",
                                                                                        "type":"post",
                                                                                        "attributes":{
                                                                                            "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                            "parentId":"af77d7c5-c7dc-4de1-adb5-01851632bdfc",
                                                                                            "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                                            "contents":"<p>fish<\/p>",
                                                                                            "created":"2025-05-07 10:53:37",
                                                                                            "replies":[
                                                                                                {
                                                                                                    "id":"5f091087-2b96-4d60-b868-b07363b6d14a",
                                                                                                    "type":"post",
                                                                                                    "attributes":{
                                                                                                        "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                                        "parentId":"bee81888-f23c-4711-b72e-15ae806aac1f",
                                                                                                        "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                                                        "contents":"<p>this is not a fish, this is a bird<\/p>",
                                                                                                        "created":"2025-05-07 11:36:55",
                                                                                                        "replies":[],
                                                                                                        "author":{
                                                                                                            "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                                            "type":"user",
                                                                                                            "attributes":{
                                                                                                                "foreignId":"",
                                                                                                                "date":"2024-08-24 03:04:10",
                                                                                                                "firstName":"fire ",
                                                                                                                "lastName":"man",
                                                                                                                "email":"exam@example.com",
                                                                                                                "hide":false,
                                                                                                                "picture":null,
                                                                                                                "phoneNumber":"",
                                                                                                                "token":null,
                                                                                                                "addressId":null,
                                                                                                                "address":null,
                                                                                                                "bio":null,
                                                                                                                "gender":""
                                                                                                            }
                                                                                                        },
                                                                                                        "likes":[]
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "author":{
                                                                                                "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                                "type":"user",
                                                                                                "attributes":{
                                                                                                    "foreignId":"",
                                                                                                    "date":"2024-08-24 03:04:10",
                                                                                                    "firstName":"fire ",
                                                                                                    "lastName":"man",
                                                                                                    "email":"exam@example.com",
                                                                                                    "hide":false,
                                                                                                    "picture":null,
                                                                                                    "phoneNumber":"",
                                                                                                    "token":null,
                                                                                                    "addressId":null,
                                                                                                    "address":null,
                                                                                                    "bio":null,
                                                                                                    "gender":""
                                                                                                }
                                                                                            },
                                                                                            "likes":[]
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "id":"b01d405c-43ae-42db-9227-61e5fa274658",
                                                                                        "type":"post",
                                                                                        "attributes":{
                                                                                            "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                            "parentId":"af77d7c5-c7dc-4de1-adb5-01851632bdfc",
                                                                                            "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                                            "contents":"<p>hooking<\/p>",
                                                                                            "created":"2025-05-07 11:11:21",
                                                                                            "replies":[
                                                                                                {
                                                                                                    "id":"9d3e5e0f-1fac-4b28-80fa-bc64d2258e1f",
                                                                                                    "type":"post",
                                                                                                    "attributes":{
                                                                                                        "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                                        "parentId":"b01d405c-43ae-42db-9227-61e5fa274658",
                                                                                                        "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                                                        "contents":"<p>firing on the spot<\/p>",
                                                                                                        "created":"2025-05-07 11:36:32",
                                                                                                        "replies":[],
                                                                                                        "author":{
                                                                                                            "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                                            "type":"user",
                                                                                                            "attributes":{
                                                                                                                "foreignId":"",
                                                                                                                "date":"2024-08-24 03:04:10",
                                                                                                                "firstName":"fire ",
                                                                                                                "lastName":"man",
                                                                                                                "email":"exam@example.com",
                                                                                                                "hide":false,
                                                                                                                "picture":null,
                                                                                                                "phoneNumber":"",
                                                                                                                "token":null,
                                                                                                                "addressId":null,
                                                                                                                "address":null,
                                                                                                                "bio":null,
                                                                                                                "gender":""
                                                                                                            }
                                                                                                        },
                                                                                                        "likes":[]
                                                                                                    }
                                                                                                }
                                                                                            ],
                                                                                            "author":{
                                                                                                "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                                "type":"user",
                                                                                                "attributes":{
                                                                                                    "foreignId":"",
                                                                                                    "date":"2024-08-24 03:04:10",
                                                                                                    "firstName":"fire ",
                                                                                                    "lastName":"man",
                                                                                                    "email":"exam@example.com",
                                                                                                    "hide":false,
                                                                                                    "picture":null,
                                                                                                    "phoneNumber":"",
                                                                                                    "token":null,
                                                                                                    "addressId":null,
                                                                                                    "address":null,
                                                                                                    "bio":null,
                                                                                                    "gender":""
                                                                                                }
                                                                                            },
                                                                                            "likes":[]
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "id":"25188c87-8819-4c98-8d08-f5ede989052b",
                                                                                        "type":"post",
                                                                                        "attributes":{
                                                                                            "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                            "parentId":"af77d7c5-c7dc-4de1-adb5-01851632bdfc",
                                                                                            "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                                            "contents":"<p>fakdfakdfjkasdfasdfadsfadsfadsfadsf askgjksgjkjs g<\/p>",
                                                                                            "created":"2025-05-07 11:11:42",
                                                                                            "replies":[],
                                                                                            "author":{
                                                                                                "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                                "type":"user",
                                                                                                "attributes":{
                                                                                                    "foreignId":"",
                                                                                                    "date":"2024-08-24 03:04:10",
                                                                                                    "firstName":"fire ",
                                                                                                    "lastName":"man",
                                                                                                    "email":"exam@example.com",
                                                                                                    "hide":false,
                                                                                                    "picture":null,
                                                                                                    "phoneNumber":"",
                                                                                                    "token":null,
                                                                                                    "addressId":null,
                                                                                                    "address":null,
                                                                                                    "bio":null,
                                                                                                    "gender":""
                                                                                                }
                                                                                            },
                                                                                            "likes":[]
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "id":"bbdf566d-5360-4d52-ac9c-d64dc9d50193",
                                                                                        "type":"post",
                                                                                        "attributes":{
                                                                                            "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                            "parentId":"af77d7c5-c7dc-4de1-adb5-01851632bdfc",
                                                                                            "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                                            "contents":"<p>firing on the boat<\/p>",
                                                                                            "created":"2025-05-07 11:35:39",
                                                                                            "replies":[],
                                                                                            "author":{
                                                                                                "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                                "type":"user",
                                                                                                "attributes":{
                                                                                                    "foreignId":"",
                                                                                                    "date":"2024-08-24 03:04:10",
                                                                                                    "firstName":"fire ",
                                                                                                    "lastName":"man",
                                                                                                    "email":"exam@example.com",
                                                                                                    "hide":false,
                                                                                                    "picture":null,
                                                                                                    "phoneNumber":"",
                                                                                                    "token":null,
                                                                                                    "addressId":null,
                                                                                                    "address":null,
                                                                                                    "bio":null,
                                                                                                    "gender":""
                                                                                                }
                                                                                            },
                                                                                            "likes":[]
                                                                                        }
                                                                                    }
                                                                                ],
                                                                                "author":{
                                                                                    "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                    "type":"user",
                                                                                    "attributes":{
                                                                                        "foreignId":"",
                                                                                        "date":"2024-08-24 03:04:10",
                                                                                        "firstName":"fire ",
                                                                                        "lastName":"man",
                                                                                        "email":"exam@example.com",
                                                                                        "hide":false,
                                                                                        "picture":null,
                                                                                        "phoneNumber":"",
                                                                                        "token":null,
                                                                                        "addressId":null,
                                                                                        "address":null,
                                                                                        "bio":null,
                                                                                        "gender":""
                                                                                    }
                                                                                },
                                                                                "likes":[]
                                                                            }
                                                                        },
                                                                        {
                                                                            "id":"0b6afd46-1a55-4483-b96d-17d5c5a392e6",
                                                                            "type":"post",
                                                                            "attributes":{
                                                                                "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                "parentId":"92b948ab-94cc-4e29-9d6a-427409392434",
                                                                                "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                                "contents":"<p>birds of a feather<\/p>",
                                                                                "created":"2025-05-07 11:10:58",
                                                                                "replies":[],
                                                                                "author":{
                                                                                    "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                                    "type":"user",
                                                                                    "attributes":{
                                                                                        "foreignId":"",
                                                                                        "date":"2024-08-24 03:04:10",
                                                                                        "firstName":"fire ",
                                                                                        "lastName":"man",
                                                                                        "email":"exam@example.com",
                                                                                        "hide":false,
                                                                                        "picture":null,
                                                                                        "phoneNumber":"",
                                                                                        "token":null,
                                                                                        "addressId":null,
                                                                                        "address":null,
                                                                                        "bio":null,
                                                                                        "gender":""
                                                                                    }
                                                                                },
                                                                                "likes":[]
                                                                            }
                                                                        }
                                                                    ],
                                                                    "author":{
                                                                        "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                        "type":"user",
                                                                        "attributes":{
                                                                            "foreignId":"",
                                                                            "date":"2024-08-24 03:04:10",
                                                                            "firstName":"fire ",
                                                                            "lastName":"man",
                                                                            "email":"exam@example.com",
                                                                            "hide":false,
                                                                            "picture":null,
                                                                            "phoneNumber":"",
                                                                            "token":null,
                                                                            "addressId":null,
                                                                            "address":null,
                                                                            "bio":null,
                                                                            "gender":""
                                                                        }
                                                                    },
                                                                    "likes":[]
                                                                }
                                                            },
                                                            {
                                                                "id":"64904e58-e165-4bd8-a95c-8680b5c2e81f",
                                                                "type":"post",
                                                                "attributes":{
                                                                    "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                    "parentId":"056b1e13-7240-482f-acc4-32e3f4543a33",
                                                                    "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                    "contents":"<p>fishing<\/p>",
                                                                    "created":"2025-05-07 10:20:01",
                                                                    "replies":[],
                                                                    "author":{
                                                                        "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                        "type":"user",
                                                                        "attributes":{
                                                                            "foreignId":"",
                                                                            "date":"2024-08-24 03:04:10",
                                                                            "firstName":"fire ",
                                                                            "lastName":"man",
                                                                            "email":"exam@example.com",
                                                                            "hide":false,
                                                                            "picture":null,
                                                                            "phoneNumber":"",
                                                                            "token":null,
                                                                            "addressId":null,
                                                                            "address":null,
                                                                            "bio":null,
                                                                            "gender":""
                                                                        }
                                                                    },
                                                                    "likes":[]
                                                                }
                                                            },
                                                            {
                                                                "id":"fabe0c98-29f3-4da9-84cd-f28eca18c660",
                                                                "type":"post",
                                                                "attributes":{"authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                    "parentId":"056b1e13-7240-482f-acc4-32e3f4543a33",
                                                                    "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                                    "contents":"<p>ghjdghd<\/p>",
                                                                    "created":"2025-05-07 10:23:19",
                                                                    "replies":[],
                                                                    "author":{
                                                                        "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                                        "type":"user",
                                                                        "attributes":{
                                                                            "foreignId":"",
                                                                            "date":"2024-08-24 03:04:10",
                                                                            "firstName":"fire ",
                                                                            "lastName":"man",
                                                                            "email":"exam@example.com",
                                                                            "hide":false,
                                                                            "picture":null,
                                                                            "phoneNumber":"",
                                                                            "token":null,
                                                                            "addressId":null,
                                                                            "address":null,
                                                                            "bio":null,
                                                                            "gender":""
                                                                        }
                                                                    },
                                                                    "likes":[]
                                                                }
                                                            }
                                                        ],
                                                        "author":{
                                                            "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                            "type":"user",
                                                            "attributes":{
                                                                "foreignId":"",
                                                                "date":"2024-08-24 03:04:10",
                                                                "firstName":"fire ",
                                                                "lastName":"man",
                                                                "email":"exam@example.com",
                                                                "hide":false,
                                                                "picture":null,
                                                                "phoneNumber":"",
                                                                "token":null,
                                                                "addressId":null,
                                                                "address":null,
                                                                "bio":null,
                                                                "gender":""
                                                            }
                                                        },
                                                        "likes":[]
                                                    }
                                                },
                                                {
                                                    "id":"fe9ec99d-23b7-4720-8e58-909fd6125448",
                                                    "type":"post",
                                                    "attributes":{
                                                        "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                        "parentId":"e7ea4218-daa0-4cc6-adb9-981bd26e488a",
                                                        "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                        "contents":"<p>firing on the beach<\/p>",
                                                        "created":"2025-05-07 08:58:39",
                                                        "replies":[],
                                                        "author":{
                                                            "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                            "type":"user",
                                                            "attributes":{
                                                                "foreignId":"",
                                                                "date":"2024-08-24 03:04:10",
                                                                "firstName":"fire ",
                                                                "lastName":"man",
                                                                "email":"exam@example.com",
                                                                "hide":false,
                                                                "picture":null,
                                                                "phoneNumber":"",
                                                                "token":null,
                                                                "addressId":null,
                                                                "address":null,
                                                                "bio":null,
                                                                "gender":""
                                                            }
                                                        },
                                                        "likes":[]
                                                    }
                                                },
                                                {
                                                    "id":"9187074e-044d-40f9-8711-e1774577ad1b",
                                                    "type":"post",
                                                    "attributes":{
                                                        "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                        "parentId":"e7ea4218-daa0-4cc6-adb9-981bd26e488a",
                                                        "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                        "contents":"<p>sdgdfgsfs<\/p>",
                                                        "created":"2025-05-07 09:15:51",
                                                        "replies":[],
                                                        "author":{
                                                            "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                            "type":"user",
                                                            "attributes":{
                                                                "foreignId":"",
                                                                "date":"2024-08-24 03:04:10",
                                                                "firstName":"fire ",
                                                                "lastName":"man",
                                                                "email":"exam@example.com",
                                                                "hide":false,
                                                                "picture":null,
                                                                "phoneNumber":"",
                                                                "token":null,
                                                                "addressId":null,
                                                                "address":null,
                                                                "bio":null,
                                                                "gender":""
                                                            }
                                                        },
                                                        "likes":[]
                                                    }
                                                },
                                                {
                                                    "id":"a2164128-1f6c-49e7-8cf3-84e6e55197fd",
                                                    "type":"post",
                                                    "attributes":{
                                                        "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                        "parentId":"e7ea4218-daa0-4cc6-adb9-981bd26e488a",
                                                        "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                        "contents":"<p>dddddd<\/p>",
                                                        "created":"2025-05-07 11:18:34",
                                                        "replies":[],
                                                        "author":{
                                                            "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                            "type":"user",
                                                            "attributes":{
                                                                "foreignId":"",
                                                                "date":"2024-08-24 03:04:10",
                                                                "firstName":"fire ",
                                                                "lastName":"man",
                                                                "email":"exam@example.com",
                                                                "hide":false,
                                                                "picture":null,
                                                                "phoneNumber":"",
                                                                "token":null,
                                                                "addressId":null,
                                                                "address":null,
                                                                "bio":null,
                                                                "gender":""
                                                            }
                                                        },
                                                        "likes":[]
                                                    }
                                                },
                                                {
                                                    "id":"582a7a46-9698-450b-8bed-d1657cc309c4",
                                                    "type":"post",
                                                    "attributes":{
                                                        "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                        "parentId":"e7ea4218-daa0-4cc6-adb9-981bd26e488a",
                                                        "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                                        "contents":"<p>fffffff<\/p>",
                                                        "created":"2025-05-07 11:18:55",
                                                        "replies":[],
                                                        "author":{
                                                            "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                            "type":"user",
                                                            "attributes":{
                                                                "foreignId":"",
                                                                "date":"2024-08-24 03:04:10",
                                                                "firstName":"fire ",
                                                                "lastName":"man",
                                                                "email":"exam@example.com",
                                                                "hide":false,
                                                                "picture":null,
                                                                "phoneNumber":"",
                                                                "token":null,
                                                                "addressId":null,
                                                                "address":null,
                                                                "bio":null,
                                                                "gender":""
                                                            }
                                                        },
                                                        "likes":[]
                                                    }
                                                }
                                            ],
                                            "author":{
                                                "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                "type":"user",
                                                "attributes":{
                                                    "foreignId":"",
                                                    "date":"2024-08-24 03:04:10",
                                                    "firstName":"fire ",
                                                    "lastName":"man",
                                                    "email":"exam@example.com",
                                                    "hide":false,
                                                    "picture":null,
                                                    "phoneNumber":"",
                                                    "token":null,
                                                    "addressId":null,
                                                    "address":null,
                                                    "bio":null,
                                                    "gender":""
                                                }
                                            },
                                            "likes":[]
                                        }
                                    },{
                                        "id":"9ced1686-ac9e-46e4-be81-15eae4c084ff",
                                        "type":"post",
                                        "attributes":{
                                            "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                            "parentId":"d581a594-dc39-458f-8cc6-8e38c5b08f40",
                                            "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                                            "contents":"<p>yello on the beach<\/p>",
                                            "created":"2025-05-07 08:37:32",
                                            "replies":[],
                                            "author":{
                                                "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                                "type":"user",
                                                "attributes":{
                                                    "foreignId":"",
                                                    "date":"2024-08-24 03:04:10",
                                                    "firstName":"fire ",
                                                    "lastName":"man",
                                                    "email":"exam@example.com",
                                                    "hide":false,
                                                    "picture":null,
                                                    "phoneNumber":"",
                                                    "token":null,
                                                    "addressId":null,
                                                    "address":null,
                                                    "bio":null,
                                                    "gender":""
                                                }
                                            },
                                            "likes":[]
                                        }
                                    }
                                ],
                                "author":{
                                    "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                                    "type":"user",
                                    "attributes":{
                                        "foreignId":"",
                                        "date":"2024-08-24 03:04:10",
                                        "firstName":"fire ",
                                        "lastName":"man",
                                        "email":"exam@example.com",
                                        "hide":false,
                                        "picture":null,
                                        "phoneNumber":"",
                                        "token":null,
                                        "addressId":null,
                                        "address":null,
                                        "bio":null,
                                        "gender":""
                                    }
                                },
                                "likes":[]
                            }
                        }
                    ],
                    "author":{
                        "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                        "type":"user",
                        "attributes":{
                            "foreignId":"",
                            "date":"2024-08-24 03:04:10",
                            "firstName":"fire ",
                            "lastName":"man",
                            "email":"exam@example.com",
                            "hide":false,
                            "picture":null,
                            "phoneNumber":"",
                            "token":null,
                            "addressId":null,
                            "address":null,
                            "bio":null,
                            "gender":""
                        }
                    },
                    "likes":[]
                }
            },{
                "id":"69824bcc-8d01-49e2-88f0-af34cd4b210f",
                "type":"post",
                "attributes":{
                    "authorId":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                    "parentId":null,
                    "communityId":"1bc5769b-b228-4a99-a916-8ae4f33f5d96",
                    "contents":"<p>fire fox on the goat<\/p>",
                    "created":"2025-05-07 08:34:33",
                    "replies":[],
                    "author":{
                        "id":"ff3e694c-3740-41f4-ade9-2d6c79c96f24",
                        "type":"user",
                        "attributes":{
                            "foreignId":"",
                            "date":"2024-08-24 03:04:10",
                            "firstName":"fire ",
                            "lastName":"man",
                            "email":"exam@example.com",
                            "hide":false,
                            "picture":null,
                            "phoneNumber":"",
                            "token":null,
                            "addressId":null,
                            "address":null,
                            "bio":null,
                            "gender":""
                        }
                    },
                    "likes":[]
                }
            }
        ];
    }

    community(){
        return{
            id: uuidv4(),
            attributes: {
                owner: this.user(),
                createdDate: utils.date.dbFormat(new Date()),
                privacy: 'Public',
                name: this.randomName(),
                description: 'is png the best choice of a imge to be place on a website for fast loading?',
                likes: [],
                members: this.members(),
                creatorId: 'ff3e694c-3740-41f4-ade9-2d6c79c96f24'
            }
        }
    }

    communities(qty=15){
        return [...Array(qty)].map(()=>(this.community()));
    }

    members(qty=15){
        return [...Array(qty)].map(()=>(this.user()));
    }

    schedule(i=0){
        const date = new Date();
        date.setMonth(date.getMonth() + i);
        return{
            id: uuidv4(),
            attributes: {
                date: utils.date.dbFormat(date),
                user: this.user(),
                position: 1,
                accurance: 1,
                susuId: '1bc5769b-b228-4a99-a916-8ae4f33f5d96',
                memberId: '1bc5769b-b228-4a99-a916-8ae4f33f5d96',
                payouts: [],
                refunds: [],
                contributions: [],
            }
        }
    }

    schedules(qty=15){
        return [...Array(qty)].map((_, i)=>this.schedule(i));
    }

    susu(){
        return{
            id: uuidv4(),
            attributes: {
                contribution: 125.2,
                cycle: 'Monthly',
                accurance: 1,
                startDate: utils.date.dbFormat(new Date()),
                communityId: '1bc5769b-b228-4a99-a916-8ae4f33f5d96',
                pendingStart: true,
                completed: false,
                canceled: false,
                members: this.members(),
                owner: null
            }
        }
    }

    message(){
        return{
            id: uuidv4(),
            attributes: {
                fromId:  uuidv4(),
                toId:  uuidv4(),
                date: utils.date.dbFormat(new Date()),
                message: 'Hello world',
                read: false,
                hide: false,
                isCurrentUser: false,
                user: this.user(),
            }
        }
    }

    messages(qty=15){
        return [...Array(qty)].map(()=>this.message());
    }

    messanger(){
        return{
            id: uuidv4(),
            attributes: {
                messages: this.messages(),
                user: this.user(),
                latestDate: utils.date.dbFormat(new Date()),
                latestMessage: 'Some latest message',
                quantity: 5,
            }
        }
    }

    messangers(qty=15){
        return [...Array(qty)].map(()=>this.messanger());
    }
}

export const mockData = new MockData();