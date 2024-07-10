import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

export const MembersList = () => {
    const [members, setMembers] = useState([
        {
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'Twill lookis a test to see how this will lowill lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: '',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis o see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a tll lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This  this will lookis a test to see how this will lookis  see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test e how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'Ththis will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This i will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is s will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This iok',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookiill lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookiill lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookiill lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookiill lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookiill lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookiill lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookiill lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookiill lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookiill lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                firstName: 'John Wick',
                lastName: 'John Wick',
                gender: 'Male',
                bio: 'This is a test tis a test to see how this will lookiill lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                email: 'example@example.com',
                phone: '14734598254',
                country: 'Grenada',
                state: 'St Georges',
                address: 'Tempe'
            }
        },
    ]);

    useEffect(() => {
    }, []);
    return (
        <div className="container">
            <div className="search-row my-3 d-inline-block border border-light rounded-3 bg-light">
                <div className="d-flex align-items-center w-auto">
                    <input className="form-control bg-transparent shadow-none border-0 pe-1" placeholder="Search..." type="search" />
                    <IoSearchOutline className="fs-4 me-2"/>
                </div>
            </div>
            <div className="row row-with-search-above-mini">
                {members.map((group, key) => (
                    <div className="col-12 col-xl-3 col-lg-4 col-md-6 p-1" key={key}>
                        <div className="card position-relative h-100 m-1">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <img className="card-img-sub" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                                    <div>
                                        <div className="fw-bold">{group.attributes.firstName} {group.attributes.lastName}</div>
                                        <div className="small lh-1"><small>Groups <b>25</b></small></div>
                                    </div>
                                </div>
                                <div className="text-muted small my-2">{group.attributes.bio}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}